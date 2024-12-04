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

export interface StrategySearchParams {
  keyword: string;
  page?: number;
  pageSize?: number;
  investmentAssetClassesList?: number[];
  strategyOperationStatusList?: string[];
  tradingTypeList?: number[];
  operatingDaysList?: number[];
  tradingCycleList?: number[];
  minInvestmentAmount?: number;
  maxInvestmentAmount?: number;
  minPrincipal?: number;
  maxPrincipal?: number;
  minSmscore?: number;
  maxSmscore?: number;
  minMdd?: number;
  maxMdd?: number;
  startDate?: string;
  endDate?: string;
  returnRateList?: number[];
}
