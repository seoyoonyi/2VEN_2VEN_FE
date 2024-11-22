// auth.ts
import { isAxiosError } from 'axios';

import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { SigninRequest, SigninResponse, User } from '@/types/auth';

interface BackendSigninResponse {
  data: {
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
    console.log('Sending login request with:', credentials);

    const response = await apiClient.post<BackendSigninResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    console.log('Received response:', response.data);
    console.log('Response headers:', response.headers);

    /// 응답 데이터와 토큰이 모두 있는지 확인
    const authHeader = response.headers['authorization'];
    if (!authHeader) {
      console.error('Authorization header missing');
      console.log('Available headers:', response.headers);
      throw new Error('인증 토큰을 받지 못했습니다.');
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Extracted token:', token);

    if (!response.data.data) {
      console.error('User data missing from response');
      console.log('Response data structure:', response.data);
      throw new Error('사용자 정보를 받지 못했습니다.');
    }
    const user: User = {
      member_id: response.data.data.member_id,
      email: response.data.data.email,
      nickname: response.data.data.nickname,
      role: response.data.data.role as User['role'], // 이미 'ROLE_' 접두사가 붙어있음
    };

    console.log('Constructed user object:', user);

    return {
      status: 'success',
      message: response.data.message,
      data: {
        token,
        user,
      },
    };
  } catch (error) {
    // 더 자세한 에러 로깅
    if (isAxiosError(error)) {
      console.error('Signin API failed:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    } else {
      console.error('Signin API failed:', error);
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
