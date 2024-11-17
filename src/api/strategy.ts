import axios from 'axios';

export interface StrategyPayload {
  strategyTitle: string;
  tradingTypeId: number;
  tradingCycleId: number;
  minInvestmentAmount: string;
  strategyOverview: string;
  isPosted: string;
  investmentAssetClassesIdList: number[];
}

// 전략 등록 조회
export const fetchStrategyRegistration = async () => {
  try {
    const res = await axios.get(`/api/strategies/registration-form`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch strategy registration data', error);
  }
};

// 전략 등록
export const submitStrategyCreate = async (payload: StrategyPayload) => {
  try {
    const res = await axios.post('/api/strategies', payload, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });
    console.log(payload);
    return res;
  } catch (error) {
    console.error('Failed to submit strategy create', error);
    throw error;
  }
};
