import { useState } from 'react';

import { css } from '@emotion/react';
import { useSearchParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import SearchedStrategyList from '@/components/page/search/SearchedStrategyList';
import { useSearchStrategies } from '@/hooks/queries/useSearch';
import theme from '@/styles/theme';
import { mapToStrategyData } from '@/utils/mappers';
import { shortenString } from '@/utils/string';

const SearchResultsInStrategy = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const { data: strategyResults, isLoading: isLoadingStrategies } = useSearchStrategies(keyword, {
    page: currentPage - 1, // 페이지는 0부터 시작
    pageSize: 25,
  }); // 전략 검색 결과

  const mappedStrategies = strategyResults?.data.map(mapToStrategyData) ?? [];
  if (isLoadingStrategies) {
    return <Loader />;
  }
  return (
    <div css={containerStyle}>
      <h2 css={pageHeadingStyle}>
        <strong>{shortenString(keyword, 10)}&nbsp;</strong>
        <span>에 대한 전략 검색 결과</span>
        <span css={totalCountStyle}>{strategyResults?.totalElements ?? 0}</span>
      </h2>
      <div css={headerStyle}>
        <div css={totalStyle}>
          Total <span>{strategyResults?.totalElements ?? 0}</span>
        </div>
      </div>
      <SearchedStrategyList strategies={mappedStrategies} />
      <div css={paginationWrapperStyle}>
        <Pagination
          totalPage={strategyResults?.totalPages ?? 1}
          limit={5}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

const containerStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 40px 0;
  margin-bottom: 76px;
`;
const pageHeadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 76px 0 64px;
  background-color: ${theme.colors.gray[100]};
  font-size: ${theme.typography.fontSizes.heading.h2};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  strong {
    color: ${theme.colors.teal[700]};
  }
  span {
    color: ${theme.colors.gray[700]};
  }
  span:last-of-type {
    color: ${theme.colors.main.primary};
  }
`;
const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 64px;
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
const paginationWrapperStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const totalCountStyle = css`
  display: flex;
  width: 56px;
  height: 32px;
  justify-content: center;
  align-items: center;
  font-size: ${theme.typography.fontSizes.body};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  background-color: ${theme.colors.teal[50]};
  border-radius: 100px;
`;
export default SearchResultsInStrategy;
