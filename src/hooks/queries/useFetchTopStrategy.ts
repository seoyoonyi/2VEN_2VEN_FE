import { useQuery } from '@tanstack/react-query';

import { fetchStrategies, RankingData } from '@/api/home/topStrategyRank';

export const useFetchTopStrategy = () =>
  useQuery<RankingData[], Error>({
    queryKey: ['topStrategies'],
    queryFn: fetchStrategies,
  });
