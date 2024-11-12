import { useEffect } from 'react';

import { css, keyframes } from '@emotion/react';
import { BiCheck } from 'react-icons/bi';

import theme from '@/styles/theme';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  isVisible: boolean;
}

const Toast = ({ message, onClose, duration = 3000, isVisible }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isVisible]);

  return isVisible ? (
    <div css={toastStyles(isVisible)}>
      <BiCheck css={iconStyle} />
      <span>{message}</span>
    </div>
  ) : null;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
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
  gap: 18px;
  width: 400px; /* 토스트 크기 */
  height: 50px; /* 토스트 크기 */
  padding: 0 18px;
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.main.white};
  animation: ${isVisible ? fadeIn : fadeOut} 0.5s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
  color: ${theme.colors.teal[400]};
`;

export default Toast;
