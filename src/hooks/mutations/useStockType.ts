import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  fetchPostInvestmentType,
  fetchDeleteInvestmentType,
  fetchPutInvestmentType,
} from '@/api/stockType';
import { fetchDeleteIcon } from '@/api/uploadFile';
import { InvestmentAssetProps } from '@/types/admin';

export const usePostInvestmentAssets = () => {
  const queryClient = useQueryClient();

  return useMutation<{ msg: string }, Error, InvestmentAssetProps>({
    mutationFn: (data: InvestmentAssetProps) => fetchPostInvestmentType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investmentTypes'] });
    },
  });
};

export const usePutInvestmentAssets = () => {
  const queryClient = useQueryClient();

  return useMutation<{ msg: string }, Error, InvestmentAssetProps>({
    mutationFn: (data: InvestmentAssetProps) => fetchPutInvestmentType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investmentTypes'] });
    },
  });
};

export const useDeleteInvestmentAssets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      investmentTypeId,
      role,
      fileUrl,
    }: {
      investmentTypeId: number;
      role: string | null;
      fileUrl: string;
    }) => {
      await fetchDeleteInvestmentType(investmentTypeId, role, fileUrl);

      if (fileUrl) {
        await fetchDeleteIcon(role, fileUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investmentTypes'] });
    },
  });
};
