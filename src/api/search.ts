import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import {
  StrategySearchParams,
  SearchedStrategy,
  SearchedTrader,
  SearchResponse,
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

// 추가 검색 조건이 있는 경우 - 상세 검색(전략 검색)
export const searchStrategyDetail = async ({
  keyword,
  page = 0, // 서버는 0-based pagination 사용
  pageSize = 25,
  ...params
}: StrategySearchParams): Promise<SearchResponse<SearchedStrategy>> => {
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.STRATEGIES_DETAIL, {
    params: {
      keyword,
      page: page - 1, // 서버는 0-based pagination 사용
      pageSize,
      ...params, // 추가 검색 조건(상세 필터 체크박스값들)
    },
  });
  return data;
};
