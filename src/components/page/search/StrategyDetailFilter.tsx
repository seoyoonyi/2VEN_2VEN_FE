import { useState } from 'react';

import { css } from '@emotion/react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { PiArrowClockwise } from 'react-icons/pi';

import Checkbox from '@/components/common/Checkbox';
import DatePicker from '@/components/common/DatePicker';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { investmentFunds } from '@/constants/createOptions';
import {
  productType,
  strategyStatus,
  tradingType,
  operatingDays,
  tradingCycle,
  returnRate,
} from '@/constants/filterOptions';
import theme from '@/styles/theme';

interface StrategyDetailFilterProps {
  // 체크박스 관련
  selectedProducts: number[];
  selectedStatus: string[];
  selectedTradingTypes: number[];
  selectedOperatingDays: number[];
  selectedTradingCycle: number[];
  selectedReturnRates: number[];

  // 날짜 관련
  startDate: Date;
  endDate: Date;

  // 숫자 입력 관련
  minPrincipal: string;
  maxPrincipal: string;
  minSmscore: string;
  maxSmscore: string;
  minMdd: string;
  maxMdd: string;

  // 투자금액 셀렉트박스
  selectedInvestmentAmount: string;

  // 이벤트 핸들러들
  onProductChange: (id: number) => void;
  onStatusChange: (value: string) => void;
  onTradingTypeChange: (id: number) => void;
  onOperatingDaysChange: (id: number) => void;
  onTradingCycleChange: (id: number) => void;
  onReturnRateChange: (id: number) => void;
  onDateChange: (type: 'start' | 'end', date: Date) => void;
  onPrincipalChange: (type: 'min' | 'max', value: string) => void;
  onSmscoreChange: (type: 'min' | 'max', value: string) => void;
  onMddChange: (type: 'min' | 'max', value: string) => void;
  onInvestmentAmountChange: (value: string) => void;
  onReset: () => void;
}

