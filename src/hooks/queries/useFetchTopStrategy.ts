import { useQuery } from '@tanstack/react-query';

import { fetchStrategies, RankingData } from '@/api/home/TopStrategyList';

export const useFetchTopStrategy = () =>
  useQuery<RankingData[], Error>({
    queryKey: ['strategies'], // Query Key는 배열로 설정
    queryFn: fetchStrategies, // Fetcher 함수
  });
