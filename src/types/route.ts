export type UserRole = 'MEMBER_ROLE_INVESTOR' | 'MEMBER_ROLE_TRADER' | 'MEMBER_ROLE_ADMIN';

export interface HomeRouteState {
  userRole?: UserRole;
}
