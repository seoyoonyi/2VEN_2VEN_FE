import { useQuery } from '@tanstack/react-query';

import { fetchApproveStrategy } from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

export const useFetchApproveState = (strategyId: number, role: UserRole) => {
  const { data } = useQuery({
    queryKey: ['approveStrategy', strategyId, role],
    queryFn: async () => {
      const res = await fetchApproveStrategy(strategyId, role);
      return res.data;
    },
    enabled: !!strategyId,
  });

  return { data };
};
