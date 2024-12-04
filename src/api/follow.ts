import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

// 전략 팔로우
export const followStrategy = async (folderId: string, strategyId: string) => {
  try {
    const res = await apiClient.post(API_ENDPOINTS.FOLLOWING.STRATEGY, { folderId, strategyId });
    return res;
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
