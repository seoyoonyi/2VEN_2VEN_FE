import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Modal from '@/components/common/Modal';
import FileInput from '@/components/page/admin/FileInput';
import TypeTable from '@/components/page/admin/TypeTable';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';

const mockStock = [
  {
    id: 1,
    title: '국내주식',
    icon: '/DomestiicStocks.svg',
  },
  {
    id: 2,
    title: '해외주식',
    icon: '/logo.svg',
  },
  {
    id: 3,
    title: '국내선물',
    icon: '/logo.svg',
  },
  {
    id: 4,
    title: '내선물도',
    icon: '/logo.svg',
  },
  {
    id: 5,
    title: '주셈',
    icon: '/logo.svg',
  },
  {
    id: 6,
    title: '해외ETF',
    icon: '/logo.svg',
  },
  {
    id: 7,
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

const StockTypeListPage = () => {
  const [selectedStocks, setSelectedStocks] = useState<number[]>([]);
  const [mockStocks, setMockStocks] = useState(mockStock);
  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();

  const handleSelectChange = (selectedIdx: number[]) => {
    setSelectedStocks(selectedIdx);
  };

  const handleDelete = () => {
    if (selectedStocks.length > 0) {
      openModal({
        type: 'warning',
        title: '이미지 삭제',
        desc: `선택하신 ${selectedStocks.length}개의 유형을 삭제하시겠습니까?`,
        onAction: () => {
          setMockStocks((prevItems) =>
            prevItems.filter((item) => !selectedStocks.includes(item.id))
          );
          setSelectedStocks([]);
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

  const handleUpload = () => {
    openContentModal({
      title: '상품유형 등록',
      content: (
        <FileInput title='상품유형' file={null} fname={''} icon={''} onNameChange={() => {}} />
      ),
      onAction: () => {
        console.log('상품유형 등록 api');
      },
    });
  };

  return (
    <div css={stockStyle}>
      <div css={headingStyle}>
        <div css={titleStyle}>상품유형 관리</div>
        <div css={buttonArea}>
          <Button size='xs' width={89} onClick={handleUpload}>
            등록
          </Button>
          <Button variant='neutral' size='xs' width={89} onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
      <TypeTable
        attributes={stockAttributes}
        data={mockStocks}
        onSelectChange={handleSelectChange}
        onEdit={() => {}}
      />
      <Modal />
      <ContentModal />
    </div>
  );
};

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
