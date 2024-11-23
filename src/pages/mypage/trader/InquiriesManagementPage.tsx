import { css } from '@emotion/react';

import theme from '@/styles/theme';

const InquiriesManagementPage = () => (
  <div css={myPageWrapperStyle}>
    <div css={myPageHeaderStyle}>
      <div>
        <h2>나의 문의</h2>
        <p>
          총 <span>0</span>개의 문의 내역이 있습니다
        </p>
      </div>
    </div>
    <div>
      <p css={StrategyEmptyStyle}>
        전략에 대해 궁금한 점이 있으면, 트레이더에게 문의를 남겨보세요! <br /> &apos;전략
        상세&apos;에서 &apos;문의하기&apos;를 통해 손쉽게 문의하실 수 있습니다.
      </p>
    </div>
  </div>
);

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
  }

  p {
    ${theme.textStyle.body.body3}
    span {
      color: ${theme.colors.main.primary};
    }
  }

  a {
    display: flex;
    height: 60px;
    padding: 20px 32px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.main.white};
    background-color: ${theme.colors.main.primary};
  }
`;

const StrategyEmptyStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${theme.colors.gray[400]};
  text-align: center;
`;

export default InquiriesManagementPage;
