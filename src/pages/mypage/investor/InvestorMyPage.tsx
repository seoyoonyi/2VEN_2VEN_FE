import { css } from '@emotion/react';

import theme from '@/styles/theme';

const InvestorMyPage = () => (
  <div css={myPageWrapperStyle}>
    <div css={myPageHeaderStyle}>
      <div>
        <h2>나의 관심 전략</h2>
        <p>
          총 <span>1</span>개의 폴더가 있습니다
        </p>
      </div>
    </div>
    <div></div>
  </div>
);

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
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
`;

export default InvestorMyPage;
