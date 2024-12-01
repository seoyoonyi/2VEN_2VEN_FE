import { useQuery } from '@tanstack/react-query';

import { fetchStrategyList } from '@/api/strategy';

type FetchStrategyListParams = {
  tradingCycleId?: number;
  investmentAssetClassesId?: number;
  page: number;
  pageSize: number;
};

const useFetchStrategyList = (params: FetchStrategyListParams) =>
  useQuery({
    queryKey: ['strategyList', params],
    queryFn: async () => {
      try {
        const response = await fetchStrategyList(params);
        return response;
      } catch (error) {
        console.error('Error fetching strategy list:', error);
        throw error;
      }
    },
    enabled: !!params,
  });

export default useFetchStrategyList;
