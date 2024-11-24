import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse } from './../../types/auth';

import { verifyCode } from '@/api/auth';
import { useAdminAuthStore } from '@/stores/adminAuthStore';

export const useAdminVerifyMutation = () => {
  const { setAdminAuth, adminAuth } = useAdminAuthStore();

  return useMutation<ApiResponse<{ expires_at: string }>, AxiosError, string>({
    mutationFn: async (code: string) => {
      const response = await verifyCode(code);
      if (response.status === 'success' && adminAuth) {
        // 기존 adminAuth 상태를 업데이트
        setAdminAuth({
          ...adminAuth,
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
