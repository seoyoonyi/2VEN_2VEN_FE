// Role_ 제거 후 대문자로 변환 : 예) ROLE_INVESTOR -> INVESTOR
export const formatRole = (role: string) => role.replace('MEMBER_ROLE_', '').toUpperCase();

// Role_ 추가 후 대문자로 변환 : 예) investor -> ROLE_INVESTOR
export const addRolePrefix = (role: string) =>
  role.startsWith('MEMBER_ROLE_') ? role : `MEMBER_ROLE_${role.toUpperCase()}`;
