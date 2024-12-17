import { css, keyframes } from '@emotion/react';

import theme from '@/styles/theme';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const loaderStyle = css`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid ${theme.colors.main.primary};
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

const LoadingSpin: React.FC = () => <div css={loaderStyle} />;

export default LoadingSpin;
