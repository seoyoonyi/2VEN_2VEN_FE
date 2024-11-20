// constants/auth.ts

export const REGEX = {
  // 인증번호: 6자리 숫자
  code: /^\d{6}$/,
  // 이메일: 기본 이메일 형식
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // 닉네임: 영문 대소문자와 숫자만
  nickname: /^[a-zA-Z0-9]+$/,
  // 비밀번호: 영문, 숫자, 특수문자 포함 8자 이상
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  // 공백 검사
  whitespace: /\s/,
};

export const VALIDATION_MESSAGE = {
  code: {
    invalid: '유효하지 않은 숫자입니다. 다시 입력해주세요.',
  },
  email: {
    empty: '이메일을 입력해주세요.',
    invalid: '올바른 이메일 형식이 아닙니다.',
  },
  nickname: {
    length: '닉네임은 2-10자 사이여야 합니다.',
    whitespace: '공백은 사용할 수 없습니다.',
    charset: '영문 대소문자와 숫자만 사용 가능합니다.',
    valid: '유효한 닉네임입니다.',
  },
  password: {
    invalid: '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
    valid: '유효한 비밀번호입니다.',
  },
};

export const AUTH_TEXT = {
  title: '로그인',
  input: {
    email: {
      placeholder: '이메일을 입력하세요',
    },
    password: {
      placeholder: '비밀번호를 입력하세요',
    },
  },
  button: {
    submit: '로그인하기',
  },
  error: {
    auth: '이메일 또는 비밀번호가 잘못 되었습니다. 다시 입력해 주세요.',
  },
  links: {
    findEmail: '아이디 찾기',
    findPassword: '비밀번호 찾기',
    signup: '회원가입',
  },
};
