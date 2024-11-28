import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';
import { fetchDeleteIcon } from './uploadFile';

import { InvestmentAssetProps } from '@/types/admin';
import { UserRole } from '@/types/route';

//투자자산유형 목록 조회
export const fetchInvestmentTypes = async (page: number, pageSize: number, role: UserRole) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN.STOCK_TYPES, {
      params: {
        page,
        pageSize,
      },
      headers: {
        Auth: role,
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch InvestmentTypes', error);
  }
};

//투자자산유형 상세 조회
export const fetchInvestmentTypeDetail = async (id: number, role: UserRole) => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.ADMIN.STOCK_TYPES}/${id}`, {
      headers: {
        Auth: role,
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch InvestmentTypes', error);
  }
};

//투자자산유형 삭제
export const fetchDeleteInvestmentType = async (id: number, role: UserRole, fileUrl: string) => {
  try {
    if (fileUrl) {
      await fetchDeleteIcon(role, fileUrl);
    }
    const req = await apiClient.delete(`${API_ENDPOINTS.ADMIN.STOCK_TYPES}/${id}`, {
      headers: {
        Auth: role,
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
  role,
}: InvestmentAssetProps & { role: UserRole }) => {
  const body = {
    investmentAssetClassesName,
    investmentAssetClassesIcon,
    isActive,
  };
  try {
    const req = await apiClient.post(`${API_ENDPOINTS.ADMIN.STOCK_TYPES}`, body, {
      headers: {
        Auth: role,
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
  role,
}: InvestmentAssetProps & { role: UserRole }) => {
  const body = {
    order,
    investmentAssetClassesName,
    investmentAssetClassesIcon,
    isActive,
    role,
  };
  try {
    const req = await apiClient.put(
      `${API_ENDPOINTS.ADMIN.STOCK_TYPES}/${investmentAssetClassesId}`,
      body,
      {
        headers: {
          Auth: role,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to update stockTypeData');
  }
};
