import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface InquiryStrategyInfoProps {
  strategyName: string;
  investmentAmount: string;
  investmentDate: string;
}

const InquiryStrategyInfo = ({
  strategyName,
  investmentAmount,
  investmentDate,
}: InquiryStrategyInfoProps) => (
  <div css={containerStyle}>
    <div css={infoStyle}>
      <label htmlFor='strategy-name' css={labelStyle}>
        관심전략명
      </label>
      <input id='strategy-name' value={strategyName} readOnly css={nameStyle} />
    </div>
    <div css={infoRowStyle}>
      <label htmlFor='investment-amount' css={labelStyle}>
        투자개시금액
      </label>
      <input id='investment-amount' type='text' value={investmentAmount} readOnly css={RowStyle} />
      <label htmlFor='investment-date' css={labelStyle}>
        투자개시시점
      </label>
      <input id='investment-date' type='text' value={investmentDate} readOnly css={RowStyle} />
    </div>
  </div>
);

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 32px;
  background-color: ${theme.colors.teal[800]};
  border-radius: 8px;
  margin-bottom: 48px;
`;

const infoStyle = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const infoRowStyle = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const labelStyle = css`
  ${theme.textStyle.body.body2};
  color: ${theme.colors.main.white};
  width: 84px;
`;

const nameStyle = css`
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  display: flex;
  width: 728px;
  height: 65px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray[300]};
  padding: 12px;
  font-size: 16px;
  opacity: 0.5;
  outline: none;
`;

const RowStyle = css`
  background-color: ${theme.colors.main.white};
  color: ${theme.colors.gray[600]};
  display: flex;
  width: 299px;
  height: 56px;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.gray[300]};
  gap: 10px;
  align-items: center;
  outline: none;
`;

export default InquiryStrategyInfo;
