import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { searchStrategies, searchTraders } from '@/api/search';
import { SearchedStrategy, SearchedTrader, SearchResponse } from '@/types/search';

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
  keyword: string
): UseQueryResult<SearchResponse<SearchedStrategy>> =>
  useQuery({
    queryKey: ['strategies', keyword],
    queryFn: async () => searchStrategies({ keyword }),
    enabled: !!keyword,
  });
