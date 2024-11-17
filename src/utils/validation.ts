// 인증번호 6자리 숫자인지 검증하는 함수
export const validateCode = (value: string) => ({
  isValid: /^\d{6}$/.test(value), // 6자리 숫자인지 검증
  message: '유효하지 않은 숫자입니다. 다시 입력해주세요.',
});
