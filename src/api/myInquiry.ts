import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

// 나의 문의 목록 조회
export const fetchMyInquiryList = async (page: number, pageSize: number) => {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.INQUIRY, {
      params: {
        page,
        pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
        Auth: 'investor',
      },
    });
    console.log('나의 문의 목록:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch my inquiry list data:', error);
    throw error;
  }
};

// 나의 문의 조회
export const fetchMyInquiryDetail = async (id: number) => {
  if (!id) {
    throw new Error('Inquiry ID is required');
  }

  try {
    const res = await apiClient.get(`${API_ENDPOINTS.INQUIRY}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'investor',
      },
    });
    console.log('나의 문의 상세:', res);
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch my inquiry detail data:', error);
    throw error;
  }
};

// 나의 문의 삭제
export const deleteMyInquiry = async (id: number) => {
  try {
    const req = await apiClient.delete(`${API_ENDPOINTS.INQUIRY}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'investor',
      },
    });
    return req;
  } catch (error) {
    console.error('Failed to delete my inquiry detail data:', error);
    throw error;
  }
};
