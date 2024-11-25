import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { requestVerificationCode, verifyCode } from '@/api/auth';
import { ApiResponse } from '@/types/auth';

// 인증번호 요청 mutation
export const useRequestVerificationMutation = () =>
  useMutation<ApiResponse<null>, AxiosError>({
    mutationFn: requestVerificationCode,
  });

// 인증번호 검증 mutation
export const useVerifyAdminCodeMutation = () =>
  useMutation<ApiResponse<{ expires_at: string }>, AxiosError, string>({
    mutationFn: verifyCode,
  });
