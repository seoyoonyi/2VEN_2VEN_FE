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

export const validateNickname = (nickname: string) => {
  if (nickname.length < 2 || nickname.length > 10) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.length,
    };
  }

  if (REGEX.whitespace.test(nickname)) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.whitespace,
    };
  }

  if (!REGEX.nickname.test(nickname)) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.charset,
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
