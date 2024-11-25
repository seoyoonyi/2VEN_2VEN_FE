import { http, HttpResponse } from 'msw';

const statisticsData = [
  {
    data: {
      balance: '896,217,437',
      cumulative_dep_wd_price: '866,217,437',
      principal: '238,704,360',
      operationPeriod: '2년 4월',
      startDate: '2012-10-11',
      endDate: '2015-03-11',
      cumulativeProfitLoss: '247,525,031',
      cumulativeProfitLossRate: '49.24%',
      maxCumulativeProfitLoss: '247,525,031',
      maxCumulativeProfitLossRatio: '49.24%',
      currentDrawdownAmount: '-54,632,778',
      currentDrawdownRate: '0%',
      maxDrawdownAmount: '-54,632,778',
      maxDrawdownRate: '-13.96%',
      unrealizedProfitLoss: '336,311',
      averageProfitLossRate: '336,311',
      maxDailyProfit: '25,257,250',
      maxDailyProfitRate: '25,257,250',
      maxDailyLoss: '-17,465,050',
      maxDailyLossRate: '-17,465,050',
      tradingDays: '736일',
      totalProfitDays: '508일',
      totalLossDays: '228일',
      currentConsecutivePlDays: '6일',
      maxConsecutiveProfitDays: '22일',
      maxConsecutiveLossDays: '6일',
      winRate: '69%',
      daysSincePeak: '0일',
      profitFactor: '1.48',
      roa: '453',
    },
    timestamp: '2024-11-18T00:32:37.430444Z',
  },
];

export const statisticsHandlers = [
  http.get('/api/strategies/:strategyId/statistics', async ({ params, request }) => {
    const strategyId = parseInt(params.strategyId[0], 10);
    const authHeader = request.headers.get('Auth');
    if (authHeader !== 'admin') {
      return HttpResponse.json(
        {
          errorType: 'HttpRequestMethodNotSupportedException',
          timestamp: new Date().toISOString(),
          message: '잘못된 요청입니다.',
          error: 'HEADER_NOT_ALLOWED',
        },
        { status: 400 }
      );
    }
    if (strategyId) {
      return HttpResponse.json({ data: statisticsData }, { status: 200 });
    }
    return HttpResponse.json({ error: '통계데이터를 찾을 수 없습니다.' }, { status: 404 });
  }),
];
