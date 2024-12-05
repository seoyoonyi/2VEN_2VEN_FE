import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import SearchedStrategyList from '@/components/page/search/SearchedStrategyList';
import StrategyDetailFilter from '@/components/page/search/StrategyDetailFilter';
import { useSearchStrategyDetail } from '@/hooks/queries/useSearch';
import theme from '@/styles/theme';
import { StrategySearchParams } from '@/types/search';
import { mapToStrategyDetailData } from '@/utils/mappers';
import { shortenString } from '@/utils/string';

const SearchResultsInStrategy = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  console.log('1. URL keyword:', keyword); // URL 파라미터 확인

  // 모든 필터값을 하나의 상태로 관리
  const [filterParams, setFilterParams] = useState<StrategySearchParams>({
    keyword,
    page: 1,
    pageSize: 25,
    investmentAssetClassesList: [],
    strategyOperationStatusList: [],
    tradingTypeList: [],
    operatingDaysList: [],
    tradingCycleList: [],
    minInvestmentAmount: '',
    minPrincipal: undefined,
    maxPrincipal: undefined,
    minSmscore: undefined,
    maxSmscore: undefined,
    minMdd: undefined,
    maxMdd: undefined,
    returnRateList: [],
  });

  console.log('2. 현재 filterParams:', filterParams); // 현재 필터 상태 확인

  console.log('🚨 API 호출 전 filterParams:', filterParams);
  // API 호출
  const { data: strategyDetailResults, isLoading, error } = useSearchStrategyDetail(filterParams); // 전략 상세 검색 결과

  console.log('✅ API 실제 응답 데이터:', strategyDetailResults?.data);

  // filterParams가 변경될 때마다 새로운 API 호출이 자동으로 트리거됨
  useEffect(() => {
    console.log('필터 변경:', filterParams);
  }, [filterParams]);

  console.log('3. API 응답 데이터:', {
    isLoading,
    error,
    resultCount: strategyDetailResults?.resultCount,
    data: strategyDetailResults?.data,
  }); // API 응답 확인

  // 핸들러 함수들
  const handlePageChange = (page: number) => {
    setFilterParams((prev) => ({ ...prev, page }));
  };

  const handleProductChange = (id: number) => {
    console.log('6. 상품유형 변경:', id);
    setFilterParams((prev) => ({
      ...prev,
      page: 1, // 필터 변경시 첫 페이지로 리셋
      investmentAssetClassesList: prev.investmentAssetClassesList?.includes(id)
        ? prev.investmentAssetClassesList.filter((p) => p !== id)
        : [...(prev.investmentAssetClassesList || []), id],
    }));
  };

  const handleStatusChange = (value: string) => {
    setFilterParams((prev) => ({
      ...prev,
      strategyOperationStatusList: prev.strategyOperationStatusList?.includes(value)
        ? prev.strategyOperationStatusList.filter((s) => s !== value)
        : [...(prev.strategyOperationStatusList || []), value],
    }));
  };

  const handleTradingTypeChange = (id: number) => {
    setFilterParams((prev) => ({
      ...prev,
      tradingTypeList: prev.tradingTypeList?.includes(id)
        ? prev.tradingTypeList.filter((t) => t !== id)
        : [...(prev.tradingTypeList || []), id],
    }));
  };

  const handleOperatingDaysChange = (id: number) => {
    setFilterParams((prev) => ({
      ...prev,
      operatingDaysList: prev.operatingDaysList?.includes(id)
        ? prev.operatingDaysList.filter((d) => d !== id)
        : [...(prev.operatingDaysList || []), id],
    }));
  };

  const handleTradingCycleChange = (id: number) => {
    setFilterParams((prev) => ({
      ...prev,
      tradingCycleList: prev.tradingCycleList?.includes(id)
        ? prev.tradingCycleList.filter((c) => c !== id)
        : [...(prev.tradingCycleList || []), id],
    }));
  };

  const handleReturnRateChange = (id: number) => {
    setFilterParams((prev) => ({
      ...prev,
      returnRateList: prev.returnRateList?.includes(id)
        ? prev.returnRateList.filter((r) => r !== id)
        : [...(prev.returnRateList || []), id],
    }));
  };

  const handleDateChange = (type: 'start' | 'end', date: Date) => {
    setFilterParams((prev) => ({
      ...prev,
      [type === 'start' ? 'startDate' : 'endDate']: dayjs(date).format('YYYY-MM-DD'),
    }));
  };

  // 원금 입력 핸들러 (양수만 허용)
  const handlePrincipalChange = (type: 'min' | 'max', value: string) => {
    const number = Number(value);

    if (value === '' || (number > 0 && !isNaN(number))) {
      setFilterParams((prev) => {
        // 최소값 입력시
        if (type === 'min') {
          // 최대값이 있는데 최소값보다 작다면 최대값을 undefined로
          if (prev.maxPrincipal && number > prev.maxPrincipal) {
            return {
              ...prev,
              minPrincipal: number,
              maxPrincipal: undefined,
            };
          }
          return {
            ...prev,
            minPrincipal: number,
          };
        }

        // 최대값 입력시
        if (type === 'max') {
          // 최소값이 있는데 최대값보다 크다면 최소값을 undefined로
          if (prev.minPrincipal && number < prev.minPrincipal) {
            return {
              ...prev,
              maxPrincipal: number,
              minPrincipal: undefined,
            };
          }
          return {
            ...prev,
            maxPrincipal: number,
          };
        }

        return prev;
      });
    }
  };
  // MDD 입력 핸들러 (0 이하의 값만 허용)
  const handleMddChange = (type: 'min' | 'max', value: string) => {
    const number = Number(value);

    if (value === '' || (number <= 0 && !isNaN(number))) {
      setFilterParams((prev) => {
        if (type === 'min') {
          if (prev.maxMdd && number > prev.maxMdd) {
            return {
              ...prev,
              minMdd: number,
              maxMdd: undefined,
            };
          }
          return {
            ...prev,
            minMdd: number,
          };
        }

        if (type === 'max') {
          if (prev.minMdd && number < prev.minMdd) {
            return {
              ...prev,
              maxMdd: number,
              minMdd: undefined,
            };
          }
          return {
            ...prev,
            maxMdd: number,
          };
        }
        return prev;
      });
    }
  };

  // SM Score 입력 핸들러 (0~100 사이 값만 허용)
  const handleSmscoreChange = (type: 'min' | 'max', value: string) => {
    const number = Number(value);

    if (value === '' || (number >= 0 && number <= 100 && !isNaN(number))) {
      setFilterParams((prev) => {
        if (type === 'min') {
          if (prev.maxSmscore && number > prev.maxSmscore) {
            return {
              ...prev,
              minSmscore: number,
              maxSmscore: undefined,
            };
          }
          return {
            ...prev,
            minSmscore: number,
          };
        }

        if (type === 'max') {
          if (prev.minSmscore && number < prev.minSmscore) {
            return {
              ...prev,
              maxSmscore: number,
              minSmscore: undefined,
            };
          }
          return {
            ...prev,
            maxSmscore: number,
          };
        }
        return prev;
      });
    }
  };

  const handleInvestmentAmountChange = (value: string) => {
    setFilterParams((prev) => ({
      ...prev,
      minInvestmentAmount: value,
    }));
  };

  const handleReset = () => {
    setFilterParams({
      keyword,
      page: 1,
      pageSize: 25,
      investmentAssetClassesList: [],
      strategyOperationStatusList: [],
      tradingTypeList: [],
      operatingDaysList: [],
      tradingCycleList: [],
      minInvestmentAmount: '',
      minPrincipal: undefined,
      maxPrincipal: undefined,
      minSmscore: undefined,
      maxSmscore: undefined,
      minMdd: undefined,
      maxMdd: undefined,
      returnRateList: [],
    });
  };

  // 전략 검색 결과 데이터 매핑
  const mappedStrategies = strategyDetailResults?.data.map(mapToStrategyDetailData) ?? [];

  console.log('4. 매핑된 전략 데이터:', mappedStrategies); // 매핑된 데이터 확인

  // filterParams가 변경될 때마다 로그
  useEffect(() => {
    console.log('5. filterParams 변경됨:', filterParams);
  }, [filterParams]);

  // 로딩 처리
  if (isLoading) return <Loader />;

  // 에러 처리
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div css={containerStyle}>
      <h2 css={pageHeadingStyle}>
        <strong>{shortenString(keyword, 10)}&nbsp;</strong>
        <span>에 대한 전략 검색 결과</span>
        <span css={totalCountStyle}>{strategyDetailResults?.data.length ?? 0}</span>
      </h2>
      <div css={bgStyle}></div>
      <div css={contentLayoutStyle}>
        {/* 필터 영역 */}
        <div css={filterWrapperStyle}>
          <StrategyDetailFilter
            selectedProducts={filterParams.investmentAssetClassesList || []}
            selectedStatus={filterParams.strategyOperationStatusList || []}
            selectedTradingTypes={filterParams.tradingTypeList || []}
            selectedOperatingDays={filterParams.operatingDaysList || []}
            selectedTradingCycle={filterParams.tradingCycleList || []}
            selectedReturnRates={filterParams.returnRateList || []}
            startDate={new Date(filterParams.startDate || new Date())}
            endDate={new Date(filterParams.endDate || new Date())}
            minPrincipal={filterParams.minPrincipal?.toString() || ''}
            maxPrincipal={filterParams.maxPrincipal?.toString() || ''}
            minSmscore={filterParams.minSmscore?.toString() || ''}
            maxSmscore={filterParams.maxSmscore?.toString() || ''}
            minMdd={filterParams.minMdd?.toString() || ''}
            maxMdd={filterParams.maxMdd?.toString() || ''}
            selectedInvestmentAmount={filterParams.minInvestmentAmount || ''}
            onProductChange={handleProductChange}
            onStatusChange={handleStatusChange}
            onTradingTypeChange={handleTradingTypeChange}
            onOperatingDaysChange={handleOperatingDaysChange}
            onTradingCycleChange={handleTradingCycleChange}
            onReturnRateChange={handleReturnRateChange}
            onDateChange={handleDateChange}
            onPrincipalChange={handlePrincipalChange}
            onSmscoreChange={handleSmscoreChange}
            onMddChange={handleMddChange}
            onInvestmentAmountChange={handleInvestmentAmountChange}
            onReset={handleReset}
          />
        </div>
      </div>
      {/* 결과 영역 */}
      <div css={resultWrapperStyle}>
        <div css={headerStyle}>
          <div css={totalStyle}>
            Total <span>{strategyDetailResults?.data.length ?? 0}</span>
          </div>
        </div>
        <SearchedStrategyList strategies={mappedStrategies} />
        <div css={paginationWrapperStyle}>
          <Pagination
            totalPage={Math.ceil(
              (strategyDetailResults?.data.length ?? 0) / (filterParams.pageSize || 25) // 기본값 설정
            )}
            limit={5}
            page={filterParams.page || 1} // undefined 처리
            setPage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

