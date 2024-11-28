import { useQuery } from '@tanstack/react-query';

import { fetchTradingTypeDetail } from '@/api/tradingType';
import { UserRole } from '@/types/route';

export const useFetchDetailTradingType = (id: number, role: UserRole | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ['tradingTypeDetail', id],
    queryFn: async () => {
      try {
        const res = await fetchTradingTypeDetail(id, role);
        return {
          tradingDetail: res.data,
          iconName: res.displayName,
        };
      } catch (err) {
        console.error('Error fetching trading types:', err);
        throw err;
      }
    },
    enabled: !!id,
  });

  return { tradingDetail: data?.tradingDetail, iconName: data?.iconName, isLoading };
};
