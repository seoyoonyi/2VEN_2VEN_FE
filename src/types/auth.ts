import { UserRole } from '@/types/route';

export interface User {
  member_id: string; // number에서 string으로 변경
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

// API 공통 응답 타입
export interface ApiResponse<T> {
  memberInfo: T; // BackendSigninResponse 타입으로 변경
  message: string;
  status: 'success' | 'error';
}
