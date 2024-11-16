import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import TypeTable from '@/components/page/admin/TypeTable';
import theme from '@/styles/theme';

const mockStock = [
  {
    title: '국내주식',
    icon: '/DomestiicStocks.svg',
  },
  {
    title: '해외주식',
    icon: '/logo.svg',
  },
  {
    title: '국내선물',
    icon: '/logo.svg',
  },
  {
    title: '내선물도',
    icon: '/logo.svg',
  },
  {
    title: '주셈',
    icon: '/logo.svg',
  },
  {
    title: '해외ETF',
    icon: '/logo.svg',
  },
  {
    title: '국내ETF',
    icon: '/logo.svg',
  },
];

const stockAttributes = [
  {
    item: '아이콘',
  },
  {
    item: '상품유형',
  },
  {
    item: '상품관리',
  },
];

const StockTypeListPage = () => (
  <div css={stockStyle}>
    <div css={headingStyle}>
      <div css={titleStyle}>상품유형 관리</div>
      <div css={buttonArea}>
        <Button size='xs' width={89}>
          등록
        </Button>
        <Button variant='neutral' size='xs' width={89}>
          삭제
        </Button>
      </div>
    </div>
    <TypeTable attributes={stockAttributes} data={mockStock} />
  </div>
);

const stockStyle = css`
  display: flex;
  width: 955px;
  padding: 48px 40px 80px 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const headingStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const titleStyle = css`
  ${theme.textStyle.headings.h3};
  color: ${theme.colors.gray[700]};
`;

const buttonArea = css`
  display: flex;
  gap: 8px;
`;
export default StockTypeListPage;
