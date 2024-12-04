import { css } from '@emotion/react';

import Checkbox from '@/components/common/Checkbox';
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
  selectedProducts: number[]; // 상품유형
  selectedStatus: string[]; // 전략상태
  selectedTradingTypes: number[]; // 매매유형
  selectedOperatingDays: number[]; // 운용기간
  selectedTradingCycle: number[]; // 운용주기
  selectedReturnRates: number[]; // 누적손익률
  onProductChange: (id: number) => void;
  onStatusChange: (value: string) => void;
  onTradingTypeChange: (id: number) => void;
  onOperatingDaysChange: (id: number) => void;
  onTradingCycleChange: (id: number) => void;
  onReturnRateChange: (id: number) => void;
}

const StrategyDetailFilter = ({
  selectedProducts,
  selectedStatus,
  selectedTradingTypes,
  selectedOperatingDays,
  selectedTradingCycle,
  selectedReturnRates,
  onProductChange,
  onStatusChange,
  onTradingTypeChange,
  onOperatingDaysChange,
  onTradingCycleChange,
  onReturnRateChange,
}: StrategyDetailFilterProps) => (
  <div css={containerStyle}>
    <div css={titleStyle}>
      <h3>필터</h3>
      <button type='button' css={resetButtonStyle}>
        초기화
      </button>
    </div>

    <section css={filterSectionStyle}>
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

    {/* MDD, SM Score 섹션은 별도로 구현 필요 */}

    <section css={filterSectionStyle}>
      <div css={filterLabelStyle}>누적손익률</div>
      <div css={checkboxContainerStyle}>
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
    </section>
  </div>
);

const containerStyle = css`
  width: 280px;
  padding: 24px;
  background-color: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 8px;
`;

const titleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h3 {
    font-size: ${theme.typography.fontSizes.subtitle};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.main.black};
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
  margin-bottom: 24px;
`;

const filterLabelStyle = css`
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[900]};
  margin-bottom: 16px;
`;

const checkboxContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const checkboxWrapperStyle = css`
  display: flex;
  align-items: center;
`;

export default StrategyDetailFilter;
