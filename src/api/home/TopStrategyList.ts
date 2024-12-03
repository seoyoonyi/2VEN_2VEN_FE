import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

// API에서 반환되는 데이터 구조를 명확히 정의
export interface RankingData {
  strategyId: number;
  strategyTitle: string;
  traderNickname: string;
  traderProfile: string;
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
    console.log('Fetched strategies:', response.data.data); // 여기에 콘솔 추가
    return response.data.data; // 서버에서 제공하는 데이터를 그대로 반환
  } catch (error) {
    console.error('Failed to fetch strategies:', error);
    throw error;
  }
};
