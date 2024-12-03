import { SearchedStrategy, SearchedTrader } from '@/types/search';

export const mapToTraderData = (trader: SearchedTrader) => ({
  traderId: trader.memberId,
  name: trader.nickname,
  profileImage: trader.profilePath || '',
  description: trader.introduction || '',
  strategiesCount: trader.strategyCnt,
  createdAt: new Date().toISOString(), // 또는 API에서 받아온 데이터 사용
});

export const mapToStrategyData = (strategy: SearchedStrategy) => ({
  strategyId: strategy.strategyId,
  strategyTitle: strategy.strategyTitle,
  tradingTypeIcon: strategy.tradingTypeIcon,
  cycleIcon: strategy.tradingCycleIcon,
  investmentAssetClassesIcon: strategy.investmentAssetClassesIcon,
  cumulativeReturn: strategy.cumulativeProfitLossRate,
  oneYearReturn: strategy.recentOneYearReturn,
  mdd: strategy.mdd,
  smscore: strategy.smScore,
  followers_count: strategy.followersCount,
});
