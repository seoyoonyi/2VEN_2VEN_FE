// auth.ts
import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { SigninRequest, SigninResponse, User } from '@/types/auth';

interface BackendSigninResponse {
  memberInfo: {
    member_id: string;
    email: string;
    nickname: string;
    role: string;
  };
  message: string;
  status: 'success' | 'error';
}

export const signin = async (credentials: SigninRequest): Promise<SigninResponse> => {
  try {
    const response = await apiClient.post<BackendSigninResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // JWT 토큰은 응답 헤더에서 추출
    const token = response.headers.authorization?.replace('Bearer ', '') || '';
    if (response.data.status === 'success' && response.data.memberInfo) {
      // 백엔드 응답을 프론트엔드 형식으로 변환함
      const user: User = {
        member_id: response.data.memberInfo.member_id,
        email: response.data.memberInfo.email,
        nickname: response.data.memberInfo.nickname,
        role: response.data.memberInfo.role as User['role'], // 이미 'ROLE_' 접두사가 붙어있음
      };

      return {
        status: 'success',
        message: response.data.message,
        data: {
          token,
          user,
        },
      };
    }

    throw new Error('Signin failed');
  } catch (error) {
    console.error('Signin API failed:', error);
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
