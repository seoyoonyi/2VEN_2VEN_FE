// import { useState } from 'react';

import { css } from '@emotion/react';

import Toast from '@/components/common/Toast';
import useToastStore from '@/stores/toastStore';

const ToastTestPage = () => {
  const { isToastVisible, showToast, hideToast, message } = useToastStore();

  const handleShowToast = () => {
    console.log('토스트 버튼 클릭');
    showToast('링크가 복사되었습니다!');
  };

  return (
    <div css={containerStyle}>
      <button css={buttonStyle} onClick={handleShowToast}>
        토스트야 나와라
      </button>
      {isToastVisible && <Toast message={message} onClose={hideToast} isVisible={isToastVisible} />}
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const buttonStyle = css`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export default ToastTestPage;
