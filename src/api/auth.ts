// auth.ts
import { isAxiosError } from 'axios';

import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import {
  AdminUser,
  ApiResponse,
  BackendSigninResponse,
  SigninRequest,
  SigninResponse,
  User,
} from '@/types/auth';

export const signin = async (credentials: SigninRequest): Promise<SigninResponse> => {
  try {
    const response = await apiClient.post<BackendSigninResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    /// 응답 데이터와 토큰이 모두 있는지 확인
    const authHeader = response.headers['authorization'];
    if (!authHeader) {
      console.error('Authorization header missing');
      console.log('Available headers:', response.headers);
      throw new Error('인증 토큰을 받지 못했습니다.');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data } = response.data;
    if (!data) {
      // 사용자 정보가 없는 경우
      console.error('User data missing from response');
      console.log('Response data structure:', response.data);
      throw new Error('사용자 정보를 받지 못했습니다.');
    }

    // 기본 사용자 정보(공통)
    const baseUser: User = {
      member_id: data.member_id,
      email: data.email,
      nickname: data.nickname,
      role: data.role as User['role'], // 이미 'ROLE_' 접두사가 붙어있음
    };

    // 관리자인 경우 추가 정보처리
    if (data.role === 'MEMBER_ROLE_ADMIN' && data.admin_info) {
      const adminUser: AdminUser = {
        ...baseUser,
        role: 'MEMBER_ROLE_ADMIN',
        is_authorized: data.admin_info?.is_authorized ?? false,
        authorization_status: data.admin_info?.authorization_status ?? 'PENDING',
        authorized_at: data.admin_info?.authorized_at,
        expires_at: data.admin_info?.expires_at,
      };

      return {
        status: 'success',
        message: response.data.message,
        data: {
          token,
          user: adminUser,
        },
      };
    }

    console.log('Constructed user object:', baseUser);

    // 일반 사용자인 경우
    return {
      status: 'success',
      message: response.data.message,
      data: {
        token,
        user: baseUser,
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
      throw new Error(error.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.');
    }
    throw error;
  }
};

export const checkNicknameDuplicate = async (nickname: string) => {
  const { data } = await apiClient.get(
    `${API_ENDPOINTS.AUTH.CHECK_NICKNAME}?nickname=${encodeURIComponent(nickname)}`,
    { headers: { useMock: import.meta.env.VITE_ENABLE_MSW === 'true' } }
  );
  return data;
};

export const findEmail = async (phone: string) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.AUTH.FIND.EMAIL,
    { phone },
    {
      headers: {
        useMock: import.meta.env.VITE_ENABLE_MSW === 'true',
      },
    }
  );
  return data;
};

// 이메일로 인증번호를 요청하는 API
export const requestVerificationCode = async (): Promise<ApiResponse<null>> => {
  const response = await apiClient.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH.EMAIL.REQUEST_VERIFICATION,
    {},
    {
      headers: {
        useMock: import.meta.env.VITE_ENABLE_MSW === 'true', // MSW 사용 시 true
      },
    }
  );
  return response.data;
};

// 입력한 인증번호 검증 API (기존 코드)
export const verifyCode = async (code: string): Promise<ApiResponse<{ expires_at: string }>> => {
  const response = await apiClient.post<ApiResponse<{ expires_at: string }>>(
    API_ENDPOINTS.AUTH.EMAIL.CHECK_VERIFICATION, // 이메일 인증 API 경로(사용자, 관리자 공통)
    { code },
    {
      headers: {
        useMock: import.meta.env.VITE_ENABLE_MSW === 'true', // MSW 사용 시 true
      },
    }
  );
  return response.data;
};

interface ProfileImageResponse {
  fileId: string;
  displayName: string;
  message: string;
  base64Content: string;
}
// 프로필 이미지 가져오기
export const fetchProfileImage = async ({
  fileId,
  memberId,
}: {
  fileId: string;
  memberId: string;
}): Promise<string> => {
  const response = await apiClient.get<ProfileImageResponse>(
    `${API_ENDPOINTS.FILES.PROFILE(fileId)}?uploaderId=${memberId}`
  );
  return response.data.base64Content;
};
