import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import AnalyticsGraph from '@/assets/images/analytics_graph.png';
import futureIcon from '@/assets/images/producttype_futures.png';
import StockIcon from '@/assets/images/producttype_stock.png';
import TradeTypeHIcon from '@/assets/images/tradetype_H.png';
import TradeTypePIcon from '@/assets/images/tradetype_P.png';
import Pagination from '@/components/common/Pagination';
import StrategyList from '@/components/common/StrategyList';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

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

const TraderMyPage = () => {
  const strategies = generateStrategies(80);
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(strategies.length / limit);
  const currentPageData = strategies.slice((page - 1) * limit, page * limit);
  const startRank = (page - 1) * limit + 1;

  useEffect(() => {
    console.log(currentPageData.length);
  }, []);

  return (
    <div css={myPageWrapperStyle}>
      <div css={myPageHeaderStyle}>
        <div>
          <h2>나의 전략</h2>
          <p>
            총 <span>0</span>개의 전략이 있습니다
          </p>
        </div>
        <Link to={ROUTES.MYPAGE.TRADER.STRATEGIES.CREATE}>전략등록</Link>
      </div>
      <div>
        {currentPageData.length === 0 ? (
          <p css={StrategyEmptyStyle}>
            아직 등록된 전략이 없습니다.
            <br /> &apos;전략 등록&apos; 버튼을 눌러 새로운 전략을 추가해보세요!
          </p>
        ) : (
          <div css={tableWrapperStyle}>
            <StrategyList
              strategies={currentPageData}
              startRank={startRank}
              containerWidth='875px'
              gridTemplate='minmax(0, 2.91fr) minmax(0, 2.29fr) minmax(0, 1.6fr) minmax(0, 1.37fr) minmax(0, 0.91fr) minmax(0, 0.91fr)'
            />
            <Pagination totalPage={totalPages} limit={limit} page={page} setPage={setPage} />
          </div>
        )}
      </div>
    </div>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
  }

  p {
    ${theme.textStyle.body.body3}
    span {
      color: ${theme.colors.main.primary};
    }
  }

  a {
    display: flex;
    height: 60px;
    padding: 20px 32px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.main.white};
    background-color: ${theme.colors.main.primary};
  }
`;

const StrategyEmptyStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${theme.colors.gray[400]};
  text-align: center;
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

export default TraderMyPage;
