// 인증번호 6자리 숫자인지 검증하는 함수
export const validateCode = (value: string) => ({
  isValid: /^\d{6}$/.test(value), // 6자리 숫자인지 검증
  message: '유효하지 않은 숫자입니다. 다시 입력해주세요.',
});

// 이메일 유효성 검사 함수
export const validateEmail = (value: string) => ({
  isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: value ? '올바른 이메일 형식이 아닙니다.' : '이메일을 입력해주세요.',
});

// 닉네임 유효성 검사 함수
export const validateNickname = (nickname: string): { isValid: boolean; message: string } => {
  // 길이 검사 (2-10자)
  if (nickname.length < 2 || nickname.length > 10) {
    return {
      isValid: false,
      message: '닉네임은 2-10자 사이여야 합니다.',
    };
  }

  // 공백 검사
  if (nickname.includes(' ')) {
    return {
      isValid: false,
      message: '공백은 사용할 수 없습니다.',
    };
  }

  // 영문 대소문자와 숫자만 허용
  const alphanumericOnly = /^[a-zA-Z0-9]+$/;
  if (!alphanumericOnly.test(nickname)) {
    return {
      isValid: false,
      message: '영문 대소문자와 숫자만 사용 가능합니다.',
    };
  }

  return {
    isValid: true,
    message: '유효한 닉네임입니다.',
  };
};

// 비밀번호 유효성 검사
export const isValidPassword = (password: string) => {
  // 영문, 숫자, 특수문자 포함 여부 및 길이 검사를 위한 정규식
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // 공백 검사를 위한 정규식
  const whitespaceRegex = /\s/;

  const isValid = passwordRegex.test(password) && !whitespaceRegex.test(password);

  return {
    isValid,
    message: isValid
      ? '유효한 비밀번호입니다.'
      : '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
  };
};
