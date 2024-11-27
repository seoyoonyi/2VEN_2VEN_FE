import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchMyInquiryDetail } from '@/api/myInquiry';
import Answer from '@/components/page/mypage-investor/inquires-detail/Answer';
import Question from '@/components/page/mypage-investor/inquires-detail/Question';
import { InquiryDetailData } from '@/types/myinquires';

const MyInquiresDetailPage = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();

  const { data, isLoading, isError } = useQuery<InquiryDetailData, Error>({
    queryKey: ['myInquiryDetail', inquiryId],
    queryFn: () => fetchMyInquiryDetail(Number(inquiryId)),
  });

  if (isLoading) {
    return <div css={containerStyle}>로딩 중...</div>;
  }

  if (isError || !data) {
    return <div css={containerStyle}>문의 데이터를 불러오는 데 실패했습니다</div>;
  }

  return (
    <div css={containerStyle}>
      <Question data={data} />
      {data.status === 'COMPLETED' && <Answer data={data} />}
    </div>
  );
};

const containerStyle = css`
  width: 955px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default MyInquiresDetailPage;
