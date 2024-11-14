import { css } from '@emotion/react';

import Checkbox from '@/components/common/Checkbox';
import theme from '@/styles/theme';

interface ProductTypeProps {
  products: string[];
  selectedProducts: string[];
  onProductChange: (product: string) => void;
}

const ProductType = ({ products, selectedProducts, onProductChange }: ProductTypeProps) => (
  <section css={flexStyle}>
    <div css={labelStyle}>상품유형</div>
    <div css={checkboxContainerStyle}>
      {products.map((product) => (
        <div key={product} style={{ display: 'flex' }}>
          <Checkbox
            id={product}
            checked={selectedProducts.includes(product)}
            onChange={() => onProductChange(product)}
          />
          <label htmlFor={product} css={checkTextStyle(selectedProducts.includes(product))}>
            {product}
          </label>
        </div>
      ))}
    </div>
  </section>
);

const flexStyle = css`
  display: flex;
  gap: 24px;
`;

const labelStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.lg};
`;

const checkboxContainerStyle = css`
  width: 704px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
`;

const checkTextStyle = (isSelected: boolean) => css`
  color: ${isSelected ? theme.colors.main.black : theme.colors.gray[400]};
  font-weight: 400;
  line-height: 150%;
`;

export default ProductType;
