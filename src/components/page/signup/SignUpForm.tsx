import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import VerificationInput from '@/components/page/signup/VerificationInput';
import { ROUTES } from '@/constants/routes';
import { useNicknameValidation } from '@/hooks/mutations/useNicknameValidation';
import { UseSignupEmailVerification } from '@/hooks/mutations/useSignupEmailVerification';
import { useVerifyAdminCodeMutation } from '@/hooks/mutations/useVerifacationMutation';
import { useSignupStore } from '@/stores/signupStore';
import theme from '@/styles/theme';
import { validateCode, validateEmail } from '@/utils/validation';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [verifyErrorMessage, setVerifyErrorMessage] = useState<string>('');
  const [resetTimer, setResetTimer] = useState<number>(0); // 타이머 리셋을 위한 상태
  const [isInputDisabled, setIsInputDisabled] = useState(true); // 페이지 로드 시 입력창 비활성화
  const [isVerificationActive, setIsVerificationActive] = useState(true);
  // 인증 요청버튼 클릭했는지 여부 추적하는 NEW 상태
  const [isVerficationRequested, setIsVerificationRequested] = useState(false);

  const { mutate: requestEmailVerification } = UseSignupEmailVerification({
    onSuccess: () => {
      setVerificationCode('');
      setEmailErrorMessage('');
      setIsVerificationActive(true);
      setResetTimer((prev) => prev + 1);
      setIsInputDisabled(false);
      setIsVerificationRequested(true);
    },
    onError: (error) => {
      // 에러 발생 시 타이머 중지
      setIsVerificationRequested(false);
      setEmailErrorMessage(error.message);
      setIsVerificationActive(false);
    },
  });

  const { mutate: verifyCode } = useVerifyAdminCodeMutation();

  const { nickname, nicknameMessage, actions } = useSignupStore();
  const { nicknameCheck, handleNicknameCheck } = useNicknameValidation();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.setNickname(e.target.value);
    if (!e.target.value) {
      actions.setNicknameMessage('');
    }
  };

  const handleNicknameBlur = () => {
    if (nicknameMessage.includes('사용 가능')) {
      actions.setNicknameMessage('');
    }
  };

  // verificationCode가 변경될 때마다 실행
  useEffect(() => {
    // 입력값이 비어있다면 에러메시지 제거
    if (!verificationCode) {
      setVerifyErrorMessage('');
    }
  }, [verificationCode]);

  // email 값이 변경될 때마다 실행되는 함수
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);

    // 입력값이 비어있으면 에러 상태와 메시지 초기화
    if (!newValue) {
      setEmailErrorMessage('');
    }
  };

  // email 값이 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // 입력값이 비어있다면 에러 상태 초기화
    if (!email) {
      setEmailErrorMessage('');
    }
  }, [email]);

  const handleEmailVerification = () => {
    console.log(isVerificationActive);

    // 이메일 입력값 확인
    if (!email) {
      setEmailErrorMessage('이메일을 입력해주세요.');
      return;
    }
    // 이메일 유효성 검사
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailErrorMessage(emailValidation.message);
      return;
    }

    // 요청 전에 먼저 UI 표시
    setIsVerificationRequested(true);
    // 이메일 인증 요청 로직
    requestEmailVerification(email);
  };

  const handleCodeVerification = (e: React.FormEvent<HTMLFormElement>) => {
    // 이메일 인증코드 확인
    e.preventDefault();
    const validationResult = validateCode(verificationCode); // 인증번호 유효성 검증

    if (isInputDisabled) {
      setVerifyErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
      return;
    }
    if (!validationResult.isValid) {
      setVerifyErrorMessage(validationResult.message);
      return;
    }
    verifyCode(
      { email, verificationCode },
      {
        onSuccess: (response) => {
          if (response.status === 'success') {
            navigate(ROUTES.AUTH.FIND.PASSWORD_RESET, { replace: true });
          } else {
            setVerifyErrorMessage('인증에 실패했습니다. 다시 시도해주세요.');
          }
        },
        onError: (error: AxiosError) => {
          if (error.response?.status === 401) {
            setVerifyErrorMessage('올바른 인증번호가 아닙니다.');
          } else {
            setVerifyErrorMessage('인증 처리 중 오류가 발생했습니다.');
          }
        },
      }
    );
  };

  return (
    <div>
      <div css={inputGroupStyle}>
        <label htmlFor='email' css={labelStyle}>
          이메일
        </label>
        <div css={emailVerifyContainer}>
          <div css={divGroupStyle}>
            <Input
              id='email'
              type='text'
              inputSize='md'
              required
              name='email'
              placeholder='1234@naver.com'
              value={email}
              onChange={handleEmailChange}
              status={emailErrorMessage ? 'error' : 'default'}
            />
            {emailErrorMessage && <p css={messageStyle}>{emailErrorMessage}</p>}
          </div>
          <Button
            type='button'
            variant='primary'
            size='sm'
            width={100}
            onClick={handleEmailVerification} // 인증요청
          >
            인증요청
          </Button>
        </div>
      </div>
      <div css={inputGroupStyle}>
        <label htmlFor='auth_code' css={labelStyle}>
          인증번호
        </label>
        <div css={divGroupStyle}>
          <form css={formStyle} onSubmit={handleCodeVerification}>
            <VerificationInput
              id='auth_code'
              value={verificationCode}
              onChange={setVerificationCode}
              resetTimer={resetTimer}
              startTimer={isVerficationRequested} // 인증요청이 있을 때만 타이머 시작
              onTimeEnd={() => {
                setIsInputDisabled(true); // 입력창 비활성화
                setIsVerificationRequested(false); // 타이머 종료하면 인증요청상태도 리셋!
                setVerifyErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
              }}
              isDisabled={isInputDisabled}
            />
            <Button type='submit' size='sm' width={100} disabled={isInputDisabled}>
              확인
            </Button>
          </form>
          {verifyErrorMessage && <p css={messageStyle}>{verifyErrorMessage}</p>}
        </div>
      </div>
      <div css={inputGroupStyle}>
        <label htmlFor='password' css={labelStyle}>
          비밀번호
        </label>
        <Input
          id='password'
          type='password'
          inputSize='md'
          placeholder='영문 숫자를 포함한 8자 이상'
        />
      </div>
      <div css={inputGroupStyle}>
        <label htmlFor='password_check' css={labelStyle}>
          비밀번호 확인
        </label>
        <Input
          id='password_check'
          type='password'
          inputSize='md'
          placeholder='비밀번호를 한번 더 입력해주세요.'
        />
      </div>
      <div css={inputGroupStyle}>
        <label htmlFor='nickname' css={labelStyle}>
          닉네임
        </label>
        <div css={divGroupStyle}>
          <Input
            id='nickname'
            inputSize='md'
            placeholder='사용할 닉네임을 입력해주세요.'
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameBlur}
            status={
              nicknameMessage
                ? nicknameMessage.includes('사용 가능한 닉네임')
                  ? 'success'
                  : 'error'
                : 'default'
            }
          />
          {nicknameMessage && (
            <p
              css={[
                messageStyle,
                nicknameMessage.includes('사용 가능한 닉네임') && successMessageStyle,
              ]}
            >
              {nicknameMessage}
            </p>
          )}
        </div>
        <Button
          variant='primary'
          size='sm'
          width={100}
          onClick={() => handleNicknameCheck(nickname)}
          disabled={!nickname || nicknameCheck.isPending}
        >
          중복확인
        </Button>
      </div>
      <div css={inputGroupStyle}>
        <label htmlFor='phone' css={labelStyle}>
          휴대폰번호
        </label>
        <Input id='phone' inputSize='md' placeholder='01012345678' />
      </div>
    </div>
  );
};

const inputGroupStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 665px;
  margin-bottom: 24px;

  input {
    width: 444px;
  }
  button {
    margin-left: 12px;
  }
`;

const emailVerifyContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const formStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 444px;
    padding: 12px;
    height: 48px;
    &::placeholder {
      font-size: ${theme.typography.fontSizes.body};
    }
  }
`;

const labelStyle = css`
  display: inline-block;
  width: 109px;
  text-align: left;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
`;
const divGroupStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  p {
    position: absolute;
    left: 0;
    text-indent: 5px;
    bottom: -20px;
  }
`;
const messageStyle = css`
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;
const successMessageStyle = css`
  color: ${theme.colors.main.primary};
`;
export default SignUpForm;
