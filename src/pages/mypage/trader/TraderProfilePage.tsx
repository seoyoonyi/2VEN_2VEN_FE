import { css } from '@emotion/react';

import theme from '@/styles/theme';

const TraderProfilePage = () => (
  <div css={myPageWrapperStyle}>
    <div css={myPageHeaderStyle}>
      <div>
        <h2>프로필 관리</h2>
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
`;

export default TraderProfilePage;
