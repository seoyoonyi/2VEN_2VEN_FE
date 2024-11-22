import { css } from '@emotion/react';

import theme from '@/styles/theme';

const StrategyApprovalListPage = () => (
  <>
    <h2 css={adminHeaderStyle}>전략승인관리 목록 페이지</h2>
  </>
);

const adminHeaderStyle = css`
  margin-bottom: 40px;
  ${theme.textStyle.headings.h3}
`;

export default StrategyApprovalListPage;
