export const API_ENDPOINTS = {
  NOTICES: '/api/notices',
  ADMIN: {
    TRADING_TYPES: '/api/admin/trading-types',
    STOCK_TYPES: '/api/admin/inv-asset-classes',
  },
  AUTH: {
    LOGIN: '/api/members/login',
    SIGNUP: '/api/members/signup',
  },
  STRATEGY: {
    CREATE: '/api/strategies', // 전략 등록
    REGISTRATION_FORM: '/api/strategies/registration-form', // 전략 등록 옵션 조회
  },
};
