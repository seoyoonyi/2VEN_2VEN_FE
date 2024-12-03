import { useQuery } from '@tanstack/react-query';

import { getSidebarProfile } from '@/api/profile';
import { useAuthStore } from '@/stores/authStore';

export const useSidebarProfileQuery = () => {
  const { user } = useAuthStore();
  const memberId = user?.memberId; // user 객체를 통해 memberId 접근

  return useQuery({
    queryKey: ['sidebarProfile', memberId],
    queryFn: () => getSidebarProfile(memberId as string),
    enabled: !!memberId, // memberId가 있을 때만 쿼리 실행
  });
};
