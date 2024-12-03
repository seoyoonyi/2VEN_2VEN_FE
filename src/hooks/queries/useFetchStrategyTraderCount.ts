import { useQuery } from '@tanstack/react-query';

import { fetchTraderStats, TraderStatsParams } from '@/api/home/traderStats';

export const useFetchStrategyTraderCount = () =>
  useQuery<TraderStatsParams>({
    queryKey: ['strategyTraderCount'],
    queryFn: async () => {
      const res = await fetchTraderStats();
      if (!res.traderCnt || !res.strategyCnt) {
        throw new Error('Invalid trader or strategy count data');
      }
      return res;
    },
    staleTime: 5 * 60 * 1000,
  });
