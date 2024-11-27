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
  minInvestmentAmount: string;
  strategyOverview: string;
  followersCount: number;
  writedAt: string;
  isPosted: 'Y' | 'N';
  isGranted: 'Y' | 'N';
}

export interface DailyAnalysisProps {
  date: string;
  dailyProfitLoss: number;
  depWdPrice: number;
}

export interface InputDailyAnalysisProps {
  payload: DailyAnalysisProps[];
}

export interface AnalysisDataProps {
  dailyStrategicStatisticsId: number;
  inputDate: string;
  principal: number;
  depWdPrice: number;
  dailyProfitLoss: number;
  dailyPlRate: number;
  cumulativeProfitLoss: number;
  cumulativeProfitLossRate: number;
}

export interface StatisticsProps {
  [key: string]: number | string;
  balance: number;
  cumulative_dep_wd_price: number;
  principal: number;
  operationPeriod: number;
  startDate: string;
  endDate: string;
  cumulativeProfitLossRate: number;
  maxCumulativeProfitLoss: number;
  maxCumulativeProfitLossRatio: number;
  currentDrawdownAmount: number;
  currentDrawdownRate: number;
  maxDrawdownAmount: number;
  maxDrawdownRate: number;
  unrealizedProfitLoss: number;
  averageProfitLossRate: number;
  maxDailyProfit: number;
  maxDailyProfitRate: number;
  maxDailyLoss: number;
  maxDailyLossRate: number;
  tradingDays: number;
  totalProfitDays: number;
  totalLossDays: number;
  currentConsecutivePlDays: number;
  maxConsecutiveProfitDays: number;
  maxConsecutiveLossDays: number;
  winRate: number;
  daysSincePeak: number;
  profitFactor: number;
  roa: number;
}
