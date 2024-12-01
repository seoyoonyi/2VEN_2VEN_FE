import { css } from '@emotion/react';

import Select from '@/components/common/Select';
import StrategyChart from '@/components/common/StrategyChart';
import theme from '@/styles/theme';

const chartOptions = [
  {
    label: '기준가',
    value: 'base_price',
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
    value: 'cumulative_deposit_withdrawal',
  },
  {
    label: '일별 입출금액',
    value: 'daily_deposit_withdrawal',
  },
  {
    label: '일손익률(%)',
    value: 'daily_profit_loss_rate',
  },
  {
    label: '누적 수익 금액',
    value: 'cumulative_profit_amount',
  },
  {
    label: '누적 수익률(%)',
    value: 'cumulative_profit_rate',
  },
  {
    label: '현재 자본인하금액',
    value: 'current_capital_reduction_amount',
  },
  {
    label: '현재 자본인하율(%)',
    value: 'current_capital_reduction_rate',
  },
  {
    label: '평균 손익 금액',
    value: 'average_profit_loss_amount',
  },
  {
    label: '평균 손익률',
    value: 'average_profit_loss_rate',
  },
  {
    label: '승률',
    value: 'win_rate',
  },
  {
    label: 'Profit Factor',
    value: 'profit_factor',
  },
  {
    label: 'ROA',
    value: 'roa',
  },
  {
    label: 'totalProfit',
    value: 'total_profit',
  },
  {
    label: 'totalLoss',
    value: 'total_loss',
  },
];

const dailyProfitRate = [-9, 21.52, 7.21, 30, 60, 80.2];
const principal = [1246400, 51587155, 101407866, 100000000, 20000000, 50000000];

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
  border: 1px solid ${theme.colors.gray[300]};
`;

export default ChartSection;
