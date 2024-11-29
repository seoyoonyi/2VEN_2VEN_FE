import { useQuery } from '@tanstack/react-query';

import { fetchStatistics } from '@/api/strategyDetail';

const useStatistics = (strategyId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['strategyStatistics', strategyId],
    queryFn: async () => {
      const res = await fetchStatistics(strategyId);
      return {
        statistics: res.data,
        writedAt: res.timestamp,
      };
    },
    enabled: !!strategyId,
  });

  return { statistics: data?.statistics, writedAt: data?.writedAt, isLoading, isError };
};

export default useStatistics;
