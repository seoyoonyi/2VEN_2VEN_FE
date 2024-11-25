import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import Modal from '@/components/common/Modal';
import FileDownSection from '@/components/page/strategy-detail/FileDownSection';
import IconTagSection from '@/components/page/strategy-detail/IconTagSection';
import ReviewSection from '@/components/page/strategy-detail/review/ReviewSection';
import ChartSection from '@/components/page/strategy-detail/section/ChartSection';
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
import { monthlyAttribues, dailyAttribues, statisticsLabels } from '@/constants/strategyAnalysis';
import useStrategyDetailDelete from '@/hooks/mutations/useStrategyDetailDelete';
import useFetchStrategyDetail from '@/hooks/queries/useFetchStrategyDetail';
import useStatistics from '@/hooks/queries/useStatistics';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { formatDate } from '@/utils/dateFormat';

const strategyDummy = {
  indicator: {
    cumulativeRate: 53.81,
    maximumRate: -13.6,
    avgProfit: 5.69,
    profitFactor: '1.54 : 1',
    winRate: 60.36,
  },
  file: {
    url: `/file.txt`,
  },
};

const imgTest = [
  { img: '/src/assets/images/domestic_present.svg' },
  { img: '/src/assets/images/domestic_present.svg' },
  { img: '/src/assets/images/domestic_present.svg' },
  { img: '/src/assets/images/domestic_present.svg' },
];

const StrategyDetailPage = () => {
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const { strategy } = useFetchStrategyDetail(strategyId || '');
  const { statistics, isLoading } = useStatistics(Number(strategyId));
  const { mutate: deleteStrategyDetail } = useStrategyDetailDelete();
  const { openModal } = useModalStore();

  if (isLoading) {
    return <div>로딩중....</div>;
  }

  const statisticsTableData = statisticsLabels.map((label, idx) => ({
    label,
    value: Object.values(statistics)[idx] as string,
  }));

  const tabMenu = [
    {
      title: '통계',
      component: <StatisticsTable data={statisticsTableData} />,
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
              lastUpdatedDate={'통계쪽입력날짜'}
            />
            <StrategyContent content={strategy?.strategyOverview} />
            <FileDownSection fileUrl={strategyDummy.file.url} />
            <StrategyIndicator
              cumulativeRate={strategyDummy.indicator.cumulativeRate}
              maximumRate={strategyDummy.indicator.maximumRate}
              avgProfit={strategyDummy.indicator.avgProfit}
              profitFactor={strategyDummy.indicator.profitFactor}
              winRate={strategyDummy.indicator.winRate}
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

const reviewSectionWrapper = css`
  width: ${theme.layout.width.content};
  margin: 16px 0 76px 0;
`;

export default StrategyDetailPage;
