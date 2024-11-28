import { useQuery } from '@tanstack/react-query';

import { fetchInvestmentTypeDetail } from '@/api/stockType';

export const useFetchDetailInvestmentType = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['tradingTypeDetail', id],
    queryFn: async () => {
      try {
        const res = await fetchInvestmentTypeDetail(id);
        return {
          investmentDetail: res.data,
          investmentIconName: res.displayName,
        };
      } catch (err) {
        console.error('Error fetching trading types:', err);
        throw err;
      }
    },
    enabled: !!id,
  });

  return {
    investmentDetail: data?.investmentDetail,
    iconName: data?.investmentIconName,
    isLoading,
  };
};
