import { useState } from 'react';

import { css } from '@emotion/react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

import AnalyticsGraph from '@/assets/images/analytics_graph.png';
import TraderUserImage3 from '@/assets/images/ani_trader.png';
import TraderUserImage1 from '@/assets/images/apt_trader.png';
import defaultAvatar from '@/assets/images/default_avatar.png';
import TraderUserImage2 from '@/assets/images/nimo_trader.png';
import futureIcon from '@/assets/images/producttype_futures.png';
import StockIcon from '@/assets/images/producttype_stock.png';
import TradeTypeHIcon from '@/assets/images/tradetype_H.png';
import TradeTypePIcon from '@/assets/images/tradetype_P.png';
import TraderList from '@/components/common/TraderList';
import SearchedStrategyList from '@/components/page/search/SearchedStrategyList';
import theme from '@/styles/theme';

//검색키워드(param)로 검색요청 api -> "트레이더" 내 검색 리스트의 4개만(but 모든갯수보이게): 어떤기준으로 4개?
// 검색키워드(param)로 검색요청 api -> "전략" 내 검색 리스트의 5개만(but 모든갯수보이게): 어떤기준으로 5개?

// 키워드로 검색된 트레이더 목록

const searchedTraders = [
  {
    traderId: 1,
    name: '트레이더 김철수',
    profileImage: TraderUserImage1,
    description: '안정적인 장기 투자를 선호하는 전문 트레이더입니다.',
    strategiesCount: 3050,
    createdAt: '2024-11-01',
  },
  {
    traderId: 2,
    name: '트레이더 닉네임 이렇게꺼지 길어져도 되는지까지 한번 보자유',
    profileImage: TraderUserImage2,
    description: '단기 수익을 추구하며, 높은 변동성을 활용한 전략이 특징입니다.',
    strategiesCount: 1500,
    createdAt: '2024-04-27',
  },
  {
    traderId: 3,
    name: '내가 바로 투자 짱',
    profileImage: TraderUserImage3,
    description: '주도주로 매매하면 수익은 크고 손실은 작다! 믿는 종목에 발등 찍힌다.',
    strategiesCount: 450,
    createdAt: '2024-05-02',
  },
  {
    traderId: 4,
    name: '투자는 내꺼야',
    profileImage: defaultAvatar,
    description: '투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야',
    strategiesCount: 1200,
    createdAt: '2024-10-07',
  },
  {
    traderId: 5,
    name: '이븐하게 구워줄게요',
    profileImage: defaultAvatar,
    description: '모수에서 먹으면 냠냠 맛있어요.',
    strategiesCount: 8000,
    createdAt: '2024-03-20',
  },
  {
    traderId: 6,
    name: '비트코인 매니아',
    profileImage: defaultAvatar,
    description: '암호화폐 시장의 상승과 하락을 모두 잡습니다.',
    strategiesCount: 2000,
    createdAt: '2024-06-15',
  },
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

const keyword = '투자';
const SearchTotalResultsPage = () => {
  const strategies = generateStrategies(80);
  // const title = `'${keyword}'에 대한 검색 결과`;
  const [sortBy] = useState('');
  const sortedTraders = [...searchedTraders].sort((a, b) => {
    if (sortBy === 'most_strategies') {
      return b.strategiesCount - a.strategiesCount; // 전략 많은 순으로 정렬
    } else if (sortBy === 'new_traders') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 등록일 내림차순
    }
    return 0;
  });
  const topTraders = sortedTraders.slice(0, 4);
  const previewTraders = [...searchedTraders]
    .sort((a, b) => b.strategiesCount - a.strategiesCount)
    .slice(0, 4) // 전략 많은 순으로 정렬 후 상위 4개만
    .map((trader) => trader.traderId);

  // 전략 수익률 기준 상위 5개 식별
  const topStrategiesByReturn = [...strategies]
    .sort((a, b) => b.cumulativeReturn - a.cumulativeReturn)
    .slice(0, 5);

  return (
    <div>
      <h2 css={pageHeadingStyle}>
        <strong>&lsquo;{keyword}&rsquo;&nbsp;</strong>
        <span>에 대한 검색 결과</span>
      </h2>
      <div css={contentStyle}>
        <Link to={`/search/traders?keyword=${encodeURIComponent(keyword)}`} css={linkStyle}>
          <h3 css={headingStyle}>
            트레이더 <span>{searchedTraders.length}</span>
            <div css={iconContainerStyle}>
              <MdOutlineArrowForwardIos />
            </div>
          </h3>
        </Link>
        <div css={listStyle}>
          <TraderList traders={topTraders} badgeRank={previewTraders} />
        </div>
      </div>
      <div css={contentStyle}>
        <Link to={`/search/strategies?keyword=${encodeURIComponent(keyword)}`} css={linkStyle}>
          <h3 css={headingStyle}>
            전략 <span>{strategies.length}</span>
            <div css={iconContainerStyle}>
              <MdOutlineArrowForwardIos />
            </div>
          </h3>
        </Link>
        <div css={listStyle}>
          <SearchedStrategyList strategies={topStrategiesByReturn} />
        </div>
      </div>
    </div>
  );
};
const pageHeadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 76px 0 64px;
  background-color: ${theme.colors.gray[100]};
  font-size: ${theme.typography.fontSizes.heading.h2};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  strong {
    color: ${theme.colors.main.black};
  }
  span {
    color: ${theme.colors.gray[600]};
  }
`;

const contentStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto 72px;
`;
const linkStyle = css`
  display: inline-block;
  margin: 64px auto 32px;
`;
const headingStyle = css`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 64px 0 32px;
  gap: 8px;
  color: ${theme.colors.gray[700]};
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0 auto;
  span {
    color: ${theme.colors.main.primary};
  }
`;
const iconContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  svg {
    height: 20px;
    color: ${theme.colors.gray[400]};
  }
`;

const listStyle = css`
  width: ${theme.layout.width.content};
  justify-content: space-between;
  flex-wrap: wrap; // 가로 여러 줄로 나열
  gap: 24px;
  margin: 0 auto;
`;

export default SearchTotalResultsPage;
