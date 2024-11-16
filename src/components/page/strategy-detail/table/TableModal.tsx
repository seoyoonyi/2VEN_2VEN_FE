import { css } from '@emotion/react';
import { createPortal } from 'react-dom';

import useTableModalStore from '@/stores/tableModalStore';
import theme from '@/styles/theme';

const TableModal = () => {
  const { isOpen, tableModalData, closeTableModal } = useTableModalStore();

  if (!isOpen || !tableModalData) return null;

  const { type, title, data, actionButton, onAction } = tableModalData;

  const onClickButton = () => {
    onAction();
    closeTableModal();
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('modal-root를 찾지 못함!');
    return null;
  }

  return createPortal(
    <div css={modalBackgroundStyle}>
      <div css={modalStyle}>
        <div css={titleStyle}>{title}</div>
        <div css={descStyle}>{data}</div>
        <div css={modalButtonStyle}>
          <button onClick={closeTableModal} css={cancelButtonStyle}>
            취소
          </button>
          <button onClick={onClickButton} css={getButtonStyle(type)}>
            {actionButton}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

const modalBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const modalStyle = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 720px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36.5px 70px;
  background-color: ${theme.colors.main.white};
  border-radius: 10px;
`;

const titleStyle = css`
  font-size: ${theme.typography.fontSizes.subtitle.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.md};
  margin-bottom: 8px;
`;

const descStyle = css`
  white-space: pre-line;
  text-align: center;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.medium};
  line-height: ${theme.typography.lineHeights.lg};
  color: ${theme.colors.gray[500]};
`;

const baseButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 32px;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.sm};
`;

const modalButtonStyle = css`
  display: flex;
  gap: 12px;
`;

const cancelButtonStyle = css`
  ${baseButtonStyle};
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[500]};
`;

const getButtonStyle = (type: 'insert' | 'update') => {
  if (type === 'insert') {
    return css`
      ${baseButtonStyle};
      background-color: ${theme.colors.main.primary};
      color: ${theme.colors.main.white};
    `;
  } else if (type === 'update') {
    return css`
      ${baseButtonStyle};
      background-color: ${theme.colors.main.primary};
      color: ${theme.colors.main.white};
    `;
  }
};

export default TableModal;
