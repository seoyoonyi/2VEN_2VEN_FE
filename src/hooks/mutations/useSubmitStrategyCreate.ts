import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { submitStrategyCreate } from '@/api/strategyCreate';
import { useStrategyFormStore } from '@/stores/strategyFormStore';
import { StrategyPayload, SubmitStrategyResponse } from '@/types/strategyForm';

export const useSubmitStrategyCreate = () => {
  const { clearForm } = useStrategyFormStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<SubmitStrategyResponse, Error, StrategyPayload>({
    mutationFn: (payload: StrategyPayload) => submitStrategyCreate(payload),
    onSuccess: (data: SubmitStrategyResponse) => {
      console.log('전략 등록 성공:', data);
      clearForm();
      navigate('/strategies/1');
      window.scrollTo(0, 0);
      queryClient.invalidateQueries({ queryKey: ['strategyList'] });
    },
    onError: (error: Error) => {
      console.error('전략 등록 실패:', error);
    },
  });
};
