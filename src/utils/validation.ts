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

// 전화번호 유효성 검사 (기존 함수)
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // 하이픈 제거
  const cleanPhoneNumber = phoneNumber.replace(/-/g, '');

  // 010으로 시작하고 총 10-11자리 숫자인지 검사하는 정규식
  const phoneRegex = /^010\d{7,8}$/;

  return phoneRegex.test(cleanPhoneNumber);
};

// 마스킹 이메일 변환
export const maskEmail = (email: string): string => {
  // 이메일을 @ 기준으로 분리
  const [localPart, domain] = email.split('@');

  // 로컬 파트(@ 앞부분) 마스킹
  const maskedLocalPart = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);

  // 도메인을 . 기준으로 분리
  const [domainName, ...tld] = domain.split('.');

  // 도메인의 첫 번째 글자만 남기고 마스킹
  const maskedDomainName = domainName.charAt(0) + '*'.repeat(domainName.length - 1);

  // 최종 이메일 조합
  return `${maskedLocalPart}@${maskedDomainName}.${tld.join('.')}`;
};
