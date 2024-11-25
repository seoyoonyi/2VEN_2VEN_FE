import { useQuery } from '@tanstack/react-query';

import { fetchDefaultStrategyDetail } from '@/api/strategyDetail';

const useFetchStrategyDetail = (strategyId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['strategyDetail', strategyId],
    queryFn: async () => {
      const res = await fetchDefaultStrategyDetail(Number(strategyId));
      if (!res.data || !res.data.strategyTitle) {
        throw new Error('Invalid strategy data');
      }
      return res.data;
    },
    enabled: !!strategyId,
    retry: 1,
  });

  if (!strategyId || isError) {
    return { isError: true };
  }

  return { strategy: data, isLoading, isError };
};

export default useFetchStrategyDetail;
