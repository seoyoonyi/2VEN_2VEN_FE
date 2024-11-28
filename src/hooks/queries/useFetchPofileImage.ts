import { useQuery } from '@tanstack/react-query';

import { fetchProfileImage } from '@/api/auth';

export const useFetchProfileImage = (fileId: string | null, memberId: string | null) => {
  const query = useQuery({
    queryKey: ['profileImage', fileId, memberId] as const,
    queryFn: async () => {
      if (!fileId || !memberId) {
        console.log('Missing required params:', { fileId, memberId });
        throw new Error('FileId and MemberId are required');
      }

      // API 호출 전 파라미터 확인
      console.log('Attempting to fetch profile image with:', {
        fileId,
        memberId,
        url: `/api/files/profile/${fileId}?uploaderId=${memberId}`,
      });

      return fetchProfileImage({ fileId, memberId });
    },

    retry: false,
    enabled: !!fileId && !!memberId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
  });
  // 데이터와 에러 상태 로깅
  if (query.isError) {
    console.error('Error fetching profile image:', query.error);
  }
  if (query.isSuccess) {
    console.log('Profile image fetched:', query.data);
  }

  return query;
};
