import { useState, useEffect } from 'react';

import { fetchStrategyRegistration } from '@/api/strategy';
import { Option } from '@/components/common/Select';
import { mapToOptions } from '@/utils/mapToOptions';

interface StrategyData {
  cycles: Option[];
  operations: Option[];
  products: Option[];
}

const useFetchStrategyOptionData = () => {
  const [strategyData, setStrategyData] = useState<StrategyData>({
    cycles: [],
    operations: [],
    products: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchStrategyRegistration();
        setStrategyData({
          cycles: mapToOptions(
            result.data.tradingCycleRegistrationDtoList,
            'tradingCycleName',
            'tradingCycleId'
          ),
          operations: mapToOptions(
            result.data.tradingTypeRegistrationDtoList,
            'tradingTypeName',
            'tradingTypeId'
          ),
          products: mapToOptions(
            result.data.investmentAssetClassesRegistrationDtoList,
            'investmentAssetClassesName',
            'investmentAssetClassesId'
          ),
        });
        setLoading(false);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { strategyData, loading, error };
};

export default useFetchStrategyOptionData;
