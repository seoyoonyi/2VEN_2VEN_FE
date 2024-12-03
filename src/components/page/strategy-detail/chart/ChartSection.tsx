import { css } from '@emotion/react';

import Select from '@/components/common/Select';
import StrategyChart from '@/components/common/StrategyChart';
import theme from '@/styles/theme';

const chartOptions = [
  {
    label: '기준가',
    value: 'referencePrice',
  },
  {
    label: '잔고',
    value: 'balance',
  },
  {
    label: '원금',
    value: 'principal',
  },
  {
    label: '누적 입출금액',
    value: 'cumulativeDepWdPrice',
  },
  {
    label: '일별 입출금 금액',
    value: 'dailyWdPrice',
  },
  {
    label: '일손익 금액',
    value: 'dailyProfitLoss',
  },
  {
    label: '일 손익률(%)',
    value: 'dailyPlRate',
  },
  {
    label: '누적 수익금액',
    value: 'cumulativeProfitLoss',
  },
  {
    label: '누적 수익률(%)',
    value: 'cumulativeProfitLossRate',
  },
  {
    label: '현재 자본인하금액',
    value: 'currentDrawdownAmount',
  },
  {
    label: '현재 자본인하율',
    value: 'currentDrawdownRate',
  },
  {
    label: '평균 손익 금액',
    value: 'averageProfitLoss',
  },
  {
    label: '평균 손익률(%)',
    value: 'averageProfitLossRate',
  },
  {
    label: '승률',
    value: 'winRate',
  },
  {
    label: 'profitFactor',
    value: 'profitFactor',
  },
  {
    label: 'ROA',
    value: 'roa',
  },
  {
    label: '총 이익',
    value: 'totalProfit',
  },
  {
    label: '총 손실',
    value: 'totalLoss',
  },
];

const dailyProfitRate = [0, 21.52, 726.21, 300, 1060, 1210.2];
const principal = [324640010, 624654000, 824640300, 824640040, 924640500, 124644000];

const ChartSection = () => (
  <div css={sectionStyle}>
    <div css={chartTitle}>계좌 누적 수익률</div>
    <div css={showChartStyle}>
      <div css={selectArea}>
        <Select
          type='sm'
          options={chartOptions}
          onChange={() => {}}
          defaultLabel='기준가'
          width='160px'
        />
        <Select
          type='sm'
          options={chartOptions}
          onChange={() => {}}
          defaultLabel='기준가'
          width='160px'
        />
      </div>
      <div css={chartStyle}>
        <StrategyChart lineData={dailyProfitRate} areaData={principal} />
      </div>
    </div>
  </div>
);

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
`;

const chartTitle = css`
  display: flex;
  ${theme.textStyle.subtitles.subtitle1};
`;

const selectArea = css`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin: 16px 0 32px 0;
`;

const showChartStyle = css`
  margin: 0 auto;
`;
const chartStyle = css`
  width: 940px;
  height: 460px;
  padding: 20px;
  display: flex;
  border: 1px solid ${theme.colors.gray[300]};
`;

export default ChartSection;
