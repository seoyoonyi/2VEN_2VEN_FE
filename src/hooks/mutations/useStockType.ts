import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  fetchPostInvestmentType,
  fetchDeleteInvestmentType,
  fetchPutInvestmentType,
} from '@/api/stockType';
import { fetchDeleteIcon } from '@/api/uploadFile';
import { InvestmentAssetProps } from '@/types/admin';
import { UserRole } from '@/types/route';

export const usePostInvestmentAssets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, role }: { data: InvestmentAssetProps; role: UserRole }) =>
      fetchPostInvestmentType({ ...data, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investmentTypes'] });
    },
  });
};

export const usePutInvestmentAssets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, role }: { data: InvestmentAssetProps; role: UserRole }) =>
      fetchPutInvestmentType({ ...data, role }),
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
      role: UserRole;
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
