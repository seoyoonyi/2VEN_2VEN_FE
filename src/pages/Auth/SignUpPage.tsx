import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useSignUp } from '@/api/auth';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const signUp = useSignUp();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (e) => {
    e.preventDefault();

    try {
      const result = await signUp.mutateAsync(formData);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      alert(error instanceof Error ? error.message : '회원가입 실패');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <h2>회원가입</h2>
      </div>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default SignUpPage;
