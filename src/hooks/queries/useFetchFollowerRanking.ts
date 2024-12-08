import { useQuery } from '@tanstack/react-query';

import { fetchFollowerRanking } from '@/api/home/followRanking';

export const useFetchFollowerRanking = (size: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['followerRanking', size],
    queryFn: async () => {
      try {
        return await fetchFollowerRanking(size);
      } catch (error) {
        console.error('failed to fetch follower ranking', error);
        throw error;
      }
    },
  });

  return { data, isLoading, isError };
};
