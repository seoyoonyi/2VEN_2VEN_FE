import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import theme from '@/styles/theme';

const SignUpForm = () => (
  <div>
    <div css={inputGroupStyle}>
      <label htmlFor='email' css={labelStyle}>
        이메일
      </label>
      <Input id='email' inputSize='md' placeholder='1234@naver.com' />
      <Button variant='primary' size='sm' width={100}>
        인증요청
      </Button>
    </div>
    <div css={inputGroupStyle}>
      <label htmlFor='auth_code' css={labelStyle}>
        인증번호
      </label>
      <Input id='auth_code' inputSize='md' placeholder='인증번호 6자리' />
      <Button variant='primary' size='sm' width={100}>
        확인
      </Button>
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
      <Input id='nickname' inputSize='md' placeholder='사용할 닉네임을 입력해주세요.' />
      <Button variant='primary' size='sm' width={100}>
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
const labelStyle = css`
  display: inline-block;
  width: 109px;
  text-align: left;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
`;

export default SignUpForm;
