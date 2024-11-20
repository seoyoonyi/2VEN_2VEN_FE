import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { signin } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { SigninRequest, SigninResponse } from '@/types/auth';

export const useSigninMutation = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<SigninResponse, AxiosError, SigninRequest>({
    mutationKey: ['signin'],
    mutationFn: async (credentials: SigninRequest) => {
      const response = await signin(credentials);
      if (response.status === 'success' && response.data) {
        setAuth(response.data.token, response.data.user);
      }
      return response;
    },
    retry: false, // 실패 시 재시도하지 않음(캐시오염방지)
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().signout(); // 인증 상태 초기화
        queryClient.invalidateQueries({ queryKey: ['user'] }); // 사용자 정보 캐시 무효화
      }
    },
  });
};
