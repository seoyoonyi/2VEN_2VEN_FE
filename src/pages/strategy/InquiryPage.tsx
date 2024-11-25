import { css } from '@emotion/react';

import PageHeader from '@/components/common/PageHeader';
import InquiryCreateForm from '@/components/page/inquiry-create/InquiryCreateForm';
import theme from '@/styles/theme';

const desc = [
  {
    text: '구체적 작성: 문의하시는 전략명과 관련된 내용을 상세히 기재하면 빠른 답변을 받을 수 있습니다.',
    icon: true,
  },
  {
    text: '예의 있는 표현: 트레이더와의 원활한 소통을 위해 예의 바른 표현을 사용해주세요.',
    icon: true,
  },
  {
    text: '작성하신 문의 내용은 트레이더가 직접 확인하며, 답변 시간은 상황에 따라 달라질 수 있습니다.',
    icon: true,
    color: theme.colors.main.primary,
  },
];

const InquiryPage = () => (
  <>
    <PageHeader title='문의하기' desc={desc} icon />
    <div css={createContainerStyle}>
      <InquiryCreateForm />
    </div>
  </>
);

const createContainerStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 48px 120px;
  margin-bottom: 28px;
`;

export default InquiryPage;
