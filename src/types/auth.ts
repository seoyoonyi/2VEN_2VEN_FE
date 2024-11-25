import { UserRole } from '@/types/route';

// 기본 User 인터페이스
export interface User {
  member_id: string;
  email: string;
  nickname: string;
  role: UserRole;
  profile_image?: string | null;
}
// 관리자 전용 확장 인터페이스
export interface AdminUser extends User {
  role: 'MEMBER_ROLE_ADMIN';
  is_authorized: boolean;
  authorization_status: 'PENDING' | 'AUTHORIZED' | 'EXPIRED';
  authorized_at?: string;
  expires_at?: string;
}

// 백엔드에 제안할 응답 구조
export interface BackendSigninResponse {
  data: {
    member_id: string;
    email: string;
    nickname: string;
    role: string;
    admin_info?: {
      // role이 'ROLE_ADMIN'일 때만 포함
      is_authorized: boolean;
      authorization_status: 'PENDING' | 'AUTHORIZED' | 'EXPIRED';
      authorized_at?: string;
      expires_at?: string;
    };
  };
  message: string;
  status: 'success' | 'error';
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
  data: T; // BackendSigninResponse 타입으로 변경
  message: string;
  status: 'success' | 'error';
}

// 관리자 여부 확인 함수(타입 가드 함수)
export const isAdminUser = (user: User): user is AdminUser => user.role === 'MEMBER_ROLE_ADMIN';
