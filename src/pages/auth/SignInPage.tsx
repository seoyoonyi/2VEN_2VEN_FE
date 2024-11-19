import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants/routes';
import { useSigninMutation } from '@/hooks/mutations/useAuthMutation';
import theme from '@/styles/theme';
import { isValidPassword, validateEmail } from '@/utils/validation';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorField, setErrorField] = useState<'email' | 'password' | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: signin } = useSigninMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(''); // 에러메시지 초기화
    setErrorField(null); // 에러필드 초기화

    const emailValidation = validateEmail(email);
    const passwordValidation = isValidPassword(password);

    if (!emailValidation.isValid) {
      setErrorMessage(emailValidation.message);
      setErrorField('email');
      emailInputRef.current?.focus();
      return;
    }

    if (!passwordValidation.isValid) {
      setErrorMessage(passwordValidation.message);
      setErrorField('password');
      passwordInputRef.current?.focus();
      return;
    }
    try {
      // 콘솔에서 확인
      const result = await signin({ email, password });
      if (result.status === 'success' && result.data) {
        // 로그인 성공 시
        // role을 state로 전달하지 않고, 단순 홈으로 이동
        navigate(ROUTES.HOME.PATH, { replace: true });
        // replace: true로 설정하여 뒤로가기 시 로그인 페이지로 돌아가지 않도록 설정
      }
    } catch (error) {
      console.error('Signin failed: ', error);
      setErrorMessage('이메일 또는 비밀번호가 잘못 되었습니다. 다시 입력해 주세요.');
      setErrorField(null);
    }
  };

  // 입력값 변경되면 에러메시지 제거
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorField === 'email') {
      const validation = validateEmail(e.target.value);
      if (validation.isValid) {
        setErrorMessage('');
        setErrorField(null);
      }
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorField === 'password') {
      const validation = isValidPassword(e.target.value);
      if (validation.isValid) {
        setErrorMessage('');
        setErrorField(null);
      }
    }
  };
  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>로그인</h3>
      <form css={formStyle} onSubmit={handleSubmit}>
        <div css={divStyle}>
          <Input
            ref={emailInputRef}
            type='text'
            inputSize='lg'
            leftIcon='mail'
            placeholder='이메일'
            showClearButton
            value={email}
            onChange={handleEmailChange}
            status={errorField === 'email' ? 'error' : 'default'}
          />
        </div>
        <div>
          <Input
            ref={passwordInputRef}
            type='password'
            inputSize='lg'
            leftIcon='key'
            rightIcon='eye'
            placeholder='비밀번호'
            value={password}
            onChange={handlePasswordChange}
            status={errorField === 'password' ? 'error' : 'default'}
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

  input {
    width: 400px;
    text-indent: 10px;
  }
`;
const divStyle = css`
  margin-bottom: 12px;
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
