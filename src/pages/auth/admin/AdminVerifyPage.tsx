import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import VerificationInput from '@/components/page/signup/VerificationInput';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';
import { validateCode } from '@/utils/validation';

const AdminVerifyPage = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resetTimer, setResetTimer] = useState<number>(0); // 타이머 리셋을 위한 상태
  const [shouldReset, setShouldReset] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  // 재전송 처리를 위한 useEffect
  useEffect(() => {
    if (shouldReset) {
      setErrorMessage('');
      setResetTimer((prev) => prev + 1);
      setIsInputDisabled(false); // 입력창 활성화
      setShouldReset(false);
    }
  }, [shouldReset]);

  // verificationCode가 변경될 때마다 실행
  useEffect(() => {
    // 입력값이 비어있다면 에러메시지 제거
    if (!verificationCode) {
      setErrorMessage('');
    }
  }, [verificationCode]);

  // 인증번호 재요청
  const handleResend = () => {
    setShouldReset(true);
    // setState는 비동기이므로, 이 시점에서는 아직 errorMessage가 변경되지 않았음
    try {
      // await requestVerificationEmail(); // 관리자 이메일로 인증번호 요청 API

      // 인증번호 요청 성공 시, isVerificationActive를 토글 => 타이머 재시작!
      setResetTimer((prev) => prev + 1); // 타이머 리셋
    } catch (error) {
      setErrorMessage('인증번호 발송에 실패했습니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = validateCode(verificationCode); // 인증번호 유효성 검증

    if (isInputDisabled) {
      setErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
      return;
    }

    // if (validationResult.isValid) {
    if (verificationCode === '123456') {
      navigate(ROUTES.ADMIN.STRATEGY.APPROVAL); // 관리자 전략 승인 페이지로 이동
    } else {
      setErrorMessage(validationResult.message);
    }
  };
  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>관리자 전용</h3>
      <form onSubmit={handleSubmit}>
        <div css={emailVerifyContainer}>
          <VerificationInput
            value={verificationCode}
            onChange={setVerificationCode}
            resetTimer={resetTimer}
            onTimeEnd={() => {
              setIsInputDisabled(true); // 입력창 비활성화
              setErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
            }}
            isDisabled={isInputDisabled}
          />
          <Button type='button' variant='accent' size='md' width={100} onClick={handleResend}>
            재전송
          </Button>
        </div>

        <Button
          type='submit'
          width={400}
          css={buttonStyle}
          disabled={!verificationCode || isInputDisabled}
        >
          확인
        </Button>
      </form>
      {errorMessage && <p css={messageStyle}>{errorMessage}</p>}
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

const emailVerifyContainer = css`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-bottom: 12px;
`;

const buttonStyle = css`
  margin-top: 24px;
`;
const messageStyle = css`
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;
export default AdminVerifyPage;
