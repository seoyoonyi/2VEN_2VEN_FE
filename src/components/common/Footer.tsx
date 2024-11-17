import { css } from '@emotion/react';

import theme from '@/styles/theme';

const Footer = () => (
  <footer css={footerStyle}>
    <div css={containerStyle}>
      <p css={footerTextStyle}>
        사업자 등록번호 : 123-45-67890 <br />
        통신판매업신고 : 제1234-서울 강남구-0000호 <br />
        주소 : 서울특별시 강남구 테헤란로 000, 1층(역삼동)
      </p>
      <p css={footerTextStyle}>COPYRIGHT ⓒ SYSMETIC ALL RIGHT RESERVED</p>
    </div>
  </footer>
);

const footerStyle = css`
  height: 240px;
  background: ${theme.colors.gray[800]};
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: ${theme.layout.width.content};
  padding: 55px 20px;
  margin: 0 auto;
`;

const footerTextStyle = css`
  ${theme.textStyle.captions.caption2};
  text-align: center;
  color: ${theme.colors.gray[400]};
`;

export default Footer;
