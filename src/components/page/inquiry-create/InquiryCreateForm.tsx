import { useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import InquiryContent from '@/components/page/inquiry-create/inquiry-form-content/InquiryContent';
import InquiryStrategyInfo from '@/components/page/inquiry-create/inquiry-form-content/InquiryStrategyInfo';
import InquiryTitle from '@/components/page/inquiry-create/inquiry-form-content/InquiryTitle';
import { ROUTES } from '@/constants/routes';
import { useSubmitInquiryCreate } from '@/hooks/mutations/useSubmitInquiryCreate';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';

interface InquiryCreateFormProps {
  strategyTitle: string;
  strategyId: string;
  traderId: string;
}

// const InquiryCreateForm = ({ strategyTitle, strategyId, traderId }: InquiryCreateFormProps) => {
const InquiryCreateForm = ({ strategyTitle, strategyId, traderId }: InquiryCreateFormProps) => {
  const { openModal } = useModalStore();
  const { isToastVisible, hideToast, message, showToast } = useToastStore();

  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState<number>(0); // 숫자로 변경
  const [investmentDate, setInvestmentDate] = useState('');

  const { mutate: InquiryCreate } = useSubmitInquiryCreate();

  const handleCreateSubmit = () => {
    if (!title || !content || !investmentAmount || !investmentDate || !user?.memberId) {
      showToast('모든필드를 입력해주세요.', 'error');
      return;
    }

    const payload = {
      investorId: user.memberId, // 로그인된 사용자의 ID
      traderId,
      strategyId: Number(strategyId),
      strategyName: strategyTitle,
      investmentAmount: Number(investmentAmount),
      investmentDate: `${investmentDate}T00:00:00`,
      title,
      content,
      status: 'PENDING' as const,
    };

    console.log('traderId:', traderId);

    openModal({
      type: 'confirm',
      title: '문의 등록',
      desc: '문의 내용을 등록하시겠습니까?',
      onAction: () => {
        InquiryCreate(
          { payload },
          {
            onSuccess: () => {
              console.log('문의 등록 성공');
              showToast('문의 등록 완료되었습니다.', 'basic');
              navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST);
            },
            onError: (error: Error) => {
              console.error('문의 등록 실패:', error.message);
            },
          }
        );
      },
    });
  };

  const handleStrategyDetailClick = () => {
    navigate(ROUTES.STRATEGY.DETAIL(strategyId));
  };

  return (
    <form css={formContainerStyle}>
      <InquiryStrategyInfo
        strategyName={strategyTitle}
        investmentAmount={investmentAmount}
        onAmountChange={(value) => setInvestmentAmount(value)} // 숫자 상태 업데이트
        investmentDate={investmentDate}
        onDateChange={(e) => setInvestmentDate(e.target.value)}
      />
      <InquiryTitle title={title} onTitleChange={(e) => setTitle(e.target.value)} />
      <InquiryContent content={content} onContentChange={(e) => setContent(e.target.value)} />

      {/* 버튼 */}
      <div css={buttonContainerStyle}>
        <Button variant='neutral' size='lg' width={200} onClick={handleStrategyDetailClick}>
          작성취소
        </Button>
        <Button
          variant='primary'
          size='lg'
          width={200}
          onClick={(e) => {
            e.preventDefault();
            handleCreateSubmit();
          }}
        >
          문의 남기기
        </Button>
      </div>

      <Modal />
      {isToastVisible && <Toast message={message} isVisible={isToastVisible} onClose={hideToast} />}
    </form>
  );
};

const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 900px;
  margin: 0 auto;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export default InquiryCreateForm;
