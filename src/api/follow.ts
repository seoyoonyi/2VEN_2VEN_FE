import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

// 전략 팔로우
export const followStrategy = async (folderId: string, strategyId: string) => {
  try {
    return await apiClient.post(API_ENDPOINTS.FOLLOWING.STRATEGY, { folderId, strategyId });
  } catch (error) {
    console.error('Failed to follow strategy:', error);
    throw error;
  }
};

// 전략 언팔로우
export const deleteFolder = async (folderId: number) => {
  try {
    const res = await apiClient.delete(`${API_ENDPOINTS.FOLLOWING.STRATEGY}/${folderId}`);
    return res;
  } catch (error) {
    console.error('Failed to delete folder:', error);
    throw error;
  }
};

// 관심전략 목록 조회
export const fetchFollowingList = async (
  folderId: number,
  params: { page: number; pageSize: number }
) => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.FOLLOWING.STRATEGY}/page/${folderId}`, {
      params: {
        page: params.page,
        pageSize: params.pageSize,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch following list data:', error);
    throw error;
  }
};
