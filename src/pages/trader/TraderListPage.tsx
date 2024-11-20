// // const TraderListPage = () => (
// //   <div>
// //     <h1>트레이더 목록 리스트</h1>
// //   </div>
// // );

// // export default TraderListPage;

import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Select from '@/components/common/Select';
import TraderList from '@/components/common/TraderList';
import theme from '@/styles/theme';

const sortOptions = [
  { label: '전략 많은 순', value: 'most_strategies' },
  { label: '신규 트레이더', value: 'new_traders' },
];

const generateTraders = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    traderId: index + 1,
    name: `트레이더 ${index + 1}`,
    profileImage: '/path/to/profile/image.png',
    description: '트레이더의 소개 글이 여기에 들어갑니다. 글이 길어질 경우 자동으로 잘립니다.',
    strategiesCount: Math.floor(Math.random() * 500) + 1,
    followersCount: Math.floor(Math.random() * 10),
  }));

const desc = '관심 있는 트레이더를 찾아 전략과 프로필을 확인해보세요.';

const TraderListPage = () => {
  const traders = generateTraders(70); // 50명의 가상 트레이더 데이터 생성
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
