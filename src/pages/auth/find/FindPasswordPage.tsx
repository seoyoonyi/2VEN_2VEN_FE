import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import tickImage from '@/assets/images/tick.svg';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const FindPasswordPage = () => {
  const handleEmailVerification = () => {
    // 이메일 인증 요청 로직
  };
  const handleCodeVerification = () => {
    // 이메일 인증코드 확인
  };
  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>비밀번호 찾기</h3>
      <p css={infoStyle}>
        <img src={tickImage} alt='tick' />
        <span>시스메틱에 가입한 이메일을 정확히 입력해주세요</span>
      </p>
      <form onSubmit={handleEmailVerification}>
        <div css={emailVerifyContainer}>
          <Input type='email' inputSize='lg' required name='email' placeholder='1234@naver.com' />
          <Button type='submit' variant='accent' size='md' width={100}>
            인증요청
          </Button>
        </div>
      </form>
      <form css={formStyle} onSubmit={handleCodeVerification}>
        <Input
          type='text'
          inputSize='lg'
          required
          pattern='\d{6}' // 6자리 숫자만 입력 가능
          name='verificationCode'
          placeholder='메일로 받은 인증번호 입력'
        />
        <Button type='submit' width={400} disabled>
          확인
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
};

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
const emailVerifyContainer = css`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-bottom: 12px;

  input {
    width: 288px;
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
export default FindPasswordPage;
