// import { css, keyframes } from '@emotion/react';

// import theme from '@/styles/theme';

// const Loading = () => (
//   <div css={containerStyle}>
//     <div css={dotsStyle}>
//       <div css={[dotStyle(theme.colors.teal[400]), delayStyle(0)]}></div>
//       <div css={[dotStyle(theme.colors.teal[300]), delayStyle(0.16)]}></div>
//       <div css={[dotStyle(theme.colors.teal[200]), delayStyle(0.32)]}></div>
//       <div css={[dotStyle(theme.colors.teal[100]), delayStyle(0.48)]}></div>
//     </div>
//     <h1 css={textStyle}>잠시만 기다려주세요!</h1>
//     <p css={subTextStyle}>최고의 투자 전략을 준비 중입니다.</p>
//   </div>
// );

// // keyframes 정의
// const upDown = keyframes`
//   0% {
//     transform: translateY(-10px);
//   }
//   100% {
//     transform: translateY(10px);
//   }
// `;

// const containerStyle = css`
//   position: relative; /* 이거 값 정하는 거 맞아요? */
//   display: flex;
//   // width: ${theme.layout.width.content}; /* 이거 값 정하는 거 맞아요? */
//   width: 100%;
//   height: 100%; /* 이거 값 정하는 거 맞아요? */
//   // margin: 0 auto; /* 이거 값 정하는 거 맞아요? */
//   // padding: 10px 0; /* 이거 값 정하는 거 맞아요? */
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   z-index: 10;
// `;

// const dotsStyle = css`
//   display: flex;
//   gap: 12px;
//   margin-bottom: 32px;
// `;

// const dotStyle = (color: string) => css`
//   width: 16px;
//   height: 16px;
//   border-radius: 50%;
//   background-color: ${color};
//   animation: ${upDown} 0.5s ease-in infinite alternate;
// `;

// // 애니메이션 딜레이 스타일 생성 함수
// const delayStyle = (delay: number) => css`
//   animation-delay: ${delay}s;
// `;

// const textStyle = css`
//   ${theme.textStyle.headings.h2};
//   color: ${theme.colors.gray[800]};
//   margin-bottom: 10px;
// `;

// const subTextStyle = css`
//   ${theme.textStyle.body.body2};
//   color: ${theme.colors.gray[700]};
// `;

// export default Loading;

import { css, keyframes } from '@emotion/react';

import theme from '@/styles/theme';

const Loader = () => (
  <div css={loaderWrapperStyle}>
    <div className='load-row'>
      <span />
      <span />
      <span />
      <span />
    </div>
    <h2 css={textStyle}>잠시만 기다려주세요!</h2>
    <p css={subTextStyle}>최고의 투자 전략을 준비 중입니다.</p>
  </div>
);

const upDownAnimation = keyframes`
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(10px);
  }
`;

const loaderWrapperStyle = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;

  .load-row {
    display: flex;
    text-align: center;
    gap: 12px;
    margin-bottom: 32px;
  }

  .load-row span {
    display: flex;
    width: 16px;
    height: 16px;
    background: ${theme.colors.teal[400]};
    border-radius: 50px;
    animation: ${upDownAnimation} 0.5s ease-in infinite alternate;
  }

  .load-row span:nth-of-type(2) {
    background: ${theme.colors.teal[300]};
    animation-delay: 0.16s;
  }

  .load-row span:nth-of-type(3) {
    background: ${theme.colors.teal[200]};
    animation-delay: 0.32s;
  }

  .load-row span:nth-of-type(4) {
    background: ${theme.colors.teal[100]};
    animation-delay: 0.48s;
  }
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

export default Loader;
