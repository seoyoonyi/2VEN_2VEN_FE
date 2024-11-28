import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { submitInquiryUpdate } from '@/api/myInquiry';
import { ROUTES } from '@/constants/routes';
import { InquiryDetailData, InquiryUpdateResponse } from '@/types/myinquires';

export const useSubmitInquiryUpdate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<InquiryUpdateResponse, Error, { id: number; payload: InquiryDetailData }>({
    mutationFn: async ({ id, payload }) => submitInquiryUpdate(id, payload),
    onSuccess: (data) => {
      const inquiryId = data.id;
      if (inquiryId) {
        navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.DETAIL(String(inquiryId)));
        window.scrollTo(0, 0);
        queryClient.invalidateQueries({ queryKey: ['inquiryUpdate', inquiryId] });
      } else {
        console.error('문의 ID를 가져오지 못했습니다.');
      }
    },
    onError: (error, variables) => {
      console.error('문의 수정 실패:', error);
      console.log('Failed Payload:', variables.payload);
    },
  });
};
