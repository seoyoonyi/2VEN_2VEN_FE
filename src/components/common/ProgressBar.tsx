import { css, keyframes } from '@emotion/react';

import theme from '@/styles/theme';

const ProgressBar: React.FC<{ progress: number; variant: 'forwards' | 'infinite' }> = ({
  progress,
  variant = 'forwards',
}) => (
  <div css={containerStyle(variant)}>
    <div css={progressBarContentStyle}>
      <div css={progressBarStyle(progress, variant)} />
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

const progressInfiniteAnimation = (progress: number) => keyframes`
0% {
  transform: translateX(-100%);
}
50% {
  background-color: ${theme.colors.teal[500]};
}
100% {
width: ${progress}%;
  transform: translateX(100%);
}
`;

const containerStyle = (variant: 'forwards' | 'infinite') => css`
  width: 100%;
  max-width: 600px;
  margin: 0px auto;
  padding: 20px;
  border-radius: 6px;
  background: ${theme.colors.main.white};
  ${variant === 'forwards' &&
  css`
    margin: 40px auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    outline: 2px solid ${theme.colors.teal[400]};
  `}
`;

const progressBarContentStyle = css`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: ${theme.colors.gray[200]};
  border-radius: 10px;
  overflow: hidden;
  height: 15px;
`;

const progressBarStyle = (progress: number, variant: 'forwards' | 'infinite') => css`
  height: 100%;
  ${variant === 'forwards' &&
  css`
    animation: ${progressAnimation(progress)} 2s ease-in-out forwards;
    border-radius: 10px;
  `}
  ${variant === 'infinite' &&
  css`
    background: ${theme.colors.teal[400]};
    animation: ${progressInfiniteAnimation(progress)} 1.5s ease-in-out infinite;
  `}
`;

export default ProgressBar;
