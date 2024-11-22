import { useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import InquiryContent from '@/components/page/inquiry-create/inquiry-form-content/InquiryContent';
import InquiryStrategyInfo from '@/components/page/inquiry-create/inquiry-form-content/InquiryStrategyInfo';
import InquiryTitle from '@/components/page/inquiry-create/inquiry-form-content/InquiryTitle';
import { ROUTES } from '@/constants/routes';
// import theme from '@/styles/theme';

const generateInquiry = {
  strategyName: '사람들이 살 때 많이 따라사는 전략',
  investmentAmount: '200,000,000,000',
  investmentDate: '2024.12.25',
};

const InquiryCreateForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleInquiryListClick = () => {
    navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST);
  };

  return (
    // <form css={formContainerStyle} onSubmit={handleSubmit}>
    <form css={formContainerStyle}>
      <InquiryStrategyInfo
        strategyName={generateInquiry.strategyName}
        investmentAmount={generateInquiry.investmentAmount}
        investmentDate={generateInquiry.investmentDate}
      />
      <InquiryTitle title={title} onTitleChange={(e) => setTitle(e.target.value)} />
      <InquiryContent content={content} onContentChange={(e) => setContent(e.target.value)} />

      {/* 버튼 */}
      <div css={buttonContainerStyle}>
        <Button variant='neutral' size='lg' width={200} onClick={() => console.log('작성 취소')}>
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
  // gap: 56px;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export default InquiryCreateForm;
