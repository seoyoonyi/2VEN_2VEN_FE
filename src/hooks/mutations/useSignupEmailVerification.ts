import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { EmailVerificationResponse, requestSignupEmailVerification } from '@/api/auth';

interface UseSignupEmailVerificationOptions {
  onSuccess?: (data: EmailVerificationResponse) => void;
  onError?: (error: Error) => void;
}

export const UseSignupEmailVerification = (
  options?: UseSignupEmailVerificationOptions
): UseMutationResult<EmailVerificationResponse, Error, string> =>
  useMutation<EmailVerificationResponse, Error, string>({
    mutationFn: requestSignupEmailVerification,
    onSuccess: (data) => {
      console.log('Email verification success:', data);
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('Email verification error:', error);
      options?.onError?.(error);
    },
  });
