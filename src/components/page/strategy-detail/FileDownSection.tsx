import { css } from '@emotion/react';

import theme from '@/styles/theme';

const FileDownSection = () => <div css={fileDownStyle}></div>;

const fileDownStyle = css`
  display: flex;
  padding: 20 24px;
  align-items: flex-start;
  border: 1px solid ${theme.colors.gray[300]};
`;
export default FileDownSection;
