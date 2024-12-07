import { css, keyframes } from '@emotion/react';

import theme from '@/styles/theme';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div css={containerStyle}>
    <div css={progressBarContentStyle}>
      <div css={progressBarStyle(progress)} />
    </div>
  </div>
);

const progressAnimation = (progress: number) => keyframes`
  0% {
    width: 0;
    background-color: ${theme.colors.teal[400]};
  }
  50% {
    background-color: ${theme.colors.teal[500]};
  }
  100% {
    width: ${progress}%;
    background-color: ${theme.colors.main.primary};
  }
`;

const containerStyle = css`
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 6px;
  background: ${theme.colors.main.white};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  outline: 2px solid ${theme.colors.teal[400]};
`;

const progressBarContentStyle = css`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: ${theme.colors.gray[200]};
  border-radius: 10px;
  overflow: hidden;
  height: 15px;
`;

const progressBarStyle = (progress: number) => css`
  height: 100%;
  animation: ${progressAnimation(progress)} 2s ease-in-out forwards;
  border-radius: 10px;
`;

export default ProgressBar;
