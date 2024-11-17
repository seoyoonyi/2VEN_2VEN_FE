import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import SearchImage from '@/assets/images/search_image.png';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const EmailFoundPage = () => (
  <div css={containerStyle}>
    <h3 css={pageHeadingStyle}>이메일을 찾았어요!</h3>
    <img src={SearchImage} alt='이메일 찾기 이미지' />
    <p>sy****@n***.com</p>
    <Button width={400}>
      <Link to={ROUTES.AUTH.SIGNIN}>로그인 하러가기</Link>
    </Button>
  </div>
);

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  padding: 160px 0 240px;
  margin: 0 auto;
  img {
    width: 43px;
    margin-bottom: 12px;
    order: 1;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    order: 3;
    width: 400px;
    height: 60px;
    background-color: ${theme.colors.gray[100]};
    font-size: ${theme.typography.fontSizes.subtitle.md};
    line-height: ${theme.typography.lineHeights.md};
    font-weight: ${theme.typography.fontWeight.medium};
    margin-bottom: 32px;
  }

  button {
    order: 4;
  }
`;
const pageHeadingStyle = css`
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 32px;
  order: 2;
`;

export default EmailFoundPage;
