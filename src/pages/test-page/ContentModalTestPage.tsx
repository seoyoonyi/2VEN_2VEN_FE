import { css } from '@emotion/react';

import ContentModal from '@/components/common/ContentModal';
import Input from '@/components/common/Input';
import useContentModalStore from '@/stores/contentModalStore';
import theme from '@/styles/theme';

const ContentTest = () => (
  <div css={contentWrapperStyle}>
    <span>거부 사유 작성</span>
    <textarea css={textareaStyle} placeholder='내용을 입력하세요' />
  </div>
);

const ContentTest2 = () => (
  <div css={contentWrapperStyle}>
    <span>상품유형</span>
    <Input />
    <span>아이콘</span>
    <Input />
  </div>
);

const ContentModalTestPage = () => {
  const { openModal } = useContentModalStore();

  const onClickContact = () => {
    openModal({
      title: '승인 거부',
      content: <ContentTest />,
      onAction: () => console.log('승인거부'),
    });
  };

  const onClickAdd = () => {
    openModal({
      title: '상품 유형 추가',
      content: <ContentTest2 />,
      onAction: () => console.log('상품유형 추가'),
    });
  };

  return (
    <div>
      <button onClick={onClickContact}>승인 거부</button>
      <button onClick={onClickAdd}>상품유형 추가</button>
      <ContentModal />
    </div>
  );
};

const contentWrapperStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  color: ${theme.colors.main.primary};
`;

const textareaStyle = css`
  height: 200px;
  border: 1px solid ${theme.colors.gray[300]};
`;

export default ContentModalTestPage;
