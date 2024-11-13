import React from 'react';

import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';

// import { useSignUp } from '@/api/auth';
import theme from '@/styles/theme';
import { HomeRouteState } from '@/types/route';

const SignUpFormPage: React.FC = () => {
  const location = useLocation();
  const { userRole } = (location.state as HomeRouteState) || {};

  // const navigate = useNavigate();
  // const signUp = useSignUp();
  // const [formData, setFormData] = React.useState({
  //   email: '',
  //   password: '',
  //   username: '',
  // });

  // const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // const result = await signUp.mutateAsync(formData);
  //     alert('회원가입이 완료되었습니다.');
  //     navigate('/login');
  //   } catch (error) {
  //     alert(error instanceof Error ? error.message : '회원가입 실패');
  //   }
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  return (
    <div>
      <div css={containerStyle}>
        <h1 css={pageHeadingStyle}>회원정보 입력</h1>
        <div css={formContainerStyle}></div>
        <p>받아온 Role: {userRole}</p>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name='email'
              type='email'
              required
              value={formData.email}
              onChange={handleChange}
              placeholder='이메일'
            />
          </div>
          <div>
            <input
              name='password'
              type='password'
              required
              value={formData.password}
              onChange={handleChange}
              placeholder='비밀번호'
            />
          </div>
          <div>
            <input
              name='username'
              type='text'
              required
              value={formData.username}
              onChange={handleChange}
              placeholder='사용자 이름'
            />
          </div>
        </div>

        <div>
          <button type='submit' disabled={signUp.isPending}>
            {signUp.isPending ? '처리중...' : '가입하기'}
          </button>
        </div>
      </form> */}
    </div>
  );
};
const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 76px 0 83px;
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
  gap: ${theme.layout.spacing.gutter};
`;
export default SignUpFormPage;
