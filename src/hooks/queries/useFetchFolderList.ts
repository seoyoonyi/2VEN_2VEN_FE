import { useQuery } from '@tanstack/react-query';

import { fetchFolderList } from '@/api/folders';

export const useFolderList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['followingFolderList'],
    queryFn: async () => {
      try {
        const { data } = await fetchFolderList();
        return data;
      } catch (error) {
        console.error('failed to fetch following folder list', error);
        throw error;
      }
    },
  });

  return { data, isLoading, isError };
};
