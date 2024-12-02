export interface SearchedTrader {
  memberId: string;
  nickname: string;
  introduction: string | null;
  fileId: string;
  profilePath: string | null;
  strategyCnt: number;
}

export interface SearchedStrategy {
  strategyId: number;
  tradingTypeIcon: string;
  tradingCycleIcon: string;
  investmentAssetClassesIcon: string[];
  strategyTitle: string;
  cumulativeProfitLossRate: number;
  recentOneYearReturn: number;
  smScore: number;
  followersCount: number;
  mdd: number;
  cumulativeProfitLossRateList: number[];
}

export interface SearchResponse<T> {
  data: T[];
  isLastPage: boolean;
  totalPages: number;
  pageSize: number;
  isSorted: boolean;
  currentPage: number;
  isFirstPage: boolean;
  keyword: string;
  totalElements: number;
  timestamp: string;
}
