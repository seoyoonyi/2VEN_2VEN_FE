import { isAxiosError } from 'axios';

import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { ProfileUrlResponse } from '@/types/profile';

export const getProfileImageUrl = async (memberId: string): Promise<ProfileUrlResponse> => {
  try {
    const { data } = await apiClient.get<ProfileUrlResponse>(
      API_ENDPOINTS.FILES.PROFILE_URL(memberId)
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          throw new Error('잘못된 요청입니다.');
        case 403:
          throw new Error('프로필 이미지 조회 권한이 없습니다.');
        case 404:
          throw new Error('프로필 이미지를 찾을 수 없습니다.');
        case 500:
          throw new Error('서버 오류가 발생했습니다.');
        default:
          throw new Error('프로필 이미지 URL 조회 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};
