import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { fetchDefaultStrategyDetail } from '@/api/strategyDetail';
import { ROUTES } from '@/constants/routes';

const useFetchStrategyDetail = (strategyId: string) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['strategyDetail', strategyId],
    queryFn: async () => {
      const res = await fetchDefaultStrategyDetail(Number(strategyId));
      if (!res.data || !res.data.strategyTitle) {
        throw new Error('Invalid strategy data');
      }
      return res.data;
    },
    enabled: !!strategyId,
    retry: 1,
  });

  if (!strategyId || isError) {
    navigate(ROUTES.ERROR.NOT_FOUND);
    return { isError: true };
  }

  return { strategy: data, isLoading, isError };
};

export default useFetchStrategyDetail;
