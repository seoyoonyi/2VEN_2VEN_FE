import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { searchStrategies, searchStrategyDetail, searchTraders } from '@/api/search';
import {
  SearchedStrategy,
  SearchedTrader,
  SearchResponse,
  StrategySearchParams,
} from '@/types/search';

export const useSearchTraders = (
  keyword: string,
  sortOption: 'strategyCnt' | 'latestSignup' = 'strategyCnt'
): UseQueryResult<SearchResponse<SearchedTrader>> => {
  console.log('useSearchTraders Hook Parameters:', { keyword, sortOption });
  return useQuery({
    queryKey: ['traders', keyword, sortOption],
    queryFn: async () => searchTraders({ keyword }),
    enabled: !!keyword,
  });
};

export const useSearchStrategies = (
  keyword: string,
  options: { page?: number; pageSize?: number } = {}
): UseQueryResult<SearchResponse<SearchedStrategy>> => {
  const { page = 0, pageSize = 6 } = options;
  return useQuery({
    queryKey: ['strategies', keyword, page, pageSize],
    queryFn: async () => searchStrategies({ keyword, page, pageSize }),
    enabled: !!keyword,
  });
};

export const useSearchStrategyDetail = (
  keyword: string,
  page: number,
  params: Partial<StrategySearchParams> // 추가 검색 조건
) =>
  useQuery({
    queryKey: ['strategyDetail', keyword, page, params],
    queryFn: async () => searchStrategyDetail({ keyword, page, ...params }),
    enabled: !!keyword,
    placeholderData: (previousData) => previousData, // 페이지 전환 시 이전 데이터 유지
  });
