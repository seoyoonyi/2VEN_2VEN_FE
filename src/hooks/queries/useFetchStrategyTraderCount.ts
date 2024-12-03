import { useQuery } from '@tanstack/react-query';

import { fetchTraderStats, TraderStatsParams } from '@/api/traderStats';

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
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터 재검증 생략
    refetchOnWindowFocus: false, // 창 포커스 시 리패치 비활성화
  });
