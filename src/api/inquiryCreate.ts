import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { InquiryCreateData } from '@/types/inquiryCreate';

//investorId 기준으로 가져오는 거 맞죠?????????????????????????????

// 로컬 스토리지에서 데이터 가져오기
// const getInvestorId = () => {
//   const localData = JSON.parse(localStorage.getItem('YOUR_LOCAL_STORAGE_KEY') || '{}');
//   return localData?.state?.investorId || ''; // `token`을 `investorId`로 사용(맞아?? 몰라...)
// };

// 문의(상담) 등록
// export const submitInquiryCreate = async (id: number) => {
//   try {
//     const investorId = getInvestorId();

// const payload = {
//   investorId, // 로컬 스토리지에서 가져온 값
//   traderId: '71-88RZ_QQ65hMGknyWKLA', // 고정값,,
//   strategyId: 1, // JSON에서 받은 값
//   strategyName: 'Custom Strategy Name', // JSON에서 받은 값
//   investmentAmount: 1000.0, // JSON에서 받은 값
//   investmentDate: '2024-11-27T12:00:00', // JSON에서 받은 값
//   title: 'Investment Title', // JSON에서 받은 값
//   content: 'This is a test investment content.', // JSON에서 받은 값
//   status: 'PENDING', // JSON에서 받은 값
// };
export const submitInquiryCreate = async (investorId: string, payload: InquiryCreateData) => {
  try {
    // 고정된 traderId 넣어놨어요!!!
    // const investorId = getInvestorId();
    // const traderId = '71-88RZ_QQ65hMGknyWKLA';
    const traderId = 'E7SZjvK5Q2-4A95uepZUSw';
    const completePayload = {
      investorId, // 로컬 스토리지에서 가져온 값
      traderId,
      ...payload, // 외부에서 전달된 payload와 병합
    };

    // API 호출
    // const { data } = await apiClient.post(API_ENDPOINTS.CONSULTATION.CREATE, payload, {
    const { data } = await apiClient.post(`${API_ENDPOINTS.INQUIRY}`, completePayload, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'investor', // API 명세서엔 얘말고 ( 근데 문의등록은 투자자만 하니까 이게 필요한 게 아닐까?)
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to submit consultation:', error);
    throw error;
  }
};
