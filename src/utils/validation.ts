// utils/validation.ts
import { REGEX, VALIDATION_MESSAGE } from '@/constants/auth';

export const validateCode = (value: string) => ({
  isValid: REGEX.code.test(value),
  message: VALIDATION_MESSAGE.code.invalid,
});

export const validateEmail = (value: string) => ({
  isValid: REGEX.email.test(value),
  message: value ? VALIDATION_MESSAGE.email.invalid : VALIDATION_MESSAGE.email.empty,
});

// 닉네임 유효성 검사 함수 수정본
export const validateNickname = (nickname: string) => {
  if (nickname.length < 2 || nickname.length > 10) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.length,
    };
  }

  // 공백검사
  if (REGEX.whitespace.test(nickname)) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.whitespace,
    };
  }

  // 영문자와 숫자로만 구성되었는지 검사할게!
  if (!REGEX.nickname.onlyAlphanumeric.test(nickname)) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.charset,
    };
  }
  // 숫자와 영문자가 모두 포함되었는지 검사할게!
  const hasNumber = REGEX.nickname.hasNumber.test(nickname);
  const hasLetter = REGEX.nickname.hasLetter.test(nickname);
  if (!hasNumber || !hasLetter) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.combination,
    };
  }

  return {
    isValid: true,
    message: VALIDATION_MESSAGE.nickname.valid,
  };
};

export const isValidPassword = (password: string) => {
  const isValid = REGEX.password.test(password) && !REGEX.whitespace.test(password);

  return {
    isValid,
    message: isValid ? VALIDATION_MESSAGE.password.valid : VALIDATION_MESSAGE.password.invalid,
  };
};
