import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { StrategyPayload } from '@/types/strategy';

// 전략 등록 옵션 조회
export const fetchStrategyRegistration = async () => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.STRATEGY.REGISTRATION_FORM, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch strategy registration data:', error);
    throw error;
  }
};

// 전략 등록
export const submitStrategyCreate = async (payload: StrategyPayload) => {
  try {
    const { data } = await apiClient.post(API_ENDPOINTS.STRATEGY.CREATE, payload, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to submit strategy create:', error);
    throw error;
  }
};

// 전략 수정 조회
export const fetchUpdateStrategy = async (strategyId: string) => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.STRATEGY.UPDATE_FORM}/${strategyId}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });
    return res.data.Data;
  } catch (error) {
    console.error('Failed to fetch update strategy data:', error);
    throw error;
  }
};

// 전략 수정
export const submitStrategyUpdate = async (strategyId: number, payload: StrategyPayload) => {
  try {
    const { data } = await apiClient.put(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Auth: 'trader',
        },
      }
    );
    return data;
  } catch (error) {
    console.error('Failed to submit strategy update', error);
    throw error;
  }
};

// 전략 목록
export const fetchStrategyList = async (params: {
  tradingCycleId?: number;
  investmentAssetClassesId?: number;
  page: number;
  pageSize: number;
}) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.STRATEGY.CREATE, {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        tradingCycleId: params.tradingCycleId,
        investmentAssetClassesId: params.investmentAssetClassesId,
      },
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });

    console.log('전략 목록', res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch strategy List data:', error);
    throw error;
  }
};
