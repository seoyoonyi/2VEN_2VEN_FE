import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import tickImage from '@/assets/images/tick.svg';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';
const ResetPasswordPage = () => (
  <div css={containerStyle}>
    <h3 css={pageHeadingStyle}>비밀번호 재설정</h3>
    <p css={infoStyle}>
      <img src={tickImage} alt='tick' />
      <span>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요</span>
    </p>
    <form css={formStyle}>
      <Input
        type='password'
        inputSize='lg'
        required
        name='newpassword'
        placeholder='새 비밀번호 등록'
        css={inputStyle}
      />
      <Input
        type='password'
        inputSize='lg'
        required
        name='newpassword-confirm'
        placeholder='새 비밀번호 확인'
      />
      <Button type='submit' width={400} disabled>
        완료
      </Button>
    </form>
    <ul css={findEmailLinkStyle}>
      <li>이메일이 기억나지 않나요?</li>
      <li>
        <Link to={ROUTES.AUTH.FIND.EMAIL}>이메일 찾기</Link>
      </li>
    </ul>
  </div>
);

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  padding: 160px 0 240px;
  margin: 0 auto;
`;

const pageHeadingStyle = css`
  text-align: center;
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 32px;
`;

const infoStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  span {
    color: ${theme.colors.gray[600]};
    font-size: ${theme.typography.fontSizes.caption};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;
const formStyle = css`
  input {
    width: 400px;
  }
  button {
    margin-top: 24px;
  }
`;
const inputStyle = css`
  margin-bottom: 12px;
`;
const findEmailLinkStyle = css`
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
export default ResetPasswordPage;
