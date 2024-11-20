import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

import { TradingTypeProps } from '@/types/admin';

//매매유형 목록 조회
export const fetchTradingTypes = async (page: number, pageSize: number) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN.TRADING_TYPES, {
      params: {
        page,
        pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch tradingTypes', error);
  }
};

//매매유형 삭제
export const fetchDeleteTradingType = async (
  id: number
): Promise<{ msg: string; timestamp: string }> => {
  const req = await apiClient.delete(`${API_ENDPOINTS.ADMIN.TRADING_TYPES}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Auth: 'admin',
    },
  });
  return req.data;
};

//매매유형 등록
export const fetchPostTradingType = async ({
  tradingTypeName,
  tradingTypeIcon,
  isActive,
}: TradingTypeProps): Promise<{ msg: string; timestamp: string }> => {
  const body = {
    tradingTypeName,
    tradingTypeIcon,
    isActive,
  };

  const req = await apiClient.post(API_ENDPOINTS.ADMIN.TRADING_TYPES, body, {
    headers: {
      'Content-Type': 'application/json',
      Auth: 'admin',
    },
  });
  return req.data;
};

//매매유형 수정
export const fetchPutTradingType = async ({
  tradingTypeId,
  tradingTypeOrder,
  tradingTypeName,
  tradingTypeIcon,
  isActive,
}: TradingTypeProps): Promise<{ msg: string; timestamp: string }> => {
  const body = {
    tradingTypeOrder,
    tradingTypeName,
    tradingTypeIcon,
    isActive,
  };

  const req = await apiClient.put(`${API_ENDPOINTS.ADMIN.TRADING_TYPES}/${tradingTypeId}`, body, {
    headers: {
      'Content-Type': 'application/json',
      Auth: 'admin',
    },
  });
  return req.data;
};
