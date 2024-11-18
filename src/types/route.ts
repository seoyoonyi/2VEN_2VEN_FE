export type UserRole = 'INVESTOR' | 'TRADER' | 'ADMIN';

export interface HomeRouteState {
  userRole?: UserRole;
}
