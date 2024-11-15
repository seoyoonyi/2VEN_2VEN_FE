import { css } from '@emotion/react';

import StrategyContent from '@/components/page/strategy-detail/StrategyContent';
import StrategyIndicator from '@/components/page/strategy-detail/StrategyIndicator';
import StrategyTab from '@/components/page/strategy-detail/StrategyTab';
import StrategyTitleSection from '@/components/page/strategy-detail/StrategyTitleSection';
import AccountVerify from '@/components/page/strategy-detail/tabmenu/AccountVerify';
import DailyAnalysis from '@/components/page/strategy-detail/tabmenu/DailyAnalysis';
import MonthlyAnalysis from '@/components/page/strategy-detail/tabmenu/MonthlyAnalysis';
import StatisticsTable from '@/components/page/strategy-detail/tabmenu/StatisticsTable';
import theme from '@/styles/theme';

const strategyDummy = [
  {
    title: '전략 이름이 들어가는 자리입니다.',
    author: {
      traderId: 'investKing',
      traderName: '나는야투자왕',
      imgUrl: '/logo.svg',
    },
    date: '2024.11.13.jpg(수) 23:25',
    followers: 23,
    content: `안녕하세요 침착해입니다.\n강의 이후로 뭔가 많이 지쳐있기도 했고..\n개인적으로 바쁜일들도 있어서 오랜만에 글 남기게 되었네요.. \n지독한 여름더위와 함께 여름 내내 시장이 참 어려웠던것 같습니다.\n9월도 시장이 반등하고는 있지만 여전히 시장에 돈이 많이 없어서\n까다로운 시장에 연속이구요.\n\n지속되는 하락장에 가는건 죄다 소형주에 테마주 뿐이 없었고\n종목들도 다 제가 좋아하는 자리에 있지 않아서\n비중태우기도 어렵고\n종베하면 손실났다가 또 복구하기 바쁘고\n이래저래 요몇달 계속 어려웠던 장세같습니다.\n\n그래서 저는 매매횟수도 많이 줄이고\n좋은 이벤트나 승률높은 자리와 비중태울 수 있는 종목이 있을때 승부를 보려고 계속 생각해왔고\n단타성향은 확 죽이고 스윙과 단기스윙에 많이 집중해왔습니다.`,
    indicator: {
      cumulativeRate: 53.81,
      maximumRate: -13.6,
      avgProfit: 5.69,
      profitFactor: '1.54 : 1',
      winRate: 60.36,
    },
  },
];
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
    component: <DailyAnalysis />,
  },
  {
    title: '월간분석',
    component: <MonthlyAnalysis />,
  },
];

const StrategyDetailPage = () => (
  <div css={containerStyle}>
    <div css={contentStyle}>
      {strategyDummy.map((strategy, index) => (
        <div key={index}>
          <StrategyTitleSection
            title={strategy.title}
            author={strategy.author}
            date={strategy.date}
            followers={strategy.followers}
          />
          <StrategyContent content={strategy.content} />
          <StrategyIndicator
            cumulativeRate={strategy.indicator.cumulativeRate}
            maximumRate={strategy.indicator.maximumRate}
            avgProfit={strategy.indicator.avgProfit}
            profitFactor={strategy.indicator.profitFactor}
            winRate={strategy.indicator.winRate}
          />
          <StrategyTab tabs={tabMenu} />
        </div>
      ))}
    </div>
  </div>
);

const containerStyle = css`
  display: flex;
  background-color: ${theme.colors.gray[100]};
  justify-content: center;
  flex-shrink: 0;
  margin: 0 auto;
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 95px;
  ${theme.layout.width.content};
  padding: 80px 80px 100px 80px;
  box-sizing: border-box;
  align-items: center;
  background-color: ${theme.colors.main.white};
`;

export default StrategyDetailPage;
