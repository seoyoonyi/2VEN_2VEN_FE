import { css } from '@emotion/react';

const InquiryContent = () => (
  <div css={containerStyle}>
    <h1>문의내용자리</h1>
  </div>
);

const containerStyle = css`
  display: flex;
  width: 100%;
  height: 100px;
  outline: 1px solid blue;
`;

export default InquiryContent;
