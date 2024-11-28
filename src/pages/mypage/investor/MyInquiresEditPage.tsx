import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchMyInquiryDetail } from '@/api/myInquiry';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import InquiresInput from '@/components/page/mypage-investor/inquires-edit/InquiresInput';
import StrategyInfo from '@/components/page/mypage-investor/inquires-edit/StrategyInfo';
import { useSubmitInquiryUpdate } from '@/hooks/mutations/useSubmitInquiryUpdate';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { InquiryDetailData } from '@/types/myinquires';

const MyInquiresEditPage = () => {
  const [formData, setFormData] = useState<InquiryDetailData | null>(null);

  const { openModal } = useModalStore();
  const { showToast } = useToastStore();

  const { inquiryId } = useParams<{ inquiryId: string }>();
  const navigate = useNavigate();

  const { mutate: submitInquiryUpdate } = useSubmitInquiryUpdate();

  const { data, isLoading, isError } = useQuery<InquiryDetailData, Error>({
    queryKey: ['myInquiryDetail', inquiryId],
    queryFn: () => fetchMyInquiryDetail(Number(inquiryId)),
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (field: keyof InquiryDetailData, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleCancel = () => {
    openModal({
      type: 'confirm',
      title: '수정 취소',
      desc: `작성을 취소하시겠습니까?`,
      onAction: () => navigate(-1),
    });
  };

  const handleUpdate = () => {
    if (!formData || !inquiryId) return;

    openModal({
      type: 'confirm',
      title: '문의 수정',
      desc: `수정하시겠습니까?`,
      onAction: () => {
        submitInquiryUpdate({ id: Number(inquiryId), payload: formData });
        showToast('문의 수정이 정상적으로 완료되었습니다.', 'basic');
      },
    });
  };

  if (isLoading) {
    return <div css={editWrapper}>로딩 중...</div>;
  }

  if (isError || !data) {
    return <div css={editWrapper}>문의 데이터를 불러오는 데 실패했습니다</div>;
  }

  return (
    <div css={editWrapper}>
      <div css={titleStyle}>문의 수정</div>
      <StrategyInfo data={formData} onChange={handleInputChange} />
      <InquiresInput data={formData} onChange={handleInputChange} />
      <div css={buttonWrapper}>
        <Button variant='neutral' customStyle={buttonStyle} onClick={handleCancel}>
          작성취소
        </Button>
        <Button customStyle={buttonStyle} onClick={handleUpdate}>
          수정완료
        </Button>
      </div>
      <Modal />
    </div>
  );
};

const editWrapper = css`
  width: 955px;
  display: flex;
  flex-direction: column;
  padding: 48px 40px 56px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const titleStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.heading.h3};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.md};
  margin-bottom: 24px;
`;

const buttonWrapper = css`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  padding: 0 32px;
`;

export default MyInquiresEditPage;
