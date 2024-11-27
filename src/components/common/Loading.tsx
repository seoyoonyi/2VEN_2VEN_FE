import { css, keyframes } from '@emotion/react';

import theme from '@/styles/theme';

const Loading = () => (
  <div css={containerStyle}>
    <div css={dotsStyle}>
      <div css={[dotStyle, delayStyle(0)]}></div>
      <div css={[dotStyle, delayStyle(0.2)]}></div>
      <div css={[dotStyle, delayStyle(0.4)]}></div>
      <div css={[dotStyle, delayStyle(0.6)]}></div>
    </div>
    <h1 css={textStyle}>잠시만 기다려주세요!</h1>
    <p css={subTextStyle}>최고의 투자 전략을 준비 중입니다.</p>
  </div>
);

// keyframes 정의
const bounce = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
`;

const containerStyle = css`
  position: relative; /* 이거 값 정하는 거 맞아요? */
  display: flex;
  width: ${theme.layout.width.content}; /* 이거 값 정하는 거 맞아요? */
  height: 100%; /* 이거 값 정하는 거 맞아요? */
  margin: 0 auto; /* 이거 값 정하는 거 맞아요? */
  padding: 10px 0; /* 이거 값 정하는 거 맞아요? */
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const dotsStyle = css`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

const dotStyle = css`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${theme.colors.teal[400]};
  animation: ${bounce} 1s infinite ease-in-out;
`;

// 애니메이션 딜레이 스타일 생성 함수
const delayStyle = (delay: number) => css`
  animation-delay: ${delay}s;
`;

const textStyle = css`
  ${theme.textStyle.headings.h2};
  color: ${theme.colors.gray[800]};
  margin-bottom: 10px;
`;

const subTextStyle = css`
  ${theme.textStyle.body.body2};
  color: ${theme.colors.gray[700]};
`;

export default Loading;
