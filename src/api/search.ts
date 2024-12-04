import { isAxiosError } from 'axios';

import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import {
  StrategySearchParams,
  SearchedStrategy,
  SearchedTrader,
  SearchResponse,
  StrategyDetailResponse,
} from '@/types/search';

interface SearchParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
  sortOption?: 'strategyCnt' | 'latestSignup';
}

// 키보드 입력에 따른 '전체 트레이더' 검색 결과를 보여주는 경우 - 트레이더 검색
export const searchTraders = async ({
  keyword,
  page = 0,
  pageSize = 4,
  sortOption = 'strategyCnt', // 기본값
}: SearchParams): Promise<SearchResponse<SearchedTrader>> => {
  console.log('Search Parameters:', { keyword, page, pageSize, sortOption });
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.TRADERS, {
    params: {
      keyword,
      page,
      pageSize,
      sortOption,
    },
  });
  return data;
};

// 키보드 입력에 따른 '전체 전략' 검색 결과를 보여주는 경우 - 전략 검색
export const searchStrategies = async ({
  keyword,
  page = 0,
  pageSize = 6, // 기본값은 6으로 유지 (전체 검색 결과 페이지용)
}: SearchParams): Promise<SearchResponse<SearchedStrategy>> => {
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.STRATEGIES, {
    params: {
      keyword,
      page,
      pageSize,
    },
  });
  return data;
};

// 전략 상세 검색 API 호출 함수 - 검색파라미터 전달
export const searchStrategyDetail = async ({
  keyword,
  page = 1, // 기본값은 1로 유지 (상세 검색 결과 페이지용)
  pageSize = 25,
  ...params
}: StrategySearchParams): Promise<StrategyDetailResponse> => {
  try {
    // 배열 파라미터를 쉼표로 구분된 문자열로 변환하여 전달
    const formattedParams = {
      keyword,
      page: page - 1, // 서버는 0-based pagination 사용하므로 page - 1
      pageSize,
      // 배열 타입의 파라미터는, 쉼표로 구분된 문자열로 변환하여 전달
      ...(params.investmentAssetClassesList?.length && {
        investmentAssetClassesList: params.investmentAssetClassesList.join(','),
      }),
      ...(params.strategyOperationStatusList?.length && {
        strategyOperationStatusList: params.strategyOperationStatusList.join(','),
      }),
      ...(params.tradingTypeList?.length && {
        tradingTypeList: params.tradingTypeList.join(','),
      }),
      ...(params.operatingDaysList?.length && {
        operatingDaysList: params.operatingDaysList.join(','),
      }),
      ...(params.tradingCycleList?.length && {
        tradingCycleList: params.tradingCycleList.join(','),
      }),
      ...(params.returnRateList?.length && {
        returnRateList: params.returnRateList.join(','),
      }),
      ...params, // 나머지 파라미터는 그대로 전달
    };
    const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.STRATEGIES_DETAIL, {
      params: formattedParams,
    });

    return data;
  } catch (error) {
    // 에러 처리
    if (isAxiosError(error)) {
      const errorData = error.response?.data as Error;

      switch (error.response?.status) {
        case 400:
          throw new Error('잘못된 요청입니다');
        case 401:
          throw new Error('로그인이 필요합니다');
        case 405:
          throw new Error('잘못된 요청 방식입니다');
        default:
          throw new Error(errorData.message || '서버 오류가 발생했습니다');
      }
    }
    throw error;
  }
};
