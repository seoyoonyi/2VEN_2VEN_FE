import { useState, useEffect } from 'react';

import { css } from '@emotion/react';

import TraderUserImage3 from '@/assets/images/ani_trader.png';
import TraderUserImage1 from '@/assets/images/apt_trader.png';
import TraderUserImage2 from '@/assets/images/nimo_trader.png';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Select from '@/components/common/Select';
import TraderList from '@/components/common/TraderList';
import theme from '@/styles/theme';

const desc = [{ text: '관심 있는 트레이더를 찾아 전략과 프로필을 확인해보세요.' }];

const sortOptions = [
  { label: '전략 많은 순', value: 'most_strategies' },
  { label: '신규 트레이더', value: 'new_traders' },
];

const generateTraders = [
  {
    traderId: '1',
    name: '트레이더 김철수',
    profileImage: TraderUserImage1,
    description: '안정적인 장기 투자를 선호하는 전문 트레이더입니다.',
    strategiesCount: 3050,
    createdAt: '2024-11-01',
  },
  {
    traderId: '2',
    name: '트레이더 닉네임 이렇게꺼지 길어져도 되는지까지 한번 보자유',
    profileImage: TraderUserImage2,
    description: '단기 수익을 추구하며, 높은 변동성을 활용한 전략이 특징입니다.',
    strategiesCount: 1500,
    createdAt: '2024-04-27',
  },
  {
    traderId: '3',
    name: '내가 바로 투자 짱',
    profileImage: TraderUserImage3,
    description: '주도주로 매매하면 수익은 크고 손실은 작다! 믿는 종목에 발등 찍힌다.',
    strategiesCount: 450,
    createdAt: '2024-05-02',
  },
  {
    traderId: '4',
    name: '투자는 내꺼야',
    profileImage: '/path/to/profile/image4.png',
    description: '투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야',
    strategiesCount: 1200,
    createdAt: '2024-10-07',
  },
  {
    traderId: '5',
    name: '이븐하게 구워줄게요',
    profileImage: '/path/to/profile/image5.png',
    description: '모수에서 먹으면 냠냠 맛있어요.',
    strategiesCount: 8000,
    createdAt: '2024-03-20',
  },
  {
    traderId: '6',
    name: '비트코인 매니아',
    profileImage: '/path/to/profile/image6.png',
    description: '암호화폐 시장의 상승과 하락을 모두 잡습니다.',
    strategiesCount: 2000,
    createdAt: '2024-06-15',
  },
  {
    traderId: '7',
    name: '글로벌 트레이더',
    profileImage: '/path/to/profile/image7.png',
    description: '전 세계 다양한 시장에 투자 경험이 풍부합니다.',
    strategiesCount: 1800,
    createdAt: '2024-07-19',
  },
  {
    traderId: '8',
    name: '성장주 전문가',
    profileImage: '/path/to/profile/image8.png',
    description: '고성장 기업 발굴 전문가입니다.',
    strategiesCount: 1450,
    createdAt: '2024-08-13',
  },
  {
    traderId: '9',
    name: '가치주 매니저',
    profileImage: '/path/to/profile/image9.png',
    description: '가치투자로 장기 수익률을 극대화합니다.',
    strategiesCount: 950,
    createdAt: '2024-02-14',
  },
  {
    traderId: '10',
    name: '숏 트레이더',
    profileImage: '/path/to/profile/image10.png',
    description: '숏 포지션으로 하락장을 기회로 삼습니다.',
    strategiesCount: 750,
    createdAt: '2024-11-01',
  },
  {
    traderId: '11',
    name: '테마주 트레이더',
    profileImage: '/path/to/profile/image11.png',
    description: '시장의 핫한 테마를 선점하는 전략가입니다.',
    strategiesCount: 2100,
    createdAt: '2024-01-22',
  },
  {
    traderId: '12',
    name: '배당주 투자자',
    profileImage: '/path/to/profile/image12.png',
    description: '안정적인 배당 수익을 목표로 투자합니다.',
    strategiesCount: 1300,
    createdAt: '2024-05-27',
  },
  {
    traderId: '13',
    name: '주식 초보 트레이더',
    profileImage: '/path/to/profile/image13.png',
    description: '초보지만 꾸준히 배우며 성장 중입니다.',
    strategiesCount: 300,
    createdAt: '2024-03-08',
  },
  {
    traderId: '14',
    name: '옵션 트레이더',
    profileImage: '/path/to/profile/image14.png',
    description: '옵션 거래를 활용한 고수익 추구가 특징입니다.',
    strategiesCount: 1150,
    createdAt: '2024-06-01',
  },
  {
    traderId: '15',
    name: '퀀트 투자 전문가',
    profileImage: '/path/to/profile/image15.png',
    description: '데이터 기반의 퀀트 전략으로 투자합니다.',
    strategiesCount: 2200,
    createdAt: '2024-10-20',
  },
  {
    traderId: '16',
    name: '리스크 관리 전문가',
    profileImage: '/path/to/profile/image16.png',
    description: '리스크 최소화와 안정적 수익을 목표로 합니다.',
    strategiesCount: 1600,
    createdAt: '2024-04-02',
  },
  {
    traderId: '17',
    name: 'ETF 트레이더',
    profileImage: '/path/to/profile/image17.png',
    description: 'ETF로 다양한 시장에 손쉽게 투자합니다.',
    strategiesCount: 1400,
    createdAt: '2024-09-25',
  },
  {
    traderId: '18',
    name: '크립토 고수',
    profileImage: '/path/to/profile/image18.png',
    description: '암호화폐에서 최적의 투자 전략을 구사합니다.',
    strategiesCount: 1850,
    createdAt: '2024-07-05',
  },
  {
    traderId: '19',
    name: '펀드 매니저',
    profileImage: '/path/to/profile/image19.png',
    description: '펀드 관리 경험이 풍부한 투자자입니다.',
    strategiesCount: 2800,
    createdAt: '2024-08-23',
  },
  {
    traderId: '20',
    name: '기술주 애호가',
    profileImage: '/path/to/profile/image20.png',
    description: '첨단 기술 관련 주식에 주로 투자합니다.',
    strategiesCount: 1950,
    createdAt: '2024-02-07',
  },
];

