import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, isAdminUser } from './../../types/auth';

import { verifyCode } from '@/api/auth';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';

export const useAdminVerifyMutation = () => {
  const { setAdminAuth } = useAdminAuthStore();
  const { user } = useAuthStore();

  return useMutation<
    ApiResponse<{ expires_at: string }>,
    AxiosError,
    { email: string; code: string }
  >({
    mutationFn: async ({ email, code }) => {
      const response = await verifyCode(email, code);
      if (response.status === 'success' && user && isAdminUser(user)) {
        // 기존 adminAuth 상태를 업데이트
        setAdminAuth({
          is_authorized: true,
          authorization_status: 'AUTHORIZED',
          authorized_at: new Date().toISOString(),
          expires_at: response.data.expires_at,
        });
      }
      return response;
    },
  });
};
