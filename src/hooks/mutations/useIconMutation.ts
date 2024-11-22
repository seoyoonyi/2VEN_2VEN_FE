import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchFileUrl, fetchUploadIconFile, UploadFileProps } from '@/api/uploadFile';

const useIconMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UploadFileProps) => await fetchUploadIconFile(data),
    onSuccess: async (res) => {
      const id = res?.fileId;
      if (id) {
        const fileUrl = await fetchFileUrl(id);
      }
      queryClient.invalidateQueries({ queryKey: ['fetchFile'] });
    },
  });
};

export default useIconMutation;
