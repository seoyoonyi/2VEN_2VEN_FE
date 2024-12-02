import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import ChartSection from '@/components/page/strategy-detail/chart/ChartSection';
import FileDownSection from '@/components/page/strategy-detail/FileDownSection';
import IconTagSection from '@/components/page/strategy-detail/IconTagSection';
import ReasonItem from '@/components/page/strategy-detail/ReasonItem';
import ReviewSection from '@/components/page/strategy-detail/review/ReviewSection';
import StrategyContent from '@/components/page/strategy-detail/StrategyContent';
import StrategyHeader from '@/components/page/strategy-detail/StrategyHeader';
import StrategyIndicator from '@/components/page/strategy-detail/StrategyIndicator';
import StrategyTab from '@/components/page/strategy-detail/StrategyTab';
import StrategyTitleSection from '@/components/page/strategy-detail/StrategyTitleSection';
import AccountVerify from '@/components/page/strategy-detail/tabmenu/AccountVerify';
import DailyAnalysis from '@/components/page/strategy-detail/tabmenu/DailyAnalysis';
import MonthlyAnalysis from '@/components/page/strategy-detail/tabmenu/MonthlyAnalysis';
import StatisticsTable from '@/components/page/strategy-detail/tabmenu/StatisticsTable';
import { ROUTES } from '@/constants/routes';
import { monthlyAttribues, dailyAttribues, statisticsMapping } from '@/constants/strategyAnalysis';
import {
  useStrategyDetailApprove,
  useStrategyDetailDelete,
  useStrategyDetailTerminate,
} from '@/hooks/mutations/useStrategyDetailMutation';
import { useFetchApproveState } from '@/hooks/queries/useFetchApprove';
import useFetchDailyAnalysis from '@/hooks/queries/useFetchDailyAnalysis';
import useFetchStrategyDetail from '@/hooks/queries/useFetchStrategyDetail';
import useStatistics from '@/hooks/queries/useStatistics';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';
import { StatisticsProps } from '@/types/strategyDetail';
import { formatDate } from '@/utils/dateFormat';
import { formatValue, formatRate } from '@/utils/statistics';

const imgTest = [
  { img: '/src/assets/images/producttype_stock.png' },
  { img: '/src/assets/images/producttype_stock.png' },
];

