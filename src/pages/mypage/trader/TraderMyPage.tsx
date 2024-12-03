import { useState } from 'react';

import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import Pagination from '@/components/common/Pagination';
import StrategyList from '@/components/common/StrategyList';
import { ROUTES } from '@/constants/routes';
import useFetchStrategyList from '@/hooks/queries/useFetchStrategyList';
import theme from '@/styles/theme';

const TraderMyPage = () => {
  const [page, setPage] = useState(1);
  const limit = 30;

  const { data } = useFetchStrategyList({
    page: page - 1,
    pageSize: limit,
  });

  return (
    <div css={myPageWrapperStyle}>
      <div css={myPageHeaderStyle}>
        <div>
          <h2>나의 전략</h2>
          <p>
            총 <span>{data.totalElements}</span>개의 전략이 있습니다
          </p>
        </div>
        <Link to={ROUTES.MYPAGE.TRADER.STRATEGIES.CREATE}>전략등록</Link>
      </div>
      <div>
        {data?.totalElements === 0 ? (
          <p css={StrategyEmptyStyle}>
            아직 등록된 전략이 없습니다.
            <br /> &apos;전략 등록&apos; 버튼을 눌러 새로운 전략을 추가해보세요!
          </p>
        ) : (
          <div css={tableWrapperStyle}>
            <StrategyList
              strategies={data.data}
              startRank={(page - 1) * limit + 1}
              containerWidth='875px'
              gridTemplate='minmax(0, 2.91fr) minmax(0, 2.29fr) minmax(0, 1.6fr) minmax(0, 1.37fr) minmax(0, 0.91fr) minmax(0, 0.91fr)'
            />
            <Pagination totalPage={data.totalPages} limit={limit} page={page} setPage={setPage} />
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
