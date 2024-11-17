import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import theme from '@/styles/theme';

interface StrategyNameProps {
  strategy: string;
  onStrategyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StrategyName = ({ strategy, onStrategyChange }: StrategyNameProps) => (
  <section css={flexAlignStyle}>
    <label htmlFor='strategy' css={labelStyle} style={{ width: '49px' }}>
      전략명
    </label>
    <Input
      id='strategy'
      value={strategy}
      onChange={onStrategyChange}
      placeholder='전략명을 입력해주세요'
      customStyle={inputStyle}
    />
  </section>
);

const flexAlignStyle = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const labelStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.lg};
`;

const inputStyle = css`
  width: 926px;
`;

export default StrategyName;