const StrategyDetailFilter = ({
  selectedProducts,
  selectedStatus,
  selectedTradingTypes,
  selectedOperatingDays,
  selectedTradingCycle,
  selectedReturnRates,
  startDate,
  endDate,
  minPrincipal,
  maxPrincipal,
  minSmscore,
  maxSmscore,
  minMdd,
  maxMdd,
  selectedInvestmentAmount,
  onProductChange,
  onStatusChange,
  onTradingTypeChange,
  onOperatingDaysChange,
  onTradingCycleChange,
  onReturnRateChange,
  onDateChange,
  onPrincipalChange,
  onSmscoreChange,
  onMddChange,
  onInvestmentAmountChange,
  onReset,
}: StrategyDetailFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div css={containerStyle}>
      <div css={titleStyle}>
        <h3>필터</h3>
        <button type='button' css={resetButtonStyle} onClick={onReset}>
          <PiArrowClockwise />
          초기화
        </button>
      </div>

      <section css={[filterSectionStyle, addStyle]}>
        <div css={filterLabelStyle}>상품유형</div>
        <div css={checkboxContainerStyle}>
          {productType.map((product) => (
            <div key={product.id} css={checkboxWrapperStyle}>
              <Checkbox
                checked={selectedProducts.includes(product.id)}
                onChange={() => onProductChange(product.id)}
              >
                {product.label}
              </Checkbox>
            </div>
          ))}
        </div>
      </section>

      <section css={filterSectionStyle}>
        <div css={filterLabelStyle}>전략상태</div>
        <div css={checkboxContainerStyle}>
          {strategyStatus.map((status) => (
            <div key={status.value} css={checkboxWrapperStyle}>
              <Checkbox
                checked={selectedStatus.includes(status.value)}
                onChange={() => onStatusChange(status.value)}
              >
                {status.label}
              </Checkbox>
            </div>
          ))}
        </div>
      </section>

      <section css={filterSectionStyle}>
        <div css={filterLabelStyle}>매매유형</div>
        <div css={checkboxContainerStyle}>
          {tradingType.map((type) => (
            <div key={type.id} css={checkboxWrapperStyle}>
              <Checkbox
                checked={selectedTradingTypes.includes(type.id)}
                onChange={() => onTradingTypeChange(type.id)}
              >
                {type.label}
              </Checkbox>
            </div>
          ))}
        </div>
      </section>

      <section css={filterSectionStyle}>
        <div css={filterLabelStyle}>운용기간</div>
        <div css={checkboxContainerStyle}>
          {operatingDays.map((period) => (
            <div key={period.id} css={checkboxWrapperStyle}>
              <Checkbox
                checked={selectedOperatingDays.includes(period.id)}
                onChange={() => onOperatingDaysChange(period.id)}
              >
                {period.label}
              </Checkbox>
            </div>
          ))}
        </div>
      </section>

      <section css={filterSectionStyle}>
        <div css={filterLabelStyle}>운용주기</div>
        <div css={checkboxContainerStyle}>
          {tradingCycle.map((cycle) => (
            <div key={cycle.id} css={checkboxWrapperStyle}>
              <Checkbox
                checked={selectedTradingCycle.includes(cycle.id)}
                onChange={() => onTradingCycleChange(cycle.id)}
              >
                {cycle.label}
              </Checkbox>
            </div>
          ))}
        </div>
      </section>

      {/* 투자원금 섹션은 별도로 구현 필요 */}
      {isExpanded && (
        <div css={shortenBlockStyle}>
          <section css={[filterSectionStyle, foldSection]}>
            <div css={[filterLabelStyle, foldingBlockStyle]}>투자원금</div>
            <Select
              options={investmentFunds}
              onChange={(option) => onInvestmentAmountChange(option.value)}
              width='160px'
              type='sm'
              defaultLabel='투자금액 선택'
              value={
                selectedInvestmentAmount
                  ? { label: selectedInvestmentAmount, value: selectedInvestmentAmount }
                  : undefined
              }
            />
          </section>

          <section css={[filterSectionStyle, foldSection]}>
            <div css={[filterLabelStyle, foldingBlockStyle]}>원금</div>
            <div css={rangeInputContainerStyle}>
              <Input
                type='text'
                value={minPrincipal}
                onChange={(e) => onPrincipalChange('min', e.target.value)}
                onBlur={() => onPrincipalChange('min', minPrincipal)} // 포커스 아웃시 API 호출
                placeholder='0 이상'
                inputSize='sm'
                css={inputStyle}
              />
              <span>~</span>
              <Input
                type='text'
                value={maxPrincipal}
                onChange={(e) => onPrincipalChange('max', e.target.value)}
                onBlur={(e) => onPrincipalChange('max', e.target.value)} // onBlur 추가
                placeholder='0 이하'
                inputSize='sm'
                css={inputStyle}
              />
            </div>
          </section>

          {/* SM Score, MDD 섹션은 별도로 구현 필요 */}
          <section css={[filterSectionStyle, foldSection]}>
            <div css={[filterLabelStyle, foldingBlockStyle]}>SM Score</div>
            <div css={rangeInputContainerStyle}>
              <Input
                type='text'
                value={minSmscore}
                onChange={(e) => onSmscoreChange('min', e.target.value)}
                onBlur={(e) => onSmscoreChange('min', e.target.value)} // onBlur 추가
                placeholder='0 이상'
                inputSize='sm'
                css={inputStyle}
              />
              <span>~</span>
              <Input
                type='text'
                value={maxSmscore}
                onChange={(e) => onSmscoreChange('max', e.target.value)}
                onBlur={(e) => onSmscoreChange('max', e.target.value)} // onBlur 추가
                placeholder='100 이하'
                inputSize='sm'
                css={inputStyle}
              />
            </div>
          </section>

          <section css={[filterSectionStyle, foldSection]}>
            <div css={[filterLabelStyle, foldingBlockStyle]}>MDD</div>
            <div css={rangeInputContainerStyle}>
              <Input
                type='text'
                value={minMdd}
                onChange={(e) => onMddChange('min', e.target.value)}
                onBlur={(e) => onMddChange('min', e.target.value)} // onBlur 추가
                placeholder='0 이하'
                inputSize='sm'
                css={inputStyle}
              />
              <span>~</span>
              <Input
                type='text'
                value={maxMdd}
                onChange={(e) => onMddChange('max', e.target.value)}
                onBlur={(e) => onMddChange('max', e.target.value)} // onBlur 추가
                placeholder='0 이하'
                inputSize='sm'
                css={inputStyle}
              />
            </div>
          </section>

          {/* 날짜 섹션은 별도로 구현 필요 */}
          <section css={[filterSectionStyle, foldSection]}>
            <div css={[filterLabelStyle, foldingBlockStyle]}>기간 / 수익률</div>
            <div css={datePickerContainerStyle}>
              <DatePicker
                selected={startDate}
                setSelected={(date) => onDateChange('start', date)}
                placeholder='시작일'
              />
              <span>~</span>
              <DatePicker
                selected={endDate}
                setSelected={(date) => onDateChange('end', date)}
                placeholder='종료일'
              />
              <div css={returnRateContainer}>
                {returnRate.map((rate) => (
                  <div key={rate.id} css={checkboxWrapperStyle}>
                    <Checkbox
                      checked={selectedReturnRates.includes(rate.id)}
                      onChange={() => onReturnRateChange(rate.id)}
                    >
                      {rate.label}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
      <button css={moreBtnStyle} onClick={toggleExpand}>
        <span>{isExpanded ? '접어두기' : '더보기'}</span>
        {isExpanded ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
      </button>
    </div>
  );
};
const containerStyle = css`
  width: ${theme.layout.width.content};
  padding: 32px 40px 24px;
  background-color: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 8px;
`;

const addStyle = css`
  border-top: 1px solid ${theme.colors.gray[500]};
`;

const titleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h3 {
    font-size: ${theme.typography.fontSizes.subtitle.lg};
    line-height: ${theme.typography.lineHeights.md};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.gray[900]};
  }
  button {
    font-size: ${theme.typography.fontSizes.caption};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.gray[500]};
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const resetButtonStyle = css`
  font-size: ${theme.typography.fontSizes.caption};
  color: ${theme.colors.gray[500]};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.gray[700]};
  }
`;

const filterSectionStyle = css`
  display: flex;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const shortenBlockStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  section {
    border-bottom: 1px solid ${theme.colors.main.white};
    gap: 24px;
  }
`;

const foldSection = css`
  justify-content: flex-start;
  align-items: center;
`;
const filterLabelStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 138px;
  padding: 16px 24px;
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.medium};
  background-color: ${theme.colors.gray[50]};
`;

const foldingBlockStyle = css`
  background-color: ${theme.colors.main.white};
`;

const checkboxContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: calc(100% - 138px);
  padding: 16px 0 16px 24px;
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.colors.gray[400]};
`;

const checkboxWrapperStyle = css`
  display: flex;
  align-items: center;
  width: 128px;
  font-size: ${theme.typography.fontSizes.body};
`;

const rangeInputContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: ${theme.colors.gray[400]};
  }
`;

const inputStyle = css`
  width: 160px;
  padding: 0 24px;
  border: 1px solid ${theme.colors.gray[300]};
  font-size: ${theme.typography.fontSizes.caption};
  text-align: center;
  &:focus {
    outline: none;
    border-color: ${theme.colors.teal[600]};
  }

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

const datePickerContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  > span {
    color: ${theme.colors.gray[400]};
  }
`;

const returnRateContainer = css`
  display: flex;
  > div {
    width: auto;
    label {
      gap: 4px;
    }
    span {
      display: inline;
      color: ${theme.colors.gray[400]};
    }
  }
  gap: 16px;
  margin-left: 8px;
  font-weight: ${theme.typography.fontWeight.regular};
`;

const moreBtnStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 24px;
  width: 100%;
  padding: 8px 0;
  font-size: ${theme.typography.fontSizes.body};
  line-height: ${theme.typography.lineHeights.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[500]};
  background: none;
  border: none;
  cursor: pointer;
  svg {
    font-size: 24px;
  }
`;
export default StrategyDetailFilter;