const TraderListPage = () => {
  const traders = generateTraders;
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const limit = 14; // 한 페이지당 2칸씩*7줄
  const totalPages = Math.ceil(traders.length / limit);

  const sortedTraders = [...traders].sort((a, b) => {
    if (sortBy === 'most_strategies') {
      return b.strategiesCount - a.strategiesCount; // 전략 많은 순으로 정렬
    } else if (sortBy === 'new_traders') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 등록일 내림차순
    }
    return 0;
  });

  const currentPageData = sortedTraders.slice((page - 1) * limit, page * limit);

  // strategiesCount 기준으로 상위 10명을 식별
  const badgeRank = [...traders]
    .sort((a, b) => b.strategiesCount - a.strategiesCount)
    .slice(0, 10)
    .map((trader) => trader.traderId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div>
      <PageHeader title='트레이더' desc={desc} descType='center' />
      <div css={traderListContainerStyle}>
        <div css={filterBarContainerStyle}>
          <div css={totalStyle}>
            Total <span>{traders.length}</span>
          </div>
          <Select
            options={sortOptions}
            onChange={(option) => setSortBy(option.value)}
            defaultLabel='기본 등록 순'
            type='sm'
            width='160px'
          />
        </div>
        <div css={listContainerStyle}>
          <TraderList traders={currentPageData} badgeRank={badgeRank} />
          <Pagination totalPage={totalPages} limit={limit} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

const traderListContainerStyle = css`
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

const totalStyle = css`
  color: ${theme.colors.gray[700]};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};

  span {
    color: ${theme.colors.main.primary};
  }
`;

const listContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default TraderListPage;
