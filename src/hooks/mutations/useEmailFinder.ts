import { useMutation } from '@tanstack/react-query';

import { findEmail } from '@/api/auth';

export const useEmailFinder = () =>
  useMutation({
    mutationFn: findEmail,
    onError: (error) => {
      console.error('이메일 찾기 실패:', error);
    },
  });
