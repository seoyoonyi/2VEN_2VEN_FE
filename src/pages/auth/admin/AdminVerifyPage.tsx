import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import VerificationInput from '@/components/page/signup/VerificationInput';
import theme from '@/styles/theme';

const AdminVerifyPage = () => {
  const [isVerificationActive, setIsVerificationActive] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 페이지 마운트하면 자동으로 인증번호 요청
  useEffect(() => {
    requestAdminVerification();
  }, []);

  // 인증번호 재요청
  const requestAdminVerification = () => {
    try {
      // 인증번호 요청 로직
      setIsVerificationActive(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('인증번호 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>관리자 전용</h3>
      <VerificationInput
        value={verificationCode}
        onChange={setVerificationCode}
        isActive={isVerificationActive}
        onTimeEnd={() => {
          setErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
        }}
      />
      {errorMessage && <p>{errorMessage}</p>}
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
export default AdminVerifyPage;
