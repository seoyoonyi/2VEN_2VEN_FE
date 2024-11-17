import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';
const FindEmailPage = () => (
  <div css={containerStyle}>
    <h3 css={pageHeadingStyle}>이메일 찾기</h3>
    <form css={formStyle}>
      <div>
        <Input type='email' inputSize='lg' placeholder='이메일' showClearButton />
      </div>
      <Button width={400} css={buttonStyle} disabled>
        확인
      </Button>
    </form>
    <ul css={findPassLinkStyle}>
      <li>비밀번호가 기억나지 않나요?</li>
      <li>
        <Link to={ROUTES.AUTH.FIND.PASSWORD}>비밀번호 찾기</Link>
      </li>
    </ul>
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
`;
const pageHeadingStyle = css`
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 32px;
`;
const formStyle = css`
  flex-direction: column;
  input {
    width: 400px;
  }
`;
const buttonStyle = css`
  margin-top: 24px;
`;
const findPassLinkStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 32px;

  li {
    position: relative;
    color: ${theme.colors.gray[900]};
    font-size: ${theme.typography.fontSizes.body};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.medium};
    padding: 0 17px;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      height: 16px;
      transform: translateY(-50%);
      background-color: ${theme.colors.gray[300]};
    }
    &:last-child {
      font-weight: ${theme.typography.fontWeight.bold};
    }
    &:last-child::after {
      display: none;
    }
  }
`;
export default FindEmailPage;
