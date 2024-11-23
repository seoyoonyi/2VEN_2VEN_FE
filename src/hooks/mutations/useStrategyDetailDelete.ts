import { useQueryClient, useMutation } from '@tanstack/react-query';

import { fetchDeleteStrategyDetail } from '@/api/strategyDetail';

const useStrategyDetailDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<{ msg: string }, Error, number>({
    mutationFn: (data: number) => fetchDeleteStrategyDetail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategyDetail'] });
    },
  });
};

export default useStrategyDetailDelete;
