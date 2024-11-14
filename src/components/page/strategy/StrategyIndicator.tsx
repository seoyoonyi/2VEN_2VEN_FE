import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface IndicatorProps {
  cumulativeRate: number;
  maximumRate: number;
  avgProfit: number;
  profitFactor: string;
  winRate: number;
}

const StrategyIndicator = ({
  cumulativeRate,
  maximumRate,
  avgProfit,
  profitFactor,
  winRate,
}: IndicatorProps) => (
  <div css={indicatorWrapperStyle}>
    <div css={rateAreaStyle}>
      <div css={titleStyle}>누적수익률</div>
      <div css={rateContentStyle}>{cumulativeRate}</div>
    </div>
    <div css={rateAreaStyle}>
      <div css={titleStyle}>최대자본인하율</div>
      <div css={rateContentStyle}>{maximumRate}</div>
    </div>
    <div css={rateAreaStyle}>
      <div css={titleStyle}>평균손익률</div>
      <div css={rateContentStyle}>{avgProfit}</div>
    </div>
    <div css={rateAreaStyle}>
      <div css={titleStyle}>Profit Factor</div>
      <div css={rateContentStyle}>{profitFactor}</div>
    </div>
    <div css={rateAreaStyle}>
      <div css={titleStyle}>승률</div>
      <div css={rateContentStyle}>{winRate}</div>
    </div>
  </div>
);

const indicatorWrapperStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.gray[50]};
  padding: 32px;
`;

const rateAreaStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const titleStyle = css``;

const rateContentStyle = css`
  margin-top: 10px;
  ${theme.textStyle.subtitles.subtitle4};
`;

export default StrategyIndicator;
