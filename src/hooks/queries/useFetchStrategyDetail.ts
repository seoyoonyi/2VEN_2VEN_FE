import { useEffect, useState } from 'react';

import { fetchDefaultStrategyDetail, StrategyDetailRes } from '@/api/strategyDetail';

const useFetchStrategyDetail = (strategyId: string) => {
  const [strategy, setStrategy] = useState<StrategyDetailRes>();

  useEffect(() => {
    const fetchDefaultData = async (strategyId: string) => {
      try {
        const validStrategyId: string = strategyId ?? 'defaultStrategyId';

        const strategy = await fetchDefaultStrategyDetail(Number(validStrategyId));
        setStrategy(strategy.data);
      } catch (error) {
        console.error('failed Default to fetch strategyDetailPage');
      }
    };
    if (strategyId) {
      fetchDefaultData(strategyId);
    }
  }, [strategyId]);

  return { strategy };
};

export default useFetchStrategyDetail;
