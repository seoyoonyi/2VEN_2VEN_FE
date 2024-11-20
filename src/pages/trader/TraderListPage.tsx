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

const sortOptions = [
  { label: '전략 많은 순', value: 'most_strategies' },
  { label: '신규 트레이더', value: 'new_traders' },
];

const generateTraders = (count: number) => {
  // 5개의 기본 데이터 정의
  const baseTraders = [
    {
      traderId: 1,
      name: '트레이더 김철수',
      profileImage: TraderUserImage1,
      description: '안정적인 장기 투자를 선호하는 전문 트레이더입니다.',
      strategiesCount: 3050,
      followersCount: 0,
    },
    {
      traderId: 2,
      name: '트레이더 닉네임 이렇게꺼지 길어져도 되는지까지 한번 보자유',
      profileImage: TraderUserImage2,
      description: '단기 수익을 추구하며, 높은 변동성을 활용한 전략이 특징입니다.',
      strategiesCount: 1500,
      followersCount: 3,
    },
    {
      traderId: 3,
      name: '내가 바로 투자 짱',
      profileImage: TraderUserImage3,
      description:
        '주도주로 매매하면 수익은 크고 손실은 작다! 믿는 종목에 발등 찍힌다. 주도주로 매매하면 수익은 크고 손실은 작다! 믿는 종목에 발등 찍힌다. 내용이 길다',
      strategiesCount: 450,
      followersCount: 8,
    },
    {
      traderId: 4,
      name: '투자는 내꺼야',
      profileImage: '/path/to/profile/image4.png',
      description:
        '투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야투자는 내꺼야',
      strategiesCount: 1200,
      followersCount: 5,
    },
    {
      traderId: 5,
      name: '이븐하게 구워줄게요',
      profileImage: '/path/to/profile/image5.png',
      description: '모수에서 먹으면 냠냠 맛있어요',
      strategiesCount: 8000,
      followersCount: 1,
    },
  ];

  // 기본 데이터를 반복하여 원하는 개수(count)만큼 생성
  return Array.from({ length: count }, (_, index) => {
    const baseIndex = index % baseTraders.length; // 0~4 반복
    const baseTrader = baseTraders[baseIndex];
    return {
      ...baseTrader,
      traderId: index + 1, // 고유 ID 부여
    };
  });
};

const desc = '관심 있는 트레이더를 찾아 전략과 프로필을 확인해보세요.';

const TraderListPage = () => {
  const traders = generateTraders(75); // 50명의 가상 트레이더 데이터 생성
  const [page, setPage] = useState(1);
  const limit = 14; // 한 페이지당 2칸씩*7줄
  const totalPages = Math.ceil(traders.length / limit);
  const currentPageData = traders.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 변경 시 스크롤 맨 위로 이동
  }, [page]);

  return (
    <div>
      <PageHeader title='트레이더' desc={desc} />
      <div css={traderListContainerStyle}>
        <div css={filterBarContainerStyle}>
          <div css={totalStyle}>
            Total <span>{traders.length}</span>
          </div>
          <Select
            options={sortOptions}
            onChange={() => {}}
            defaultLabel='전략 많은 순'
            type='sm'
            width='160px'
          />
        </div>
        <div css={listContainerStyle}>
          <TraderList traders={currentPageData} />
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
