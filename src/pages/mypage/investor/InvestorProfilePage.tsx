import { css } from '@emotion/react';

import theme from '@/styles/theme';

const InvestorProfilePage = () => (
  <>
    <div css={myPageHeaderStyle}>
      <div>
        <h2>프로필 관리</h2>
      </div>
    </div>
    <div></div>
  </>
);

const myPageHeaderStyle = css`
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
  }
`;

export default InvestorProfilePage;
