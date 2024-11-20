export const API_ENDPOINTS = {
  NOTICES: '/api/notices',
  ADMIN: {
    TRADING_TYPES: '/api/admin/trading-types',
  },
  AUTH: {
    LOGIN: '/api/members/login',
    SIGNUP: '/api/members/signup',
    CHECK_NICKNAME: '/api/members/check-nickname', // 닉네임 중복 확인
  },
  STRATEGY: {
    CREATE: '/api/strategies', // 전략 등록
    REGISTRATION_FORM: '/api/strategies/registration-form', // 전략 등록 옵션 조회
  },
};
