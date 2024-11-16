import { useState } from 'react';

import { css } from '@emotion/react';

import AnalyticsGraph from '@/assets/images/analytics_graph.png';
import futureIcon from '@/assets/images/producttype_futures.png';
import StockIcon from '@/assets/images/producttype_stock.png';
import TradeTypeHIcon from '@/assets/images/tradetype_H.png';
import TradeTypePIcon from '@/assets/images/tradetype_P.png';
import Button from '@/components/common/Button';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Select from '@/components/common/Select';
import StrategyList from '@/components/common/StrategyList';
import theme from '@/styles/theme';

const cycles = [
  { label: '데이', value: 'day' },
  { label: '포지션', value: 'position' },
];

const products = [
  { label: '국내주식', value: 'domestic_stock' },
  { label: '국내지수 옵션', value: 'domestic_index_option' },
  { label: '국내 ETF', value: 'domestic_etf' },
  { label: '국내지수 선물', value: 'domestic_index_future' },
  { label: '국내상품 선물', value: 'domestic_commodity_future' },
  { label: 'F/X', value: 'fx' },
  { label: '해외주식', value: 'foreign_stock' },
  { label: '해외주식 옵션', value: 'foreign_stock_option' },
  { label: '해외 ETF', value: 'foreign_etf' },
  { label: '해외지수 선물', value: 'foreign_index_future' },
  { label: '해외상품 선물', value: 'foreign_commodity_future' },
];

const generateStrategies = (count: number) => {
  const titles = [
    '지수 선물 상품을 활용한 전략',
    '단기 수익을 위한 변동성 전략',
    '사람들 많이 살 때 따라사는 전략 입니다. 두줄로 되면 이런식으로 되고 어쩌구저쩌구 배고파',
    '크리스마스때 시작하면 대박나는 전략',
    '우리에게 주말은 없다 전략',
    '장기 투자로 안정적 수익을 추구하는 전략',
    'AI를 활용한 초단타 매매 전략',
    '월급쟁이를 위한 안정적 투자법',
    '대기업 주식만 따라 사는 전략',
    '한 달에 한 번 매매하는 전략',
  ];

  const generateIcons = () => {
    const icons = [futureIcon, StockIcon];
    return Array.from(
      { length: Math.ceil(Math.random() * 5) },
      () => icons[Math.floor(Math.random() * icons.length)]
    );
  };

  return Array.from({ length: count }, (_, index) => ({
    strategyId: index + 1,
    strategyTitle: titles[Math.floor(Math.random() * titles.length)],
    analytics_graph: AnalyticsGraph,
    tradingTypeIcon: TradeTypeHIcon,
    cycleIcon: TradeTypePIcon,
    investmentAssetClassesIcon: generateIcons(),
    writerId: Math.ceil(Math.random() * 10),
    cumulativeReturn: parseFloat((Math.random() * 20 - 10).toFixed(2)),
    oneYearReturn: parseFloat((Math.random() * 15 - 5).toFixed(2)),
    mdd: Math.floor(Math.random() * 20000000 - 10000000),
    smscore: parseFloat((Math.random() * 100).toFixed(2)),
    followers_count: Math.floor(Math.random() * 5000),
  }));
};

const desc =
  '투자 성과에 따라 순위가 매겨진 전략들을 비교하여 \n 나에게 맞는 최적의 전략을 선택해보세요!';

const StrategyListPage = () => {
  const strategies = generateStrategies(80);
  const [page, setPage] = useState(1);
  const limit = 30;
  const totalPages = Math.ceil(strategies.length / limit);
  const currentPageData = strategies.slice((page - 1) * limit, page * limit);

  return (
    <div>
      <PageHeader title='전략랭킹' desc={desc} />
      <div css={strategyListContainerStyle}>
        <div css={filterBarContainerStyle}>
          <div css={totalStyle}>
            Total <span>{strategies.length}</span>
          </div>
          <div css={optionContainerStyle}>
            <Select options={products} onChange={() => {}} type='sm' width='160px' />
            <Select options={cycles} onChange={() => {}} type='sm' width='160px' />
            <Button
              variant='primary'
              size='xs'
              customStyle={css`
                padding: 20px 32px;
              `}
            >
              전략등록
            </Button>
          </div>
        </div>
        <div css={listContainerStyle}>
          <StrategyList strategies={currentPageData} showRank />
          <Pagination totalPage={totalPages} limit={limit} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

const strategyListContainerStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 64px 0 140px 0;
`;

const filterBarContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const optionContainerStyle = css`
  display: flex;
  gap: 12px;
`;

const totalStyle = css`
  color: #3f3f46;
  font-weight: 400;
  line-height: 150%;

  span {
    color: #0d9488;
  }
`;

const listContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

export default StrategyListPage;
