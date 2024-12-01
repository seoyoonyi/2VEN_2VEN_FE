import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { InquiryCreateData, InquiryCreateResponse } from '@/types/inquiryCreate';

export const submitInquiryCreate = async (
  payload: InquiryCreateData
): Promise<InquiryCreateResponse> => {
  try {
    const { data } = await apiClient.post(API_ENDPOINTS.INQUIRY, payload, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'investor', // API 명세서엔 얘말고 ( 근데 문의등록은 투자자만 하니까 이게 필요한 게 아닐까?)
      },
    });
    return data;
  } catch (error) {
    console.error('문의 등록 실패:', error);
    throw error;
  }
};