const StrategyDetailPage = () => {
  const { user } = useAuthStore();
  const { strategyId } = useParams();
  const role = user?.role as UserRole;
  const navigate = useNavigate();
  const { strategy } = useFetchStrategyDetail(strategyId || '');
  const { statistics, writedAt } = useStatistics(Number(strategyId));
  const { mutate: deleteStrategyDetail } = useStrategyDetailDelete();
  const { mutate: approveStrategy } = useStrategyDetailApprove();
  const { mutate: terminateStrategy } = useStrategyDetailTerminate();
  const { openModal } = useModalStore();
  const { dailyAnalysis } = useFetchDailyAnalysis(Number(strategyId), 0, 5);
  const { data: approveState } = useFetchApproveState(Number(strategyId), role) || '';
  const isApproved = dailyAnalysis?.length >= 3 || approveState?.isApproved === 'N';
  const isTerminated = strategy?.strategyStatusCode === 'STRATEGY_OPERATION_TERMINATED';

  const statisticsTableData = (
    mapping: { label: string; key: string }[],
    statistics: StatisticsProps
  ) =>
    mapping.map(({ label, key }) => {
      const value = statistics[key as keyof StatisticsProps];
      const formattedValue = formatValue(key, value);
      return {
        label,
        value: formattedValue,
      };
    });

  const tabMenu = [
    {
      title: '통계',
      component: !statistics ? (
        <div css={noneStaticsStyle}>통계 데이터가 없습니다. 일간분석 데이터를 입력해주세요.</div>
      ) : (
        <StatisticsTable data={statisticsTableData(statisticsMapping, statistics)} />
      ),
    },
    {
      title: '실계좌인증',
      component: <AccountVerify />,
    },
    {
      title: '일간분석',
      component: (
        <DailyAnalysis
          attributes={dailyAttribues}
          strategyId={Number(strategyId)}
          mode='write'
          role={user?.role}
          userId={strategy?.memberId}
        />
      ),
    },
    {
      title: '월간분석',
      component: (
        <MonthlyAnalysis
          attributes={monthlyAttribues}
          strategyId={Number(strategyId)}
          mode='read'
          role={user?.role}
        />
      ),
    },
  ];

  const handleDeleteDetail = (id: number) => {
    openModal({
      type: 'warning',
      title: '전략 삭제',
      desc: '해당 전략의 모든 정보가 삭제됩니다.',
      onAction: () => {
        deleteStrategyDetail(id);
        navigate(ROUTES.STRATEGY.LIST);
      },
    });
  };

  const handleApproval = (id: number, role: UserRole) => {
    openModal({
      type: 'confirm',
      title: '승인요청',
      desc: '승인 요청을 보내면 관리자 검토 후\n 전략이 승인됩니다.',
      onAction: () => {
        if (role && id) {
          approveStrategy({ strategyId: id, role });
        }
      },
    });
  };

  const handleDetailEnd = (id: number, role: UserRole) => {
    openModal({
      type: 'confirm',
      title: '운용종료',
      desc: '전략 운용 종료 시 수정 및 삭제가 불가능합니다.',
      onAction: () => {
        if (role && id) {
          terminateStrategy({ strategyId: id, role });
        }
      },
    });
  };

  if (!strategy) {
    return <Loader />;
  }

  return (
    <div css={containerStyle}>
      {(role === 'ROLE_ADMIN' || role === 'ROLE_TRADER') &&
        strategy?.isApproved !== 'P' &&
        approveState?.isApproved === 'N' &&
        strategy?.isApproved === 'N' && (
          <ReasonItem
            title='미승인 이유는 이렇습니다'
            content={approveState?.rejectionReason}
            admin={approveState?.managerNickname}
            adminImg={approveState?.profileImg}
          />
        )}
      <div css={contentStyle}>
        <div css={contentWrapper}>
          <div key={strategy?.strategyId}>
            <StrategyHeader
              id={strategy?.strategyId}
              strategyTitle={strategy?.strategyTitle || ''}
              traderId={strategy?.memberId || ''}
              isStrategyApproved={strategy?.isApproved}
              isApprovedState={isApproved}
              isTerminated={isTerminated}
              onApproval={() => {
                handleApproval(strategy.strategyId, role);
              }}
              onDelete={() => handleDeleteDetail(strategy.strategyId)}
              onEnd={() => handleDetailEnd(strategy.strategyId, role)}
            />
            <IconTagSection imgs={imgTest} />
            <StrategyTitleSection
              title={strategy?.strategyTitle}
              traderId={strategy?.memberId}
              traderName={strategy?.nickname}
              imgUrl={strategy?.profilePath}
              date={formatDate(strategy?.writedAt || '', 'withDayTime')}
              followers={strategy?.followersCount}
              minimumInvestment={strategy?.minInvestmentAmount}
              lastUpdatedDate={writedAt ? formatDate(writedAt) : '데이터없음'}
            />
            <StrategyContent content={strategy?.strategyOverview} />
            {strategy?.strategyProposalLink && (
              <FileDownSection
                fileName={strategy?.strategyProposalFileTitle}
                fileUrl={strategy?.strategyProposalLink}
              />
            )}
            <StrategyIndicator
              cumulativeRate={statistics && formatRate(statistics.maxCumulativeProfitLossRatio)}
              maximumRate={statistics && formatRate(statistics.maxDrawdownRate)}
              avgProfit={statistics && formatRate(statistics.averageProfitLossRate)}
              profitFactor={statistics && statistics.profitFactor}
              winRate={statistics && formatRate(statistics.winRate)}
            />
            <ChartSection />
            <StrategyTab tabs={tabMenu} />
          </div>
        </div>
      </div>
      <div css={reviewSectionWrapper}>
        <ReviewSection />
      </div>
      <Modal />
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.gray[100]};
  justify-content: center;
  flex-shrink: 0;
  margin: 0 auto;
`;

const contentStyle = css`
  margin-top: 95px;
  border-radius: 8px;
  width: ${theme.layout.width.content};
  padding: 40px;
  box-sizing: border-box;
  background-color: ${theme.colors.main.white};
`;

const contentWrapper = css`
  max-width: 1060px;
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
`;

const noneStaticsStyle = css`
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[400]};
  ${theme.textStyle.subtitles.subtitle4};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const reviewSectionWrapper = css`
  width: ${theme.layout.width.content};
  margin: 16px 0 76px 0;
`;

export default StrategyDetailPage;
