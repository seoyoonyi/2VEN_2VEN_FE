import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { InquiryDetailData } from '@/types/myinquires';

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
    const { data } = await apiClient.get(`${API_ENDPOINTS.INQUIRY}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'investor',
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch my inquiry detail data:', error);
    throw error;
  }
};

// 나의 문의 수정
export const submitInquiryUpdate = async (id: number, payload: InquiryDetailData) => {
  try {
    const mappedPayload = {
      id: payload.id,
      investorId: payload.investorId,
      investorName: payload.investorName,
      traderId: payload.traderId,
      traderName: payload.traderName,
      strategyId: payload.strategyId,
      strategyName: payload.strategyName,
      investmentAmount: payload.investmentAmount,
      investmentDate: payload.investmentDate,
      title: payload.title,
      content: payload.content,
      status: payload.status,
      createdAt: payload.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const { data } = await apiClient.put(`${API_ENDPOINTS.INQUIRY}/${id}`, mappedPayload, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'investor',
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to submit inquiry update', error);
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
