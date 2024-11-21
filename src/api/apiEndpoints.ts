export const API_ENDPOINTS = {
  NOTICES: '/api/notices',
  ADMIN: {
    TRADING_TYPES: '/api/admin/trading-types',
    STOCK_TYPES: '/api/admin/inv-asset-classes',
  },
  AUTH: {
    LOGIN: '/api/members/login',
    SIGNUP: '/api/members/signup',
    FIND: {
      EMAIL: '/api/members/check-phone', // 이메일 찾기
      PASSWORD: '/api/members/find/password', // 비밀번호 찾기
      PASSWORD_RESET: '/api/members/find/password/reset', // 비밀번호 재설정
    },
    ADMIN: {
      VERIFY: '/api/auth/check-verification-code', // 관리자 인증
    },
  },
  STRATEGY: {
    CREATE: '/api/strategies', // 전략 등록
    REGISTRATION_FORM: '/api/strategies/registration-form', // 전략 등록 옵션 조회
  },
};