const containerStyle = css`
  position: relative;
  margin: 0 auto;
  margin-bottom: 76px;
`;
const bgStyle = css`
  width: 100%;
  height: 200px;
  background-color: ${theme.colors.gray[100]};
`;
const pageHeadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 76px 0 64px;
  background-color: ${theme.colors.gray[100]};
  font-size: ${theme.typography.fontSizes.heading.h2};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  strong {
    color: ${theme.colors.teal[700]};
  }
  span {
    color: ${theme.colors.gray[700]};
  }
  span:last-of-type {
    color: ${theme.colors.main.primary};
  }
`;
const contentLayoutStyle = css`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: -207px;
`;
const filterWrapperStyle = css``;
const resultWrapperStyle = css`
  flex: 1;
`;
const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${theme.layout.width.content};
  margin: 64px auto 24px;
`;
const totalStyle = css`
  color: ${theme.colors.gray[700]};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};

  span {
    color: ${theme.colors.main.primary};
  }
`;
const paginationWrapperStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const totalCountStyle = css`
  display: flex;
  width: 56px;
  height: 32px;
  justify-content: center;
  align-items: center;
  font-size: ${theme.typography.fontSizes.body};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  background-color: ${theme.colors.teal[50]};
  border-radius: 100px;
`;
export default SearchResultsInStrategy;
