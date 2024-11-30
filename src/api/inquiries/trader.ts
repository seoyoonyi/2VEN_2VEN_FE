import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { handleAxiosError } from '@/utils/errorHandler';

// 트레이더 답변 등록 (Create)
export const createTraderReply = async (id: string, replyContent: string) => {
  try {
    const res = await apiClient.post(
      `${API_ENDPOINTS.INQUIRY}/${id}/reply`,
      { replyContent },
      {
        headers: {
          'Content-Type': 'application/json',
          Auth: 'trader',
        },
      }
    );
    return { success: true, data: res.data };
  } catch (error) {
    return handleAxiosError(error, '답변 등록 중 알 수 없는 에러가 발생했습니다.');
  }
};

// 트레이더 답변 수정 (Update)
export const updateTraderReply = async (id: string, replyContent: string) => {
  try {
    const res = await apiClient.put(
      `${API_ENDPOINTS.INQUIRY}/${id}/reply`,
      { replyContent },
      {
        headers: {
          'Content-Type': 'application/json',
          Auth: 'trader',
        },
      }
    );
    return { success: true, data: res.data };
  } catch (error) {
    return handleAxiosError(error, '답변 수정 중 알 수 없는 에러가 발생했습니다.');
  }
};

// 트레이더 답변 삭제 (Delete)
export const deleteTraderReply = async (id: string) => {
  if (isNaN(Number(id))) {
    throw new Error('Invalid inquiry ID');
  }

  try {
    await apiClient.delete(`${API_ENDPOINTS.INQUIRY}/${id}/reply`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });
    return { success: true, message: '답변 삭제 성공' };
  } catch (error) {
    return handleAxiosError(error, '답변 삭제 중 알 수 없는 에러가 발생했습니다.');
  }
};
