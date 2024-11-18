import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import TypeTable, { TypeTableProps } from '@/components/page/admin/TypeTable';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';

const mockTradeItems = [
  {
    id: 1,
    title: '자동',
    icon: '/logo.svg',
  },
  {
    id: 2,
    title: '반자동(하이브리드)',
    icon: '/logo.svg',
  },
  {
    id: 3,
    title: '수동(메뉴얼)',
    icon: '/logo.svg',
  },
  {
    id: 4,
    title: '자동',
    icon: '/logo.svg',
  },
  {
    id: 5,
    title: '반자동(하이브리드)',
    icon: '/logo.svg',
  },
  {
    id: 6,
    title: '수동(메뉴얼)',
    icon: '/logo.svg',
  },
  {
    id: 7,
    title: '자동',
    icon: '/logo.svg',
  },
  {
    id: 8,
    title: '반자동(하이브리드)',
    icon: '/logo.svg',
  },
  {
    id: 9,
    title: '수동(메뉴얼)',
    icon: '/logo.svg',
  },
  {
    id: 10,
    title: '자동',
    icon: '/logo.svg',
  },
  {
    id: 11,
    title: '반자동(하이브리드)',
    icon: '/logo.svg',
  },
  {
    id: 12,
    title: '수동(메뉴얼)',
    icon: '/logo.svg',
  },
];

const tradeAttributes = [
  {
    item: '아이콘',
  },
  {
    item: '매매유형',
  },
  {
    item: '유형관리',
  },
];

const paginatedData = (data: TypeTableProps[], currentPage: number, pageSize: number) => {
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  return data.slice(startIdx, endIdx);
};

const TradingTypeListPage = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [mockTrade, setMockTrade] = useState(mockTradeItems);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { openModal } = useModalStore();

  const handleSelectChange = (selectedIdx: number[]) => {
    setSelectedItems(selectedIdx);
  };

  const handleDelete = () => {
    if (selectedItems.length > 0) {
      openModal({
        type: 'warning',
        title: '이미지 삭제',
        desc: `선택하신 ${selectedItems.length}개의 유형을 삭제하시겠습니까?`,
        onAction: () => {
          setMockTrade((prevItems) => prevItems.filter((item) => !selectedItems.includes(item.id)));
          setSelectedItems([]);
        },
      });
    } else {
      openModal({
        type: 'warning',
        title: '알림',
        desc: `선택 된 항목이 없습니다.`,
        onAction: () => {},
      });
    }
  };

  return (
    <div css={tradeStyle}>
      <div css={headingStyle}>
        <div css={titleStyle}>매매유형 관리</div>
        <div css={buttonArea}>
          <Button size='xs' width={89}>
            등록
          </Button>
          <Button variant='neutral' size='xs' width={89} onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
      <TypeTable
        attributes={tradeAttributes}
        data={paginatedData(mockTrade, page, limit)}
        onSelectChange={handleSelectChange}
      />
      <Pagination
        totalPage={Math.ceil(mockTrade.length / limit)}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <Modal />
    </div>
  );
};
const tradeStyle = css`
  display: flex;
  width: 955px;
  padding: 48px 40px 80px 40px;
  flex-direction: column;
  align-items: center;
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

export default TradingTypeListPage;
