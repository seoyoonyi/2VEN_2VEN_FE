import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { submitInquiryUpdate } from '@/api/myInquiry';
import { ROUTES } from '@/constants/routes';
import { InquiryDetailData, InquiryUpdateResponse } from '@/types/myinquires';

export const useMyInquiry = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<InquiryUpdateResponse, Error, { id: number; data: InquiryDetailData }>({
    mutationFn: async ({ id, data }) => {
      const response = await submitInquiryUpdate(id, data);
      return response;
    },
    onSuccess: (data) => {
      console.log('문의 수정 성공:', data);

      const inquiryId = data.id;
      if (inquiryId) {
        queryClient.invalidateQueries({ queryKey: ['myInquiry'] });
        navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.DETAIL(inquiryId));
        window.scrollTo(0, 0);
      } else {
        console.error('문의 ID를 가져오지 못했습니다.');
      }
    },
    onError: (error) => {
      console.error('문의 수정 실패:', error);
    },
  });
};
