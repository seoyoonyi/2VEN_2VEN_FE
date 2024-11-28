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
import useStrategyDetailDelete from '@/hooks/mutations/useStrategyDetailDelete';
import useFetchStrategyDetail from '@/hooks/queries/useFetchStrategyDetail';
import useStatistics from '@/hooks/queries/useStatistics';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { StatisticsProps } from '@/types/strategyDetail';
import { formatDate } from '@/utils/dateFormat';
import { formatValue, formatRate } from '@/utils/statistics';

const strategyDummy = {
  file: {
    url: `/file.txt`,
  },
};

const imgTest = [
  { img: '/src/assets/images/producttype_stock.png' },
  { img: '/src/assets/images/producttype_stock.png' },
];

const rejectReasonData = {
  title: '미승인 이유는 이렇습니다',
  admin: '나는야 관리자 룰루',
  adminImg: '/src/assets/images/apt_trader.png',
  content: `
    안녕하세요, 트레이더 [내가여기서투자짱]님.
    귀하께서 등록하신 전략을 검토한 결과, 아쉽게도 아래와 같은 사유로 인해 이번에는 승인이 어려운 점 안내드립니다.
    1. 전략 설명 부족
    전략의 세부적인 실행 방법이나 투자 기준에 대한 설명이 부족하여, 투자자들이 전략을 이해하는 데 어려움이 있을 것으로 판단됩니다.
    2. 데이터 부족 또는 불명확
    전략에 포함된 데이터의 출처나 신뢰성이 불명확합니다.
    3. 투자 기준의 모호성
    전략에서 사용하는 기준이 투자자들에게 혼동을 줄 수 있는 표현이 포함되어 있습니다.
    수정 후 다시 제출해 주시면 빠르게 검토하여 안내드리겠습니다. 등록 절차와 관련해 궁금한 점이 있으시면 언제든 문의해 주세요.
  `,
};

const StrategyDetailPage = () => {
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const { strategy } = useFetchStrategyDetail(strategyId || '');
  const { statistics, writedAt } = useStatistics(Number(strategyId));
  const { mutate: deleteStrategyDetail } = useStrategyDetailDelete();
  const { openModal } = useModalStore();

  if (!strategy) {
    return <Loader />;
  }

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
        <DailyAnalysis attributes={dailyAttribues} strategyId={Number(strategyId)} mode='write' />
      ),
    },
    {
      title: '월간분석',
      component: (
        <MonthlyAnalysis
          attributes={monthlyAttribues}
          strategyId={Number(strategyId)}
          mode='read'
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

  const handleApproval = () => {
    openModal({
      type: 'confirm',
      title: '승인요청',
      desc: '승인 요청을 보내면 관리자 검토 후\n 전략이 승인됩니다.',
      onAction: () => {},
    });
  };

  return (
    <div css={containerStyle}>
      <ReasonItem
        title={rejectReasonData.title}
        content={rejectReasonData.content}
        admin={rejectReasonData.admin}
        adminImg={rejectReasonData.adminImg}
      />
      <div css={contentStyle}>
        <div css={contentWrapper}>
          <div key={strategy?.strategyId}>
            <StrategyHeader
              id={strategy?.strategyId}
              onApproval={() => {
                handleApproval();
              }}
              onDelete={() => handleDeleteDetail(strategy.strategyId)}
            />
            <IconTagSection imgs={imgTest} />
            <StrategyTitleSection
              title={strategy?.strategyTitle}
              traderId={strategy?.traderId}
              traderName={strategy?.traderName}
              imgUrl={strategy?.traderImage}
              date={formatDate(strategy?.writedAt || '', 'withDayTime')}
              followers={strategy?.followersCount}
              minimumInvestment={strategy?.minInvestmentAmount}
              lastUpdatedDate={writedAt ? formatDate(writedAt) : '데이터없음'}
            />
            <StrategyContent content={strategy?.strategyOverview} />
            <FileDownSection fileUrl={strategyDummy.file.url} />
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
