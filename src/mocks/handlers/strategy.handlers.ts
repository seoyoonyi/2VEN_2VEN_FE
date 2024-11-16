import { http, HttpResponse } from 'msw';

import futureIcon from '@/assets/images/producttype_futures.png';
import StockIcon from '@/assets/images/producttype_stock.png';
import TradeTypeIcon from '@/assets/images/tradetype_H.png';
import CycleIcon from '@/assets/images/tradetype_P.png';

// 매매유형
export interface TradingType {
  tradingTypeId: number;
  tradingTypeName: string;
  tradingTypeIcon: string;
}

// 상품유형
export interface InvestmentAssetClass {
  investmentAssetClassesId: number;
  investmentAssetClassesName: string;
  investmentAssetClassesIcon: string;
}

// 주기
export interface TradingCycleClass {
  tradingCycleId: number;
  tradingCycleName: string;
  tradingTypeIcon: string;
}

const tradingTypes = ['자동', '반자동(하이브리드)', '수동(매뉴얼)'];

const products = [
  '국내주식',
  '국내지수 옵션',
  '국내 ETF',
  '국내지수 선물',
  '국내상품 선물',
  'F/X',
  '해외주식',
  '해외주식 옵션',
  '해외 ETF',
  '해외지수 선물',
  '해외상품 선물',
];

// 투자자산 분류 데이터
const investmentAssetClassesRegistrationDtoList: InvestmentAssetClass[] = products.map(
  (product, idx) => ({
    investmentAssetClassesId: idx + 1,
    investmentAssetClassesName: product,
    investmentAssetClassesIcon: TradeTypeIcon,
  })
);

// 매매유형 데이터
const tradingTypeRegistrationDtoList: TradingType[] = tradingTypes.map((type, idx) => ({
  tradingTypeId: idx + 1,
  tradingTypeName: type,
  tradingTypeIcon: StockIcon,
}));

// 운용주기 데이터
const tradingCycleRegistrationDtoList: TradingCycleClass[] = [
  {
    tradingCycleId: 1,
    tradingCycleName: '데이',
    tradingTypeIcon: CycleIcon,
  },
  {
    tradingCycleId: 2,
    tradingCycleName: '포지션',
    tradingTypeIcon: CycleIcon,
  },
];

export const strategyHandlers = [
  http.get('/api/strategy', () => {
    // 전략 목록 조회 핸들러 로직
  }),

  // 전략 등록 조회 핸들러 로직
  http.get(`/api/strategies/registration-form`, ({ request }) => {
    const authHeader = request.headers.get('Auth');
    if (authHeader !== 'trader') {
      return HttpResponse.json(
        {
          errorType: 'UnauthorizedException',
          timestamp: new Date().toISOString(),
          message: 'Unauthorized access. Auth header must be "trader".',
          error: 'UNAUTHORIZED',
        },
        { status: 401 }
      );
    }

    const response = {
      data: {
        tradingTypeRegistrationDtoList,
        investmentAssetClassesRegistrationDtoList,
        tradingCycleRegistrationDtoList,
      },
      timestamp: new Date().toISOString(),
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  // 전략 등록 핸들러 로직
  http.post('/api/strategy', async ({ request }) => {}),
];
