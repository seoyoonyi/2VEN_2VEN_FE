import axios from 'axios';

import { InvestmentAssetClass } from '@/mocks/handlers/strategy.handlers';

export interface StrategyDetailRes {
  tradingTypeName: string;
  tradingTypeIcon: string;
  strategyIACEntities: InvestmentAssetClass[];
  tradingCycleName: string;
  tradingCycleIcon: string;
  strategyId: number;
  strategyTitle: string;
  strategyOverview: string;
  followersCount: number;
  writedAt: string;
  isPosted: string;
  isGranted: string;
}

//전략 상세 기본 정보 조회
export const fetchDefaultStrategyDetail = async (id: number) => {
  if (!id) {
    throw new Error('Strategy ID is required');
  }
  try {
    const res = await axios.get(`/api/strategy-list/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch DefaultStrategyDetail data', error);
    throw error;
  }
};
