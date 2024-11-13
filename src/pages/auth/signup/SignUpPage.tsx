import { useState } from 'react';

import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';

import Button from '@/components/common/Button';
import SignUpForm from '@/components/page/signup/SignUpForm';
import TermsContainer from '@/components/terms/TermsContainer';
import theme from '@/styles/theme';
import { HomeRouteState } from '@/types/route';
import { TermsState } from '@/types/signup';

const SignUpPage: React.FC = () => {
  const location = useLocation();
  const { userRole } = (location.state as HomeRouteState) || {};

  const [terms, setTerms] = useState<TermsState>({
    privacyRequired: false,
    roleRequired: false,
    marketingOptional: false,
    promotionOptional: false,
  });
  return (
    <div>
      <div css={containerStyle}>
        <h1 css={pageHeadingStyle}>회원정보 입력</h1>
        <div css={formContainerStyle}>
          <SignUpForm />
          <TermsContainer userRole={userRole} terms={terms} setTerms={setTerms} />
          <Button variant='primary' size='lg' width={400}>
            전체동의 후 회원가입
          </Button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 76px 0 83px;
  background-color: ${theme.colors.gray[50]};
`;

const pageHeadingStyle = css`
  font-size: ${theme.typography.fontSizes.heading.h2};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 40px;
`;

const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  padding: 100px 80px 200px 80px;
  background-color: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 10px;
`;

export default SignUpPage;
