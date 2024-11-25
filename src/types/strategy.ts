import { Option } from '@/components/common/Select';

export interface StrategyData {
  cycles: Option[];
  operations: Option[];
  products: Option[];
}

export interface StrategyPayload {
  strategyTitle: string;
  tradingTypeId: number;
  tradingCycleId: number;
  minInvestmentAmount: string;
  strategyOverview: string;
  isPosted: string;
  investmentAssetClassesIdList: number[];
}

export interface SubmitStrategyResponse {
  msg: string;
  data: {
    Strategy_Id: number;
  };
}

export interface StrategyIacentity {
  investmentAssetClassesId: number;
  investmentAssetClassesName: string;
  investmentAssetClassesIcon: string;
}

export interface StrategyDetailsData {
  tradingTypeName: string;
  tradingTypeIcon: string;
  strategyIACEntities: StrategyIacentity[];
  tradingCycleName: string;
  tradingCycleIcon: string;
  traderId: string;
  traderName: string;
  traderImage: string;
  strategyId: number;
  strategyTitle: string;
  strategyStatusCode: string;
  minInvestmentAmount: string;
  strategyOverview: string;
  followersCount: number;
  writedAt: string;
  isPosted: string;
  isApproved: string;
}
