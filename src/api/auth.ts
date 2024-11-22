// auth.ts
import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { SigninRequest, SigninResponse } from '@/types/auth';

export const signin = async (credentials: SigninRequest): Promise<SigninResponse> => {
  try {
    const { data } = await apiClient.post<SigninResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials, {
      headers: {
        useMock: import.meta.env.VITE_ENABLE_MSW === 'true', // Mock Service Worker 사용한다면 헤더 추가
      },
    });
    return data;
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
