import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import theme from '@/styles/theme';
import { StrategyInfoProps } from '@/types/myinquires';

const StrategyInfo = ({ strategyName, investmentAmount, investmentDate }: StrategyInfoProps) => {
  const formattedDate = investmentDate.slice(0, 10);

  return (
    <div css={strategyInfoWrapper}>
      <div css={infoWrapper}>
        <label htmlFor='strategy-name'>관심전략명</label>
        <input id='strategy-name' value={strategyName} css={strategyInputStyle} disabled />
      </div>
      <div css={infoWrapper}>
        <div css={infoWrapper}>
          <label htmlFor='investment-amount'>투자개시금액</label>
          <Input
            id='investment-amount'
            value={investmentAmount.toLocaleString()}
            onChange={() => {}}
            css={inputStyle}
          />
        </div>
        <div css={infoWrapper}>
          <label htmlFor='investment-date'>투자개시시점</label>
          <Input type='date' value={formattedDate} onChange={() => {}} css={inputStyle} />
        </div>
      </div>
    </div>
  );
};

const strategyInfoWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  background-color: ${theme.colors.teal[800]};
  border-radius: 8px;
  margin-bottom: 48px;

  label {
    width: 84px;
    color: ${theme.colors.main.white};
  }
`;

const strategyInputStyle = css`
  flex: 1;
  height: 65px;
  padding: 12px;
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[300]};
  font-size: 18px;
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.sm};
  color: ${theme.colors.gray[700]};
  opacity: 0.4;

  &:focus {
    outline: none;
    border: none;
  }
`;

const infoWrapper = css`
  display: flex;
  gap: 24px;
  align-items: center;
  flex: 1;
`;

const inputStyle = css`
  width: 285.5px;
  color: ${theme.colors.gray[700]};
`;

export default StrategyInfo;
