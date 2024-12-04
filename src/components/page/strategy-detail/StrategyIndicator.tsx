import { css } from '@emotion/react';

import theme from '@/styles/theme';
import { formatRate } from '@/utils/statistics';

interface IndicatorProps {
  cumulativeRate: number;
  maximumRate: number;
  avgProfit: number;
  profitFactor: number;
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
    {!cumulativeRate && !maximumRate && !avgProfit && !profitFactor ? (
      <div>주요지표 데이터가 없습니다.</div>
    ) : (
      <>
        <div css={rateAreaStyle}>
          <div css={titleStyle}>누적수익률</div>
          <div css={rateContentStyle}>{formatRate(cumulativeRate)}%</div>
        </div>
        <div css={rateAreaStyle}>
          <div css={titleStyle}>최대자본인하율</div>
          <div css={rateContentStyle}>{formatRate(maximumRate)}%</div>
        </div>
        <div css={rateAreaStyle}>
          <div css={titleStyle}>평균손익률</div>
          <div css={rateContentStyle}>{formatRate(avgProfit)}%</div>
        </div>
        <div css={rateAreaStyle}>
          <div css={titleStyle}>Profit Factor</div>
          <div css={rateContentStyle}>{formatRate(profitFactor)}</div>
        </div>
        <div css={rateAreaStyle}>
          <div css={titleStyle}>승률</div>
          <div css={winRateStyle}>{formatRate(winRate)}%</div>
        </div>
      </>
    )}
  </div>
);

const indicatorWrapperStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.teal[50]};
  padding: 32px;
`;

const rateAreaStyle = css`
  color: ${theme.colors.gray[800]};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const titleStyle = css`
  ${theme.textStyle.captions.caption1};
`;

const winRateStyle = css`
  margin-top: 10px;
  ${theme.textStyle.subtitles.subtitle1};
  color: ${theme.colors.teal[700]};
`;

const rateContentStyle = css`
  margin-top: 10px;
  ${theme.textStyle.subtitles.subtitle1};
`;

export default StrategyIndicator;
