import { useEffect } from 'react';

import { css, keyframes } from '@emotion/react';
import { BiCheck } from 'react-icons/bi';

import theme from '@/styles/theme';

interface ToastButton {
  label: string; // 버튼에 표시될 텍스트
  onClick: () => void; // 버튼 클릭 시 동작
}

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  isVisible: boolean;
  buttons?: ToastButton[]; // 버튼 목록 추가
}

const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  duration = 3000,
  isVisible,
  buttons = [], // 기본값: 빈 배열
  ...props
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isVisible]);

  // 버튼 핸들러 함수 정의
  const handleButtonClick = (onClick: () => void) => () => onClick && onClick();

  return isVisible ? (
    <div css={toastStyles(isVisible)} {...props}>
      <BiCheck css={iconStyle} />
      <span css={messageStyle}>{message}</span>
      <div css={buttonGroupStyle}>
        {buttons.map((button, index) => (
          <div key={index} css={buttonWrapperStyle}>
            <button css={buttonStyle} onClick={handleButtonClick(button.onClick)}>
              {button.label}
            </button>
            {/* 마지막 버튼이 아닌 경우에만 구분선 추가 */}
            {index < buttons.length - 1 && <span css={separatorStyle}></span>}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const toastStyles = (isVisible: boolean) => css`
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px; /* 토스트 크기 */
  height: 50px; /* 토스트 크기 */
  padding: 0 16px;
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.main.white};
  animation: ${fadeInOut} 3s ease forwards;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: ${isVisible ? 1 : 0};
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
  color: ${theme.colors.teal[400]};
  margin-right: 8px; /* 아이콘과 메시지 사이 간격 */
`;

const messageStyle = css`
  ${theme.textStyle.body.body2};
  flex: 1; /* 메시지를 최대한 넓게 차지 */
  margin-right: 18px; /* 메시지와 버튼 그룹 간 간격 */
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 8px; /* 버튼 간 간격 */
`;

const buttonWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const buttonStyle = css`
  ${theme.textStyle.captions.caption1};
  color: ${theme.colors.gray[200]};
  background: none;
  border: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const separatorStyle = css`
  background: ${theme.colors.gray[600]};
  width: 1px;
  height: 16px;
  margin: 0;
`;

export default Toast;
