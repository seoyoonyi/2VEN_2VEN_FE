import { css } from '@emotion/react';

import AnalyticsGraph from '@/assets/images/analytics_graph.png';
import futureIcon from '@/assets/images/producttype_futures.png';
import StockIcon from '@/assets/images/producttype_stock.png';
import TradeTypeHIcon from '@/assets/images/tradetype_H.png';
import TradeTypePIcon from '@/assets/images/tradetype_P.png';
import StrategyList from '@/components/common/StrategyList';

const strategies = [
  {
    strategyId: 1,
    strategyTitle: '지수 선물 상품을 활용한 전략',
    tradingTypeIcon: TradeTypeHIcon,
    cycleIcon: TradeTypePIcon,
    investmentAssetClassesIcon: [futureIcon, StockIcon],
    writerId: 1,
  },
  {
    strategyId: 2,
    strategyTitle: '단기 수익을 위한 변동성 전략',
    analytics_graph: AnalyticsGraph,
    tradingTypeIcon: TradeTypeHIcon,
    cycleIcon: TradeTypePIcon,
    investmentAssetClassesIcon: [StockIcon],
    writerId: 2,
    cumulativeReturn: 10.25,
    oneYearReturn: 8.4,
    mdd: -15002330,
    smscore: 70.12,
    followers_count: 2342,
  },
  {
    strategyId: 3,
    strategyTitle:
      '사람들 많이 살 때 따라사는 전략 입니다. 두줄로 되면 이런식으로 되고 어쩌구저쩌구 배고파',
    analytics_graph: AnalyticsGraph,
    tradingTypeIcon: TradeTypeHIcon,
    cycleIcon: TradeTypePIcon,
    investmentAssetClassesIcon: [futureIcon, futureIcon, futureIcon, futureIcon, futureIcon],
    writerId: 9,
    cumulativeReturn: 10.25,
    oneYearReturn: 8.4,
    mdd: -1243524,
    smscore: 70.12,
    followers_count: 245,
  },
  {
    strategyId: 3,
    strategyTitle: '크리스마스때 시작하면 대박나는 전략',
    analytics_graph: AnalyticsGraph,
    tradingTypeIcon: TradeTypeHIcon,
    cycleIcon: TradeTypePIcon,
    investmentAssetClassesIcon: [futureIcon],
    writerId: 9,
    cumulativeReturn: 10.25,
    oneYearReturn: 8.4,
    mdd: -1243524,
    smscore: 70.12,
    followers_count: 245,
  },
  {
    strategyId: 3,
    strategyTitle: '우리에게 주말은 없다 전략',
    analytics_graph: AnalyticsGraph,
    tradingTypeIcon: TradeTypeHIcon,
    cycleIcon: TradeTypePIcon,
    investmentAssetClassesIcon: [
      StockIcon,
      futureIcon,
      futureIcon,
      futureIcon,
      StockIcon,
      StockIcon,
      StockIcon,
    ],
    writerId: 9,
    cumulativeReturn: 10.25,
    oneYearReturn: 8.4,
    mdd: -1243524,
    smscore: 70.12,
    followers_count: 245,
  },
];

const StrategyListTestPage = () => (
  <>
    <div css={titleStyle}>전략 랭킹 사용 예시</div>
    <StrategyList showRank={true} strategies={strategies} />
    <div css={titleStyle}>트레이더 - 나의전략 사용 예시</div>
    <StrategyList
      strategies={strategies}
      containerWidth='875px'
      gridTemplate='255px 200px 140px 120px 80px 80px'
    />
  </>
);

const titleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  padding: 40px;
`;

export default StrategyListTestPage;
