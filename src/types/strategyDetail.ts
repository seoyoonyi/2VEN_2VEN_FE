import { InvestmentAssetClass } from '@/mocks/handlers/strategy.handlers';

export interface StrategyDetailProps {
  tradingTypeName: string;
  tradingTypeIcon: string;
  strategyIACEntities: InvestmentAssetClass[];
  tradingCycleName: string;
  tradingCycleIcon: string;
  traderId: string;
  traderName: string;
  traderImage: string;
  strategyId: number;
  strategyTitle: string;
  minInvestmentAmout: string;
  strategyOverview: string;
  followersCount: number;
  writedAt: string;
  isPosted: 'Y' | 'N';
  isGranted: 'Y' | 'N';
}
