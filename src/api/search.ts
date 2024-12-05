import { isAxiosError } from 'axios';
import dayjs from 'dayjs';

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
  keyword, // 옵셔널
  page = 0,
  pageSize = 4,
  sortOption = 'strategyCnt', // 기본값
}: SearchParams): Promise<SearchResponse<SearchedTrader>> => {
  console.log('Search Parameters:', { keyword, page, pageSize, sortOption });
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.TRADERS, {
    params: {
      ...(keyword && { keyword }), // keyword가 있을 때만 포함
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
  page = 1,
  pageSize = 25,
  investmentAssetClassesList = [], // 기본값 설정
  strategyOperationStatusList = [],
  tradingTypeList = [],
  operatingDaysList = [],
  tradingCycleList = [],
  returnRateList = [],
  minInvestmentAmount,
  minPrincipal,
  maxPrincipal,
  minSmscore,
  maxSmscore,
  minMdd,
  maxMdd,
  startDate,
  endDate,
}: StrategySearchParams): Promise<StrategyDetailResponse> => {
  try {
    // 필터값이 있는 파라미터만 포함하도록 수정
    const formattedParams: Record<string, string | number> = {
      keyword,
      page: page - 1,
      pageSize,
    };
    // 배열 파라미터 체크
    if (investmentAssetClassesList.length > 0) {
      formattedParams.investmentAssetClassesList = investmentAssetClassesList.join(',');
    }
    if (strategyOperationStatusList.length > 0) {
      formattedParams.strategyOperationStatusList = strategyOperationStatusList.join(',');
    }
    if (tradingTypeList.length > 0) {
      formattedParams.tradingTypeList = tradingTypeList.join(',');
    }
    if (operatingDaysList.length > 0) {
      formattedParams.operatingDaysList = operatingDaysList.join(',');
    }
    if (tradingCycleList.length > 0) {
      formattedParams.tradingCycleList = tradingCycleList.join(',');
    }
    if (returnRateList.length > 0) {
      formattedParams.returnRateList = returnRateList.join(',');
    }

    // 나머지 파라미터
    if (minInvestmentAmount) {
      formattedParams.minInvestmentAmount = minInvestmentAmount;
    }
    if (minPrincipal) formattedParams.minPrincipal = minPrincipal;
    if (maxPrincipal) formattedParams.maxPrincipal = maxPrincipal;
    if (minSmscore) formattedParams.minSmscore = minSmscore;
    if (maxSmscore) formattedParams.maxSmscore = maxSmscore;
    if (minMdd) formattedParams.minMdd = minMdd;
    if (maxMdd) formattedParams.maxMdd = maxMdd;

    // 날짜 파라미터
    if (startDate) {
      formattedParams.startDate = dayjs(startDate).format('YYYY-MM-DD');
    }
    if (endDate) {
      formattedParams.endDate = dayjs(endDate).format('YYYY-MM-DD');
    }

    const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.STRATEGIES_DETAIL, {
      params: formattedParams,
    });
    console.log('✅ API 요청 파라미터:', formattedParams);
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
