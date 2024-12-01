import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Toast from '@/components/common/Toast';
import TraderAnswer from '@/components/page/mypage-trader/TraderAnswer';
import TraderQuestion from '@/components/page/mypage-trader/TraderQuestion';
import useFetchInquiryDetail from '@/hooks/queries/useFetchInquiryDetail';
import { useAuthStore } from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';

const InquiryDetailPage = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const { user } = useAuthStore();

  const { isToastVisible, hideToast, message } = useToastStore();

  const { data, isLoading, isError } = useFetchInquiryDetail({
    id: Number(inquiryId),
    role: user?.role,
  });

  if (isLoading) {
    return (
      <div css={containerStyle}>
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return <div css={containerStyle}>문의 데이터를 불러오는 데 실패했습니다</div>;
  }

  return (
    <div css={containerStyle}>
      <TraderQuestion data={data} />
      <TraderAnswer data={data} />
      {isToastVisible && <Toast message={message} isVisible={isToastVisible} onClose={hideToast} />}
    </div>
  );
};

const containerStyle = css`
  width: 955px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default InquiryDetailPage;
