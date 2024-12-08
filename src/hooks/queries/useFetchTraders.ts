import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchTraders } from '@/api/trader';
import { SearchedTrader, SearchResponse } from '@/types/search';

export const useFetchTraders = (
  keyword?: string,
  sortOption: 'strategyCnt' | 'latestSignup' = 'strategyCnt',
  options: { page?: number; pageSize?: number } = {}
): UseQueryResult<SearchResponse<SearchedTrader>> => {
  const { page = 0, pageSize = 4 } = options;
  return useQuery({
    queryKey: ['traders', keyword, sortOption, page, pageSize],
    queryFn: async () => fetchTraders({ keyword, sortOption, page, pageSize }),
    enabled: true,
  });
};
