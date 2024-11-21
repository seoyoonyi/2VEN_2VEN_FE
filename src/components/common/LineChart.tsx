import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import theme from '@/styles/theme';

interface LineChartProps {
  data: number[];
  size: 'sm' | 'md';
  colorTheme: 'primary' | 'secondary';
}

Highcharts.setOptions({
  credits: {
    enabled: false,
  },
});

const sizes = {
  sm: { width: 200, height: 106 },
  md: { width: 262, height: 170 },
};

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

const LineChart = ({ data, size, colorTheme }: LineChartProps) => {
  const selectedColors = colors[colorTheme];
  const maxValue = Math.max(...data);

  const options = {
    chart: {
      type: 'spline',
      width: sizes[size].width,
      height: sizes[size].height,
      backgroundColor: 'white',
      margin: [0, 0, 0, 0],
    },
    title: {
      text: '',
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: '',
      },
      tickPositions: [0, maxValue / 2, (maxValue * 2) / 2, maxValue],
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: 'area',
        data,
        lineWidth: 2,
        linecap: 'round',
        lineColor: selectedColors.lineColor,
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, selectedColors.middleColor],
            [0.2, selectedColors.fillColor],
            [1, theme.colors.main.white],
          ],
        },
        states: {
          hover: { enabled: false },
        },
      },
    ],
    tooltip: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
