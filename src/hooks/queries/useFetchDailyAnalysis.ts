import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchDailyAnalysis } from '@/api/strategyDetail';

const useFetchDailyAnalysis = (strategyId: number, page: number, pageSize: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['dailyAnalysis', strategyId, page, pageSize],
    queryFn: async () => {
      const res = await fetchDailyAnalysis(strategyId, page, pageSize);
      if (!strategyId) {
        throw new Error('Invalid DailyAnalysis');
      }
      return {
        analysis: res.data,
        pagination: {
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          totalElements: res.totalElements,
        },
        time: res.timestamp,
      };
    },
    enabled: !!strategyId,
  });

  return {
    dailyAnalysis: data?.analysis,
    currentPage: data?.pagination.currentPage,
    totalPages: data?.pagination.totalPages,
    pageSize: data?.pagination.pageSize,
    isLoading,
  };
};

export default useFetchDailyAnalysis;
