import { useQuery } from '@tanstack/react-query';

import { fetchProfileImage } from '@/api/auth';

export const useFetchProfileImage = (fileId: string | null, memberId: string | null) =>
  useQuery({
    queryKey: ['profileImage', fileId, memberId] as const,
    queryFn: async () => {
      if (!fileId || !memberId) {
        return new Error('FileId and MemnerId are required');
      }
      return fetchProfileImage({ fileId, memberId });
    },
    retry: false,
    enabled: !!fileId && !!memberId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
  });
