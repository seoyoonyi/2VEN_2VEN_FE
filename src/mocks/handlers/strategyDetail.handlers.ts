import { http, HttpResponse } from 'msw';

export const strategyData = [
  {
    tradingTypeName: '하이브리드',
    tradingTypeIcon: '/src/assets/images/producttype_futures.png',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 4,
        investmentAssetClassesName: '국내ETF',
        investmentAssetClassesIcon: '/src/assets/images/producttype_futures.png',
      },
      {
        investmentAssetClassesId: 5,
        investmentAssetClassesName: '해외ETF',
        investmentAssetClassesIcon: '/src/assets/images/producttype_futures.png',
      },
    ],
    tradingCycleName: '포지션',
    tradingCycleIcon: '/src/assets/images/producttype_futures.png',
    strategyId: 1,
    strategyTitle: '남들살때 따라사는 전략 1',
    strategyOverview: '남들살때 따라사는 전략입니다. 1',
    followersCount: 10,
    writedAt: '2024-11-15T21:45:43.879864',
    isPosted: 'Y',
    isGranted: 'Y',
  },
  {
    tradingTypeName: '롱텀',
    tradingTypeIcon: '/src/assets/images/producttype_futures.png',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 6,
        investmentAssetClassesName: '채권ETF',
        investmentAssetClassesIcon: '/src/assets/images/producttype_futures.png',
      },
      {
        investmentAssetClassesId: 7,
        investmentAssetClassesName: '미국주식',
        investmentAssetClassesIcon: '/src/assets/images/producttype_futures.png',
      },
    ],
    tradingCycleName: '단기',
    tradingCycleIcon: '이미지링크3',
    strategyId: 2,
    strategyTitle: '롱텀 투자 전략',
    strategyOverview: '장기적인 관점에서의 투자 전략',
    followersCount: 15,
    writedAt: '2024-11-14T15:00:10.234001',
    isPosted: 'N',
    isGranted: 'N',
  },
  {
    tradingTypeName: '단기매매',
    tradingTypeIcon: '이미지링크3',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 8,
        investmentAssetClassesName: '국내주식',
        investmentAssetClassesIcon: '이미지링크3-1',
      },
      {
        investmentAssetClassesId: 9,
        investmentAssetClassesName: '선물ETF',
        investmentAssetClassesIcon: '이미지링크3-2',
      },
    ],
    tradingCycleName: '1일',
    tradingCycleIcon: '이미지링크4',
    strategyId: 3,
    strategyTitle: '단기매매 전략',
    strategyOverview: '하루 단위로 매매하는 전략입니다.',
    followersCount: 5,
    writedAt: '2024-11-13T10:30:20.234001',
    isPosted: 'Y',
    isGranted: 'Y',
  },
  {
    tradingTypeName: '위험분산',
    tradingTypeIcon: '이미지링크4',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 10,
        investmentAssetClassesName: '부동산ETF',
        investmentAssetClassesIcon: '이미지링크4-1',
      },
      {
        investmentAssetClassesId: 11,
        investmentAssetClassesName: '원자재ETF',
        investmentAssetClassesIcon: '이미지링크4-2',
      },
    ],
    tradingCycleName: '중기',
    tradingCycleIcon: '이미지링크5',
    strategyId: 4,
    strategyTitle: '위험분산 전략',
    strategyOverview: '위험을 분산하여 투자하는 전략입니다.',
    followersCount: 8,
    writedAt: '2024-11-12T09:20:10.123456',
    isPosted: 'N',
    isGranted: 'Y',
  },
  {
    tradingTypeName: '포트폴리오',
    tradingTypeIcon: '이미지링크5',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 12,
        investmentAssetClassesName: '해외채권',
        investmentAssetClassesIcon: '이미지링크5-1',
      },
      {
        investmentAssetClassesId: 13,
        investmentAssetClassesName: '유로존주식',
        investmentAssetClassesIcon: '이미지링크5-2',
      },
    ],
    tradingCycleName: '장기',
    tradingCycleIcon: '이미지링크6',
    strategyId: 5,
    strategyTitle: '포트폴리오 투자 전략',
    strategyOverview: '장기적인 투자 관점에서 포트폴리오를 구성하는 전략.',
    followersCount: 25,
    writedAt: '2024-11-11T08:10:00.789654',
    isPosted: 'Y',
    isGranted: 'N',
  },
];

export const strategyDetailHandlers = [
  //전략 기본 정보 조회 핸들러
  http.get('/api/strategy-list/:id', ({ request, params }) => {
    const paramsId = parseInt(params.id[0], 10);
    const authHeader = request.headers.get('Auth');
    if (authHeader !== 'admin') {
      return HttpResponse.json(
        {
          errorType: 'HttpRequestMethodNotSupportedException',
          timestamp: new Date().toISOString(),
          message: '호출 메서드가 잘못되었습니다.',
          error: 'METHOD_NOT_ALLOWED',
        },
        { status: 401 }
      );
    }
    const strategy = strategyData.find((data) => data.strategyId === paramsId);
    if (strategy) {
      return HttpResponse.json({ data: strategy }, { status: 200 });
    }
    return HttpResponse.json({ error: '전략을 찾을 수 없습니다.' }, { status: 404 });
  }),
];
