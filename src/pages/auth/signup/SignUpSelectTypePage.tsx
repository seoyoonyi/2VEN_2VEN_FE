import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import SignupTypeCard from '@/components/page/signup/SignupTypeCard';
import { ROUTES } from '@/constants/routes';
import { USER_TYPE_TEXT } from '@/constants/signup';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';

const SignUpSelectTypePage = () => {
  const navigate = useNavigate();

  const signupTypes = Object.entries(USER_TYPE_TEXT).map(([type, data]) => ({
    type: type as UserRole, // investor, trader
    ...data, // heading, description, src, alt
  }));

  const handleSignup = (role: UserRole) => {
    navigate(ROUTES.AUTH.SIGNUP.FORM, { state: { userRole: role } }); // HomeRouteState 타입에 맞게 객체로 전달(investor, trader)
  };

  return (
    <div css={containerStyle}>
      <h1 css={pageHeadingStyle}>회원가입</h1>
      <div css={cardContainerStyle}>
        {signupTypes.map(({ type, heading, description, src, alt }) => (
          <SignupTypeCard
            key={type}
            heading={heading}
            description={description}
            imageSrc={src}
            imageAlt={alt}
            onClick={() => handleSignup(type)} // 타입 단언
          />
        ))}
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
const cardContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: ${theme.layout.spacing.gutter};
  background-color: ${theme.colors.main.white};
`;

export default SignUpSelectTypePage;
