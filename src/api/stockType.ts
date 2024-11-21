import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

import { InvestmentAssetProps } from '@/types/admin';

//투자자산유형 목록 조회
export const fetchInvestmentTypes = async (page: number, pageSize: number) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN.STOCK_TYPES, {
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
    console.error('failed to fetch InvestmentTypes', error);
  }
};

//투자자산유형 삭제
export const fetchDeleteInvestmentType = async (id: number) => {
  try {
    const req = await apiClient.delete(`${API_ENDPOINTS.ADMIN.STOCK_TYPES}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return req.data;
  } catch (error) {
    console.error('failed to delete InvestmentType', error);
  }
};

//투자자산유형 등록
export const fetchPostInvestmentType = async ({
  investmentAssetClassesName,
  investmentAssetClassesIcon,
  isActive,
}: InvestmentAssetProps) => {
  const body = {
    investmentAssetClassesName,
    investmentAssetClassesIcon,
    isActive,
  };
  try {
    const req = await apiClient.post(`${API_ENDPOINTS.ADMIN.STOCK_TYPES}`, body, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return req.data;
  } catch (error) {
    console.error('failed to post Investmenttype', error);
  }
};

//투자자산유형 수정
export const fetchPutInvestmentType = async ({
  investmentAssetClassesId,
  order,
  investmentAssetClassesName,
  investmentAssetClassesIcon,
  isActive,
}: InvestmentAssetProps) => {
  const body = {
    order,
    investmentAssetClassesName,
    investmentAssetClassesIcon,
    isActive,
  };
  try {
    const req = await apiClient.put(
      `${API_ENDPOINTS.ADMIN.STOCK_TYPES}/${investmentAssetClassesId}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Auth: 'admin',
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to update stockTypeData');
  }
};
