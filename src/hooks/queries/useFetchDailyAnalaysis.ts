import { useQuery } from '@tanstack/react-query';

import { fetchDailyAnalysis } from '@/api/strategyDetail';

const useFetchDailyAnalaysis = (strategyId: number) => {
  const { data } = useQuery({
    queryKey: ['dailyAnalysis', strategyId],
    queryFn: async () => {
      const res = await fetchDailyAnalysis(strategyId);
      return res.data;
    },
    enabled: !!strategyId,
  });

  return { dailyAnalysis: data };
};

export default useFetchDailyAnalaysis;
