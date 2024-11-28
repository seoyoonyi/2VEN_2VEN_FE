export const API_ENDPOINTS = {
  NOTICES: '/api/notices',
  ADMIN: {
    TRADING_TYPES: '/api/admin/trading-types',
    STOCK_TYPES: '/api/admin/inv-asset-classes',
  },
  AUTH: {
    SIGNIN: '/api/members/login', // 로그인
    SIGNUP: '/api/members/signup', // 회원가입
    ADMIN_STATUS: '/api/auth/admin-status', // 관리자 상태 확인
    ADMIN_SIGNOUT: '/api/auth/logout', // 관리자 로그아웃
    CHECK_NICKNAME: '/api/members/check-nickname', // 닉네임 중복 확인
    FIND: {
      EMAIL: '/api/members/check-phone', // 이메일 찾기
      PASSWORD: '/api/members/find/password', // 비밀번호 찾기
      PASSWORD_RESET: '/api/members/find/password/reset', // 비밀번호 재설정
    },
    EMAIL: {
      REQUEST_VERIFICATION_FOR_SIGNUP: '/api/members/check-email', // 회원가입 시, 이메일 확인 + 이메일 인증 코드 요청
      CHECK_VERIFICATION_FOR_USERS: '/api/auth/check-verification-code', // 회원가입 시 + 비밀번호 재설정 시, 이메일 인증 코드 확인

      REQUEST_VERIFICATION_FOR_RESET_PASSWORD: 'api/members/check-account', // 비밀번호 재설정을 위한, 이메일 인증 코드 요청

      // 관리자 인증 (주석처리된 값으로 처리예정)
      // REQUEST_VERIFICATION: '/api/auth/admin/send-verification-code', // 관리자 인증을 위한, 이메일 인증 코드 요청
      // CHECK_VERIFICATION: '/api/auth/admin/check-verification-code', // 관리자 이메일 인증 코드를 서버에 보내 확인
      REQUEST_VERIFICATION: '/api/auth/admin/send-verification-code', // 관리자 인증을 위한, 이메일 인증 코드 요청
      CHECK_VERIFICATION: '/api/auth/admin/check-verification-code', // 관리자 이메일 인증 코드를 서버에 보내 확인
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
    PROPOSAL: '/api/files/proposal', // 제안서 파일 업로드
  },
};
