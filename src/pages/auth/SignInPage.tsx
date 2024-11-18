import { useState } from 'react';

import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

import { useSignin } from '@/api/auth';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';
import { isValidPassword, validateEmail } from '@/utils/validation';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const signin = useSignin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValidation = validateEmail(email);
    const passwordValidation = isValidPassword(password);

    if (!emailValidation.isValid) {
      setErrorMessage(emailValidation.message);
      return;
    }

    if (!passwordValidation.isValid) {
      setErrorMessage(passwordValidation.message);
      return;
    }
    try {
      // 콘솔에서 확인
      const result = await signin.mutateAsync({ email, password });
      if (result.status === 'success' && result.data) {
        // 로그인 성공 시
        // role을 state로 전달하지 않고, 단순 홈으로 이동
        navigate(ROUTES.HOME.PATH, { replace: true });
        // replace: true로 설정하여 뒤로가기 시 로그인 페이지로 돌아가지 않도록 설정
      }
    } catch (error) {
      console.error('Signin failed: ', error);
    }
  };

  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>로그인</h3>
      <form css={formStyle} onSubmit={handleSubmit}>
        <div>
          <Input
            type='text'
            inputSize='lg'
            leftIcon='mail'
            placeholder='이메일'
            showClearButton
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Input
            type='password'
            inputSize='lg'
            leftIcon='key'
            rightIcon='eye'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' width={400} css={buttonStyle} disabled={!email || !password}>
            로그인
          </Button>
        </div>
      </form>
      {errorMessage && <p css={messageStyle}>{errorMessage}</p>}
      <ul css={signinLinkStyle}>
        <li>
          <Link to={ROUTES.AUTH.FIND.EMAIL}>아이디 찾기</Link>
        </li>
        <li>
          <Link to={ROUTES.AUTH.FIND.PASSWORD}>비밀번호 찾기</Link>
        </li>
        <li>
          <Link to={ROUTES.AUTH.SIGNUP.SELECT_TYPE}>회원가입</Link>
        </li>
      </ul>
    </div>
  );
};
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

  & > div:first-child {
    margin-bottom: 12px;
  }
  input {
    width: 400px;
    text-indent: 10px;
  }
`;
const buttonStyle = css`
  margin-top: 24px;
`;
const signinLinkStyle = css`
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
    font-weight: ${theme.typography.fontWeight.bold};
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
    &:last-child::after {
      display: none;
    }
  }
`;
const messageStyle = css`
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;
export default SignInPage;
