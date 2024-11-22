import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchUploadIconFile, UploadFileProps } from '@/api/uploadFile';

const useIconMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UploadFileProps) => await fetchUploadIconFile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchFile'] });
    },
  });
};

export default useIconMutation;
