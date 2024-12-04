import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

export interface RankingData {
  strategyId: number;
  strategyTitle: string;
  traderNickname: string; // API에서 제공될 값(이름바꿔야함)
  traderProfile: string; // API에서 제공될 값(이름바꿔야함)
  cumulativeProfitLossRateList: number[];
  dailyChange: number; // API에서 제공될 값(이름바꿔야함)
  cumulativeProfitLossRate: number;
  smScore: number;
}

export const fetchStrategies = async (): Promise<RankingData[]> => {
  try {
    const response = await apiClient.get<{ data: RankingData[] }>(API_ENDPOINTS.STRATEGY.CREATE);

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('No strategy data available');
    }
    console.log('Fetched strategies:', response.data.data); // 여기에 콘솔 추가 ( 요건 완전히 연결 끝날때까지 갖고있을게영)
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch strategies:', error);
    throw error;
  }
};
