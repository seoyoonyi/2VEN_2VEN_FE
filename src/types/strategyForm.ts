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
  id: number;
}
