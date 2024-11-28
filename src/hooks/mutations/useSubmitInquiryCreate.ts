import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { submitInquiryCreate } from '@/api/inquiryCreate';
import { ROUTES } from '@/constants/routes';
import { InquiryCreateData, InquiryCreateResponce } from '@/types/inquiryCreate';

export const useSubmitConsultationCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<
    InquiryCreateResponce,
    Error,
    { investorId: string; payload: InquiryCreateData }
  >({
    mutationFn: async ({ investorId, payload }) => submitInquiryCreate(investorId, payload), // API 호출 함수
    onSuccess: (data) => {
      console.log('문의 등록 성공:', data);

      // 성공 후 목록 페이지로 이동
      navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST);
      window.scrollTo(0, 0);
      queryClient.invalidateQueries({ queryKey: ['inquiries'] }); // 캐시 무효화
    },
    onError: (error) => {
      console.error('문의 등록 실패:', error);
    },
  });
};
