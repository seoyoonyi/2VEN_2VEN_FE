import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import theme from '@/styles/theme';

interface LineChartProps {
  lineData: { label: string; data: number[] }[];
  areaData: { label: string; data: number[] }[];
}

Highcharts.setOptions({
  credits: {
    enabled: false,
  },
});

const colors = {
  primary: {
    lineColor: theme.colors.main.primary,
    middleColor: theme.colors.teal[100],
    fillColor: theme.colors.teal[200],
  },
  secondary: {
    lineColor: '#EE9D1A',
    middleColor: '#FFC90A',
    fillColor: '#FFDB5E',
  },
};

const StrategyChart = ({ lineData, areaData }: LineChartProps) => {
  const options = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      width: 900,
      zooming: {
        mouseWheel: {
          enabled: true,
        },
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      visible: false,
    },
    yAxis: [
      {
        labels: {
          style: { color: colors.primary.fillColor },
        },
        title: {
          enabled: false,
        },
        gridLineWidth: 1,
        opposite: false,
      },
      {
        labels: {
          style: { color: colors.primary.lineColor },
        },
        title: {
          enabled: false,
        },
        gridLineWidth: 1,
        opposite: true,
      },
    ],
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      ...areaData.map((dataItem) => ({
        type: 'areaspline',
        name: dataItem.label,
        data: dataItem.data,
        lineWidth: 0,
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [1, colors.primary.middleColor],
            [1, colors.primary.fillColor],
            [1, theme.colors.main.white],
          ],
        },
        states: {
          hover: { enabled: false },
        },
        Tooltip: {
          pointFormat: `
                <b>{point.x}</b><br/>
                ${dataItem.label}: {point.y}원
              `,
        },
        yAxis: 0,
      })),
      ...lineData.map((item) => ({
        type: 'spline',
        name: item.label,
        data: item.data,
        lineWidth: 2,
        color: colors.primary.lineColor,
        yAxis: 1,
        tooltip: {
          pointFormat: `
              <b>{point.x}</b><br/>
              ${item.label}: {point.y}%
            `,
        },
      })),
    ],
    tooltip: {
      shared: true,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StrategyChart;
