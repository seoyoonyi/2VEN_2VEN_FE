import { useQuery } from '@tanstack/react-query';

import { fetchStatistics } from '@/api/strategyDetail';

const useStatistics = (strategyId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['strategyStatistics', strategyId],
    queryFn: async () => {
      const res = await fetchStatistics(strategyId);
      if (!res.data || res.data.length === 0) {
        throw new Error('not fetch statisticsData');
      }
      return res.data[0];
    },
    enabled: !!strategyId,
  });

  const statistics = data?.data;
  const statisticsTime = data?.timestamp;

  return { statistics, statisticsTime, isLoading, isError };
};

export default useStatistics;
