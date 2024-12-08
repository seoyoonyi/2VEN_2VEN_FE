import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { SearchedTrader, SearchResponse } from '@/types/search';

interface SearchParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
  sortOption?: 'strategyCnt' | 'latestSignup';
}

export const fetchTraders = async ({
  keyword, // 옵셔널
  page = 0,
  pageSize = 4,
  sortOption = 'strategyCnt', // 기본값
}: SearchParams): Promise<SearchResponse<SearchedTrader>> => {
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.TRADERS, {
    params: {
      ...(keyword && { keyword }), // keyword가 있을 때만 포함
      page,
      pageSize,
      sortOption,
    },
  });
  return data;
};
