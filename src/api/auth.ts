// auth.ts
import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { SigninRequest, SigninResponse } from '@/types/auth';

export const signin = async (credentials: SigninRequest): Promise<SigninResponse> => {
  try {
    const { data } = await apiClient.post<SigninResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return data;
  } catch (error) {
    console.error('Signin API failed:', error);
    throw error;
  }
};
