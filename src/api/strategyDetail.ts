import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

import { UserRole } from '@/types/route';
import {
  FileUploadOptions,
  FileUploadResponse,
  InputDailyAnalysisProps,
  DailyAnalysisProps,
} from '@/types/strategyDetail';

//전략 상세 기본 정보 조회
export const fetchDefaultStrategyDetail = async (id: number) => {
  if (!id) {
    throw new Error('Strategy ID is required');
  }
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.STRATEGY.CREATE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch DefaultStrategyDetail data', error);
  }
};

//전략 상세 기본 정보 삭제
export const fetchDeleteStrategyDetail = async (id: number) => {
  try {
    const req = await apiClient.delete(`${API_ENDPOINTS.STRATEGY.CREATE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return req.data;
  } catch (error) {
    console.error('faild to fetch DeleteStrategyDetail', error);
  }
};

//일간분석 조회
export const fetchDailyAnalysis = async (strategyId: number, page: number, pageSize: number) => {
  try {
    const res = await apiClient.get(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/daily-analyses`,
      {
        params: {
          page,
          pageSize,
        },
        headers: {
          auth: 'admin',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('fetch to failed Daily Analysis', error);
  }
};

//일간분석 등록
export const fetchPostDailyAnalysis = async (
  strategyId: number,
  { payload }: InputDailyAnalysisProps,
  authRole: 'admin' | 'trader'
) => {
  const body = { payload };
  try {
    const req = await apiClient.post(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/daily-data`,
      body,
      {
        headers: {
          Auth: authRole,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to fetch Post DailyAnalysis', error);
    throw error;
  }
};

//일간분석 수정
export const fetchPutDailyAnalysis = async (
  strategyId: number,
  payload: DailyAnalysisProps,
  authRole: 'admin' | 'trader',
  dailyDataId: number
) => {
  const body = payload;
  try {
    const req = await apiClient.put(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/daily-data/${dailyDataId}`,
      body,
      {
        headers: {
          Auth: authRole,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to fetch Put DailyAnalysis', error);
    throw error;
  }
};

//일간분석 삭제
export const fetchDeleteDailyAnalysis = async (
  strategyId: number,
  role: UserRole,
  analysisIds: number[]
) => {
  const body = { dailyStatisticsId: analysisIds };
  try {
    const req = await apiClient.post(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/daily-analyses/delete`,
      body,
      {
        headers: {
          Auth: role,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to Delete DailyAnalysis', error);
  }
};

//월간분석 조회(MSW)
export const fetchMonthlyAnalysis = async (strategyId: number, page: number, pageSize: number) => {
  try {
    const res = await apiClient.get(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/monthly-analysis`,
      {
        params: {
          page,
          pageSize,
        },
        headers: {
          useMock: import.meta.env.VITE_ENABLE_MSW === 'true',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('fetch to failed Monthly Analysis', error);
  }
};

//전략 상세 통계 조회
export const fetchStatistics = async (strategyId: number) => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/statistics`, {
      headers: {
        auth: 'admin',
      },
    });
    return res.data;
  } catch (error) {
    console.error('fetch to failed Monthly Analysis', error);
  }
};
