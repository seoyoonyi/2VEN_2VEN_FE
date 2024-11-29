import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import InquiryContent from '@/components/page/inquiry-create/inquiry-form-content/InquiryContent';
import InquiryStrategyInfo from '@/components/page/inquiry-create/inquiry-form-content/InquiryStrategyInfo';
import InquiryTitle from '@/components/page/inquiry-create/inquiry-form-content/InquiryTitle';
import { ROUTES } from '@/constants/routes';

interface InquiryCreateFormProps {
  strategyTitle: string;
  strategyId: string;
  traderId: string;
}

const InquiryCreateForm = ({
  strategyTitle,
  strategyId,
  traderId = '71-88RZ_QQ65hMGknyWKLA', // 기본값 설정
}: InquiryCreateFormProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentDate, setInvestmentDate] = useState('');

  const handleInquiryListClick = () => {
    navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST);
  };

  const handleStrategyDetailClick = () => {
    navigate(ROUTES.STRATEGY.DETAIL(strategyId));
  };

  return (
    <form css={formContainerStyle}>
      <InquiryStrategyInfo
        strategyName={strategyTitle}
        investmentAmount={investmentAmount}
        onAmountChange={(e) => setInvestmentAmount(e.target.value)}
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
        <Button variant='primary' size='lg' width={200} onClick={handleInquiryListClick}>
          문의 남기기
        </Button>
      </div>
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
