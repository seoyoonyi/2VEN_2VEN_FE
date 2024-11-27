import { useQueryClient, useMutation } from '@tanstack/react-query';

import { fetchPostDailyAnalysis, fetchPutDailyAnalysis } from '@/api/strategyDetail';
import { DailyAnalysisProps } from '@/types/strategyDetail';

export const usePostDailyAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      strategyId,
      payload,
      authRole,
    }: {
      strategyId: number;
      payload: DailyAnalysisProps[];
      authRole: 'admin' | 'trader';
    }) => fetchPostDailyAnalysis(strategyId, { payload }, authRole),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyAnalysis'] });
    },
  });
};

export const usePutDailyAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      strategyId,
      payload,
      authRole,
      dailyDataId,
    }: {
      strategyId: number;
      payload: DailyAnalysisProps;
      authRole: 'admin' | 'trader';
      dailyDataId: number;
    }) => fetchPutDailyAnalysis(strategyId, payload, authRole, dailyDataId),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyAnalysis'] });
    },
  });
};
