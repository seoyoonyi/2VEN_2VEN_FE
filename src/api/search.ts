import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { SearchedStrategy, SearchedTrader, SearchResponse } from '@/types/search';

interface SearchParams {
  keyword: string;
  page?: number;
  pageSize?: number;
}

export const searchTraders = async ({
  keyword,
  page = 0,
  pageSize = 4,
}: SearchParams): Promise<SearchResponse<SearchedTrader>> => {
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.TRADERS, {
    params: {
      keyword,
      page,
      pageSize,
    },
  });
  return data;
};

export const searchStrategies = async ({
  keyword,
  page = 0,
  pageSize = 6,
}: SearchParams): Promise<SearchResponse<SearchedStrategy>> => {
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.STRATEGIES, {
    params: {
      keyword,
      page,
      pageSize,
    },
  });
  return data;
};
