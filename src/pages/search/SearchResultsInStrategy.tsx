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

  // API 호출
  const { data: strategyDetailResults, isLoading, error } = useSearchStrategyDetail(filterParams); // 전략 상세 검색 결과

  // 핸들러 함수들
  const handlePageChange = (page: number) => {
    setFilterParams((prev) => ({ ...prev, page }));
  };

  const handleProductChange = (id: number) => {
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

  const [returnRateError, setReturnRateError] = useState<string>('');
  // 수익률 필터링 핸들러
  const handleReturnRateChange = (id: number) => {
    // 바로 API 호출
    setFilterParams((prev) => {
      const currentList = prev.returnRateList || [];
      const newList = currentList.includes(id)
        ? currentList.filter((r) => r !== id)
        : [...currentList, id];

      return {
        ...prev,
        returnRateList: newList,
      };
    });
  };

  // 데이트피커를 위한 state를 수정
  const [dateInputs, setDateInputs] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const handleDateChange = (type: 'start' | 'end', date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    setDateInputs((prev) => ({
      // 날짜 변경 시 state 업데이트
      ...prev,
      [type === 'start' ? 'startDate' : 'endDate']: formattedDate,
    }));

    // 시작일과 종료일이 모두 있을 때만 API 호출
    const updatedDates = {
      ...dateInputs,
      [type === 'start' ? 'startDate' : 'endDate']: formattedDate,
    };

    if (updatedDates.startDate && updatedDates.endDate) {
      setFilterParams((prev) => ({
        ...prev,
        startDate: updatedDates.startDate,
        endDate: updatedDates.endDate,
      }));
    }
  };

  // 입력값을 위한 별도의 state들
  const [principalInputs, setPrincipalInputs] = useState({
    min: '',
    max: '',
  });

  const [mddInputs, setMddInputs] = useState({
    min: '',
    max: '',
  });

  const [smScoreInputs, setSmScoreInputs] = useState({
    min: '',
    max: '',
  });

  // 원금 핸들러
  const handlePrincipalChange = (type: 'min' | 'max', value: string) => {
    if (value === '' || /^\d*$/.test(value)) {
      setPrincipalInputs((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  // MDD 핸들러
  const handleMddChange = (type: 'min' | 'max', value: string) => {
    if (value === '' || /^-?\d*$/.test(value)) {
      setMddInputs((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  // SM Score 핸들러
  const handleSmscoreChange = (type: 'min' | 'max', value: string) => {
    if (value === '' || /^\d*$/.test(value)) {
      setSmScoreInputs((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  // 적용 버튼 핸들러들
  const handleApplyPrincipal = () => {
    if (validatePrincipal()) {
      setFilterParams((prev) => ({
        ...prev,
        minPrincipal: principalInputs.min ? Number(principalInputs.min) : undefined,
        maxPrincipal: principalInputs.max ? Number(principalInputs.max) : undefined,
      }));
    }
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
      startDate: undefined, // 날짜도 초기화
      endDate: undefined,
    });

    // input states 초기화
    setPrincipalInputs({ min: '', max: '' });
    setMddInputs({ min: '', max: '' });
    setSmScoreInputs({ min: '', max: '' });
    setDateInputs({
      startDate: undefined,
      endDate: undefined,
    });

    // 에러 메시지 초기화
    setPrincipalError('');
    setSmScoreError('');
    setMddError('');
    setReturnRateError('');

    // state 초기화
    setPrincipalInputs({ min: '', max: '' });
    setMddInputs({ min: '', max: '' });
    setSmScoreInputs({ min: '', max: '' });

    // 데이트피커 초기화
    setDateInputs({
      startDate: undefined,
      endDate: undefined,
    });
  };

  // 원금 유효성 검사 및 적용 로직
  const [principalError, setPrincipalError] = useState<string>('');

  const validatePrincipal = () => {
    const min = filterParams.minPrincipal?.toString() || '';
    const max = filterParams.maxPrincipal?.toString() || '';

    // 둘 다 비어있으면 유효성 검사 통과
    if (!min && !max) {
      setPrincipalError('');
      return true; // 둘 다 비어있어도 true 반환
    }

    // 숫자 문자열인지 체크
    if (!/^\d*$/.test(min) || !/^\d*$/.test(max)) {
      setPrincipalError('숫자만 입력 가능합니다.');
      return false;
    }

    const minValue = parseInt(min || '0'); // 비어있으면 0으로 처리
    const maxValue = parseInt(max || '0');

    // 최소값이 최대값보다 큰 경우에만 에러
    if (minValue > maxValue && max !== '') {
      setPrincipalError('최소값이 최대값보다 클 수 없습니다.');
      return false;
    }

    setPrincipalError('');
    return true;
  };

  const [smScoreError, setSmScoreError] = useState<string>('');

  const validateSmScore = () => {
    const { min } = smScoreInputs;
    const { max } = smScoreInputs;

    // 둘 다 비어있으면 에러 메시지 제거하고 true 반환
    if (!min && !max) {
      setSmScoreError('');
      return true; // true로 변경
    }

    // 숫자 문자열인지 체크 (숫자만 허용)
    if (!/^\d*$/.test(min) || !/^\d*$/.test(max)) {
      setSmScoreError('숫자만 입력 가능합니다.');
      return false;
    }

    const minValue = parseInt(min);
    const maxValue = parseInt(max);

    // 0 미만인 경우
    if (minValue < 0 || maxValue < 0) {
      setSmScoreError('0 이상의 값을 입력해주세요.');
      return false;
    }

    // 100 초과인 경우
    if (minValue > 100 || maxValue > 100) {
      setSmScoreError('100 이하의 값을 입력해주세요.');
      return false;
    }

    // 최소값이 최대값보다 큰 경우
    if (minValue > maxValue && max !== '') {
      setSmScoreError('최소값이 최대값보다 클 수 없습니다.');
      return false;
    }

    setSmScoreError('');
    return true;
  };

  const handleApplySmScore = () => {
    if (validateSmScore()) {
      setFilterParams((prev) => ({
        ...prev,
        minSmscore: smScoreInputs.min ? Number(smScoreInputs.min) : undefined,
        maxSmscore: smScoreInputs.max ? Number(smScoreInputs.max) : undefined,
      }));
    }
  };

  const handleInvestmentAmountChange = (value: string) => {
    setFilterParams((prev) => ({
      ...prev,
      minInvestmentAmount: value,
    }));
  };

  const [mddError, setMddError] = useState<string>('');

  const validateMdd = () => {
    const { min } = mddInputs;
    const { max } = mddInputs;

    // 둘 다 비어있으면 에러 메시지 제거하고 true 반환
    if (!min && !max) {
      setMddError('');
      return true; // true로 변경
    }

    // 숫자 문자열인지 체크 (숫자와 - 기호만 허용)
    if (!/^-?\d*$/.test(min) || !/^-?\d*$/.test(max)) {
      setMddError('숫자와 음수 기호(-)만 입력 가능합니다.');
      return false;
    }

    const minValue = parseInt(min);
    const maxValue = parseInt(max);

    // 0보다 큰 경우
    if (minValue > 0 || maxValue > 0) {
      setMddError('0 이하의 값을 입력해주세요.');
      return false;
    }

    // 최소값이 최대값보다 큰 경우 (MDD는 음수라서 절대값으로 비교)
    if (Math.abs(maxValue) > Math.abs(minValue)) {
      setMddError('최대값의 절대값이 최소값의 절대값보다 클 수 없습니다.');
      return false;
    }

    setMddError('');
    return true;
  };

  const handleApplyMdd = () => {
    if (validateMdd()) {
      setFilterParams((prev) => ({
        ...prev,
        minMdd: mddInputs.min ? Number(mddInputs.min) : undefined,
        maxMdd: mddInputs.max ? Number(mddInputs.max) : undefined,
      }));
    }
  };

  // 전략 검색 결과 데이터 매핑
  const mappedStrategies = strategyDetailResults?.data.map(mapToStrategyDetailData) ?? [];

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
            startDate={dateInputs.startDate ? new Date(dateInputs.startDate) : undefined}
            endDate={dateInputs.endDate ? new Date(dateInputs.endDate) : undefined}
            minPrincipal={principalInputs.min}
            maxPrincipal={principalInputs.max}
            minMdd={mddInputs.min}
            maxMdd={mddInputs.max}
            minSmscore={smScoreInputs.min}
            maxSmscore={smScoreInputs.max}
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
            onApplyPrincipal={handleApplyPrincipal}
            onApplySmscore={handleApplySmScore}
            onApplyMdd={handleApplyMdd}
            principalError={principalError}
            smScoreError={smScoreError}
            mddError={mddError}
            returnRateError={returnRateError}
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
