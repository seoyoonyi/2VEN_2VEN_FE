import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

export const fetchFollowerRanking = async (size: number) => {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.STRATEGY.FOLLOWING_RANKING, {
      params: {
        size,
      },
    });
    return data.data;
  } catch (error) {
    console.error('Failed to fetch follower ranking:', error);
  }
};
