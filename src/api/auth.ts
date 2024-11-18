// auth.ts
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { MOCK_API_ENDPOINTS } from '@/mocks/mockEndpoints';
import { useAuthStore } from '@/stores/authStore';
import { SigninRequest, SigninResponse } from '@/types/auth';

export const useSignin = () => {
  const { setAuth } = useAuthStore();
  const endpoint =
    import.meta.env.VITE_ENABLE_MSW === 'true'
      ? MOCK_API_ENDPOINTS.AUTH.LOGIN
      : API_ENDPOINTS.AUTH.LOGIN;

  return useMutation({
    mutationKey: ['signin'],
    mutationFn: async (credentials: SigninRequest) => {
      try {
        console.log('로그인 시도:', credentials);
        const { data } = await apiClient.post<SigninResponse>(
          API_ENDPOINTS.AUTH.LOGIN,
          credentials
        ); // 상대경로로 변경
        console.log('로그인 응답:', data);
        if (data.status === 'success' && data.data) {
          setAuth(data.data.token, data.data.user);
        }
        return data;
      } catch (error) {
        console.error('API 에러:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('mutation 성공:', data);
    },
    onError: (error) => {
      console.error('mutation 에러:', error);
    },
  });
};
