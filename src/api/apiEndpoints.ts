export const API_ENDPOINTS = {
  NOTICES: '/api/notices',
  ADMIN: {
    TRADING_TYPES: '/api/admin/trading-types',
    STOCK_TYPES: '/api/admin/inv-asset-classes',
  },
  AUTH: {
    LOGIN: '/api/members/login',
    SIGNUP: '/api/members/signup',
    CHECK_NICKNAME: '/api/members/check-nickname', // 닉네임 중복 확인
    FIND: {
      EMAIL: '/api/members/check-phone', // 이메일 찾기
      PASSWORD: '/api/members/find/password', // 비밀번호 찾기
      PASSWORD_RESET: '/api/members/find/password/reset', // 비밀번호 재설정
    },
    EMAIL: {
      REQUEST_VERIFICATION: '/api/auth/send-verification-code', // 이메일 인증 코드 요청
      CHECK_VERIFICATION: '/api/auth/check-verification-code', // 이메일 인증 코드를 서버에 보내 확인
    },
  },
  STRATEGY: {
    CREATE: '/api/strategies', // 전략 등록
    REGISTRATION_FORM: '/api/strategies/registration-form', // 전략 등록 옵션 조회
    UPDATE_FORM: '/api/strategies/update-form', // 전략 수정 조회
  },
  INQUIRY: '/api/consultations', // 나의 문의
  FILES: {
    PROFILE: (fileId: string) => `/api/files/profile/${fileId}`, // 프로필 이미지 다운로드
  },
};
