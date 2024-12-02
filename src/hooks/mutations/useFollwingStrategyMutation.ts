import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitFolderName, updateFolderName } from '@/api/folders';

// 폴더 등록
export const useSubmitFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitFolderName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['followingFolderList'],
      });
      console.log('folder submit success');
    },
    onError: (error) => {
      console.error('Failed to create folder:', error.message);
    },
  });
};

export const useUpdateFolderName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFolderName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['followingFolderList'],
      });
      console.log('folder update success');
    },
    onError: (error) => {
      console.error('Failed to update folder name:', error.message);
    },
  });
};
