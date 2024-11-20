import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  fetchPostTradingType,
  fetchPutTradingType,
  fetchDeleteTradingType,
} from '@/api/tradingType';
import { TradingTypeProps } from '@/types/admin';

export const useAddTradingType = () => {
  const queryClient = useQueryClient();

  return useMutation<{ msg: string; timestamp: string }, Error, TradingTypeProps>({
    mutationFn: (data: TradingTypeProps) => fetchPostTradingType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tradingTypes'] });
    },
  });
};

export const usePutTradingType = () => {
  const queryClient = useQueryClient();

  return useMutation<{ msg: string; timestamp: string }, Error, TradingTypeProps>({
    mutationFn: (data: TradingTypeProps) => fetchPutTradingType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tradingTypes'] });
    },
  });
};

export const useDeleteTradingType = () => {
  const queryClient = useQueryClient();

  return useMutation<{ msg: string; timestamp: string }, Error, number>({
    mutationFn: (data: number) => fetchDeleteTradingType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tradingTypes'] });
    },
  });
};
