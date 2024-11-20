import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

//전략 상세 기본 정보 조회
export const fetchDefaultStrategyDetail = async (id: number) => {
  if (!id) {
    throw new Error('Strategy ID is required');
  }
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.STRATEGY.CREATE}/${id}`, {
      headers: {
        useMock: true,
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch DefaultStrategyDetail data', error);
    throw error;
  }
};
