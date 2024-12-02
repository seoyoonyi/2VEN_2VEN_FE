import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchMonthlyAnalysis } from '@/api/strategyDetail';

const useFetchMonthlyAnalysis = (strategyId: number, page: number, pageSize: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['monthlyAnalysis', strategyId, page, pageSize],
    queryFn: async () => {
      const res = await fetchMonthlyAnalysis(strategyId, page, pageSize);
      if (!strategyId) {
        throw new Error('Invalid monthlyAnalysis');
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
    placeholderData: keepPreviousData,
  });

  return {
    monthlyAnalysis: data?.analysis,
    currentPage: data?.pagination.currentPage,
    totalPages: data?.pagination.totalPages,
    pageSize: data?.pagination.pageSize,
    isLoading,
  };
};

export default useFetchMonthlyAnalysis;
