import axios from 'axios';

import { TradingType } from '@/types/admin';

//매매유형 목록 조회
export const fetchTradingTypes = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/trading-types`, {
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
export const fetchDeleteTradingType = async (id: number) => {
  try {
    const req = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/admin/trading-types/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Auth: 'admin',
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to delete tradingType', error);
  }
};

//매매유형 등록
export const fetchPostTradingType = async ({
  tradingTypeName,
  tradingTypeIcon,
  isActive,
  currentDataLength,
}: TradingType & { currentDataLength: number }) => {
  const body = {
    order: currentDataLength + 1,
    tradingTypeName,
    tradingTypeIcon,
    isActive,
  };
  try {
    const req = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/trading-types`, body, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return req.data;
  } catch (error) {
    console.error('failed to post tradingtype', error);
  }
};
