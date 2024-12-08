import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { searchStrategies, searchStrategyDetail, searchTraders } from '@/api/search';
import {
  SearchedDetailStrategy,
  SearchedStrategy,
  SearchedTrader,
  SearchResponse,
  StrategySearchParams,
} from '@/types/search';

export const useSearchTraders = (
  keyword?: string,
  options: {
    page?: number;
    pageSize?: number;
    sortOption?: 'strategyCnt' | 'latestSignup' | 'followerCnt';
    enabled?: boolean;
  } = {}
): UseQueryResult<SearchResponse<SearchedTrader>> => {
  const { page = 0, pageSize = 4, sortOption, enabled = false } = options;

  return useQuery({
    queryKey: ['traders', keyword, page, pageSize, sortOption],
    queryFn: async () => searchTraders({ keyword, page, pageSize, sortOption }),
    enabled: !!keyword && enabled,
  });
};

export const useSearchStrategies = (
  keyword: string,
  options: { page?: number; pageSize?: number; enabled?: boolean } = {}
): UseQueryResult<SearchResponse<SearchedStrategy>> => {
  const { page = 0, pageSize = 6, enabled = false } = options;

  return useQuery({
    queryKey: ['strategies', keyword, page, pageSize],
    queryFn: async () => searchStrategies({ keyword, page, pageSize }),
    enabled: !!keyword && enabled,
  });
};

// 전략 상세 검색을 위한 React Query 훅
// params 검색 파라미터 (keyword는 필수값)
// query 결과 객체✨ 반환
export const useSearchStrategyDetail = (params: StrategySearchParams) =>
  useQuery<SearchResponse<SearchedDetailStrategy>, Error>({
    queryKey: ['searchStrategyDetail', params], // params 전체를 queryKey로 사용
    queryFn: () => searchStrategyDetail(params),
    enabled: !!params.keyword, // params.keyword가 있을 때만 실행
    placeholderData: (previousData) => previousData, // 이전 데이터 유지(페이지네이션 UX를 위해)
    staleTime: 5 * 60 * 1000, // 5분 (캐시 시간 설정)
    throwOnError: true, // 에러 발생시 컴포넌트에 에러를 던짐
    retry: false, // 재시도 없음
  });
// 사용 예시:
/*
const { data, isLoading, error } = useSearchStrategyDetail({
  keyword: "검색어",
  page: 1,
  pageSize: 25,
  investmentAssetClassesList: [1, 2],
  // ... 기타 필터 파라미터
});
*/
