import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import theme from '@/styles/theme';

const TraderMyPage = () => (
  <div css={containerStyle}>
    <div css={myPageHeaderStyle}>
      <div>
        <h2>나의 전략</h2>
        <p>
          총 <span>0</span>개의 전략이 있습니다
        </p>
      </div>
      <Link to=''>전략등록</Link>
    </div>
    <div>
      <p css={StrategyEmptyStyle}>
        아직 등록된 전략이 없습니다.
        <br /> &apos;전략 등록&apos; 버튼을 눌러 새로운 전략을 추가해보세요!
      </p>
    </div>
  </div>
);

const containerStyle = css`
  width: 955px;
  height: 609px;
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
  // outline: 1px solid red;
`;

export default TraderMyPage;
