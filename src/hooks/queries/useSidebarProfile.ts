import { useQuery } from '@tanstack/react-query';

import { getSidebarProfile } from '@/api/profile';
import { useAuthStore } from '@/stores/authStore';

export const useSidebarProfileQuery = (id?: string) => {
  const { user } = useAuthStore();
  const memberId = user?.memberId;

  return useQuery({
    queryKey: ['personalDetails', memberId, id],
    queryFn: () => (id ? getSidebarProfile(id) : getSidebarProfile(memberId as string)),
    enabled: !!memberId,
  });
};
