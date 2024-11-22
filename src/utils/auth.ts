// Role_ 제거 + 대문자로 변환 : 예) ROLE_INVESTOR -> INVESTOR
export const formatRole = (role: string) => role.replace('ROLE_', '').toUpperCase();

// Role_ 추가
export const addRolePrefix = (role: string) => (role.startsWith('ROLE_') ? role : `ROLE_${role}`);
