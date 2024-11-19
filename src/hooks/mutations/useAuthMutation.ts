import { useMutation } from '@tanstack/react-query';

import { signin } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { SigninRequest, SigninResponse } from '@/types/auth';

export const useSigninMutation = () => {
  const { setAuth } = useAuthStore();

  return useMutation<SigninResponse, Error, SigninRequest>({
    mutationKey: ['signin'],
    mutationFn: async (credentials: SigninRequest) => {
      const response = await signin(credentials);
      if (response.status === 'success' && response.data) {
        setAuth(response.data.token, response.data.user);
      }
      return response;
    },
    onError: (error) => {
      console.error('Signin mutation error:', error);
    },
  });
};
