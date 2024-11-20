import axios from 'axios';

import { InvestmentAssetProps } from '@/types/admin';

//투자자산유형 목록 조회
export const fetchInvestmentTypes = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/inv-asset-classes`, {
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
    const req = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/admin/api/admin/inv-asset-classes/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Auth: 'admin',
        },
      }
    );
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
  currentDataLength,
}: InvestmentAssetProps & { currentDataLength: number }) => {
  const body = {
    order: currentDataLength + 1,
    investmentAssetClassesName,
    investmentAssetClassesIcon,
    isActive,
  };
  try {
    const req = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/admin/inv-asset-classes`,
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
    console.error('failed to post Investmenttype', error);
  }
};
