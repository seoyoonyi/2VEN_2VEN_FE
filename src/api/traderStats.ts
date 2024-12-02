import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

export interface TraderStatsParams {
  traderCnt: number;
  strategyCnt: number;
}

export const fetchTraderStats = async (): Promise<TraderStatsParams> => {
  try {
    const res = await apiClient.get<TraderStatsParams>(API_ENDPOINTS.STRATEGY.TRADER_STATS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch trader stats:', error);
    throw error;
  }
};
