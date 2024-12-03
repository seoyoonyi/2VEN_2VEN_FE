import { useQuery } from '@tanstack/react-query';

import { fetchStrategies, RankingData } from '@/api/home/topStrategyList';

export const useFetchTopStrategy = () =>
  useQuery<RankingData[], Error>({
    queryKey: ['strategies'],
    queryFn: fetchStrategies,
  });
