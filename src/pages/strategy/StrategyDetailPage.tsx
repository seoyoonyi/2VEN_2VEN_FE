import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import Modal from '@/components/common/Modal';
import FileDownSection from '@/components/page/strategy-detail/FileDownSection';
import ChartSection from '@/components/page/strategy-detail/section/ChartSection';
import StrategyContent from '@/components/page/strategy-detail/StrategyContent';
import StrategyIndicator from '@/components/page/strategy-detail/StrategyIndicator';
import StrategyTab from '@/components/page/strategy-detail/StrategyTab';
import StrategyTitleSection from '@/components/page/strategy-detail/StrategyTitleSection';
import AccountVerify from '@/components/page/strategy-detail/tabmenu/AccountVerify';
import DailyAnalysis from '@/components/page/strategy-detail/tabmenu/DailyAnalysis';
import MonthlyAnalysis from '@/components/page/strategy-detail/tabmenu/MonthlyAnalysis';
import StatisticsTable from '@/components/page/strategy-detail/tabmenu/StatisticsTable';
import { ROUTES } from '@/constants/routes';
import useStrategyDetailDelete from '@/hooks/mutations/useStrategyDetailDelete';
import useFetchStrategyDetail from '@/hooks/queries/useFetchStrategyDetail';
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

const statisticsData = [
  { label: '잔고', value: '896,217,437' },
  { label: '누적 입출금액', value: '866,217,437' },
  { label: '원금', value: '238,704,360' },
  { label: '누적 수익 금액', value: '247,525,031' },
  { label: '최대 누적수익금액', value: '247,525,031' },
  { label: '현재 자본인하금액', value: '-54,632,778', highlight: true },
  { label: '최대 자본인하금액', value: '-54,632,778', highlight: true },
  { label: '평균 손익 금액', value: '336,311' },
  { label: '최대 일수익 금액', value: '25,257,250' },
  { label: '최대 일손실 금액', value: '-17,465,050' },
  { label: '총 매매 일수', value: '736일' },
  { label: '총 이익 일수', value: '508일' },
  { label: '총 손실 일수', value: '228일' },
  { label: '승률', value: '69%' },
  { label: 'Profit Factor', value: '1.48' },
  { label: '운용기간', value: '2년 4월' },
  { label: '시작일자', value: '2012-10-11' },
  { label: '최종일자', value: '2015-03-11' },
  { label: '누적 수익률(%)', value: '49.24%' },
  { label: '최대 누적수익률', value: '49.24%' },
  { label: '현재 자본인하율(%)', value: '0%' },
  { label: '최대 자본인하율(%)', value: '-13.96%' },
  { label: '평균 손익률', value: '336,311' },
  { label: '최대 일수익율', value: '25,257,250' },
  { label: '최대 일손실율', value: '-17,465,050' },
  { label: '현재 연속 손익일수', value: '6일' },
  { label: '최대 연속 이익일수', value: '22일' },
  { label: '최대 연속 손실일수', value: '-6일' },
  { label: '고정갱신 후 경과일', value: '0일' },
  { label: 'ROA', value: '453' },
];
const dailyAnalysisData = [
  {
    date: '2024.10.29',
    original: '100,000,000',
    trade: '0',
    day: '+332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2024.10.29',
    original: '100,000,000',
    trade: '100,000',
    day: '-332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2024.10.29',
    original: '100,000,000',
    trade: '0',
    day: '332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2024.10.29',
    original: '100,000,000',
    trade: '20,000,000',
    day: '332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2024.10.29',
    original: '100,000,000',
    trade: '0',
    day: '332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2024.10.29',
    original: '100,000,000',
    trade: '0',
    day: '332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
];
const monthlyAnalysisData = [
  {
    date: '2026.04',
    original: '100,000,000',
    trade: '0',
    day: '+332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2026.04',
    original: '100,000,000',
    trade: '0',
    day: '+332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2026.04',
    original: '100,000,000',
    trade: '0',
    day: '332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2026.04',
    original: '100,000,000',
    trade: '0',
    day: '332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2026.04',
    original: '100,000,000',
    trade: '0',
    day: '-332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
  {
    date: '2026.04',
    original: '100,000,000',
    trade: '0',
    day: '-332,410',
    daily: '0.33%',
    addMoney: '332,200',
    addRate: '0.30%',
  },
];

const dailyAttribues = [
  {
    title: '날짜',
  },
  {
    title: '원금',
  },
  {
    title: '입출금',
  },
  {
    title: '일손익',
  },
  {
    title: '일수익률',
  },
  {
    title: '누적손익',
  },
  {
    title: '누적수익률',
  },
  {
    title: '수정',
  },
];
const monthlyAttribues = [
  {
    title: '월',
  },
  {
    title: '월평균 원금',
  },
  {
    title: '입출금',
  },
  {
    title: '월 손익',
  },
  {
    title: '월 수익률',
  },
  {
    title: '누적손익',
  },
  {
    title: '누적수익률',
  },
  {
    title: '수정',
  },
];

const tabMenu = [
  {
    title: '통계',
    component: <StatisticsTable data={statisticsData} />,
  },
  {
    title: '실계좌인증',
    component: <AccountVerify />,
  },
  {
    title: '일간분석',
    component: <DailyAnalysis attributes={dailyAttribues} data={dailyAnalysisData} mode='write' />,
  },
  {
    title: '월간분석',
    component: (
      <MonthlyAnalysis attributes={monthlyAttribues} data={monthlyAnalysisData} mode='read' />
    ),
  },
];

const StrategyDetailPage = () => {
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const { strategy, isLoading } = useFetchStrategyDetail(strategyId || '');
  const { mutate: deleteStrategyDetail } = useStrategyDetailDelete();
  const { openModal } = useModalStore();

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

  if (isLoading) {
    <div>로딩중....</div>;
  }
  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <div css={contentWrapper}>
          <div key={strategy?.strategyId}>
            <StrategyTitleSection
              id={strategy?.strategyId || 0}
              title={strategy?.strategyTitle}
              traderId={strategy?.traderId}
              traderName={strategy?.traderName}
              imgUrl={strategy?.traderImage}
              date={formatDate(strategy?.writedAt || '', 'withDayTime')}
              followers={strategy?.followersCount}
              minimumInvestment={strategy?.minInvestmentAmount}
              lastUpdatedDate={'통계쪽입력날짜'}
              onDelete={() => handleDeleteDetail(strategy.strategyId)}
              onApproval={() => handleApproval()}
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
      <Modal />
    </div>
  );
};

const containerStyle = css`
  display: flex;
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

export default StrategyDetailPage;
