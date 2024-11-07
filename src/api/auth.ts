import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface SignUpRequest {
  email: string;
  password: string;
  username: string;
}

interface SignUpResponse {
  // Define the expected response structure here 기대되는 응답 구조
  id: string;
  email: string;
  username: string;
}

export const useSignUp = (): UseMutationResult<SignUpResponse, Error, SignUpRequest> =>
  useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        // 세션 쿠키를 주고받기 위한 설정
        credentials: 'include',
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    },
  });
