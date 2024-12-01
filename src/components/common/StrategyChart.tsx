import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import theme from '@/styles/theme';

interface LineChartProps {
  lineData: number[];
  areaData: number[];
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

const MAX_ACOUNT = 1000000000;

const StrategyChart = ({ lineData, areaData }: LineChartProps) => {
  const maxAreaValue = Math.max(...areaData);
  const minAreaValue = Math.min(...areaData);
  const maxLineValue = Math.max(...lineData);

  const maxArea = maxAreaValue > MAX_ACOUNT ? MAX_ACOUNT : maxAreaValue;
  const minArea = minAreaValue < 0 ? 0 : minAreaValue;

  const options = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      width: 900,
      zoomType: 'x',
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
      enabled: false,
    },
    yAxis: [
      {
        labels: {
          style: { color: colors.secondary.middleColor },
        },
        title: {
          text: 'price(원)',
        },
        max: maxArea,
        min: minArea,
        gridLineWidth: 1,
        opposite: false,
      },
      {
        labels: {
          style: { color: colors.primary.lineColor },
        },
        title: {
          text: 'percentage(%)',
        },
        max: maxLineValue,
        gridLineWidth: 1,
        opposite: true,
      },
    ],
    legend: {
      enabled: false,
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
      {
        type: 'areaspline',
        name: 'price',
        data: areaData,
        lineWidth: 0,
        lineColor: colors.secondary.lineColor,
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, colors.secondary.middleColor],
            [0.1, colors.secondary.fillColor],
            [1, theme.colors.main.white],
          ],
        },
        states: {
          hover: { enabled: false },
        },
        Tooltip: {
          pointFormat: `
        <b>{point.x}</b><br/>
        price: {point.y}원
      `,
        },
        yAxis: 0,
      },
      {
        // 확률 데이터: Line Chart
        type: 'spline',
        name: 'percentage',
        data: lineData,
        lineWidth: 2,
        color: colors.primary.lineColor,
        yAxis: 1,
        tooltip: {
          pointFormat: `
              <b>{point.x}</b><br/>
              percentage: {point.y}%
            `,
        },
      },
    ],
    tooltip: {
      shared: true,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StrategyChart;
