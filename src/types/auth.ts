import { UserRole } from '@/types/route';

export interface User {
  member_id: number;
  email: string;
  nickname: string;
  role: UserRole;
}

export interface SigninRequest {
  email: string;
  password: string;
}
export interface SigninResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    token: string;
    user: User;
  };
}
