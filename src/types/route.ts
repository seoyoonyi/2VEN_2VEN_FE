export type UserRole = 'trader' | 'investor' | 'admin';

export interface HomeRouteState {
  userRole?: UserRole;
}
