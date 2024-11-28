import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { requestVerificationCode, verifyAdminCode } from '@/api/auth';
import { ApiResponse } from '@/types/auth';

// 인증번호 요청 mutation
export const useRequestVerificationMutation = () =>
  useMutation<ApiResponse<null>, AxiosError, string>({
    mutationFn: requestVerificationCode,
  });

// 인증번호 검증 mutation
export const useVerifyAdminCodeMutation = () =>
  useMutation<
    ApiResponse<{ expires_at: string }>,
    AxiosError,
    { email: string; verificationCode: string }
  >({
    mutationFn: verifyAdminCode,
  });
