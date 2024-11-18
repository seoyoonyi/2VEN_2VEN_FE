import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import {
  fetchTradingTypes,
  fetchDeleteTradingType,
  fetchPostTradingType,
  fetchPutTradingType,
} from '@/api/tradingType';
import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import FileInput from '@/components/page/admin/FileInput';
import TypeTable, { TypeTableProps } from '@/components/page/admin/TypeTable';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { TradingTypeProps } from '@/types/admin';

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

const TradingTypeListPage = () => {
  const [mockTrade, setMockTrade] = useState<TradingTypeProps[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
    pageSize: 10,
  });
  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();

  const formattedData: TypeTableProps[] = mockTrade.map((item) => ({
    id: item.tradingTypeId || mockTrade.length + 1,
    icon: item.tradingTypeIcon,
    title: item.tradingTypeName,
  }));

  const getTradingTypes = async (page: number, pageSize: number) => {
    try {
      const res = await fetchTradingTypes(page - 1, pageSize);
      setMockTrade(res.data);
      setPaginationData({
        currentPage: page,
        totalPage: res.totalPages,
        totalElements: res.totalElements,
        pageSize: res.pageSize,
      });
    } catch (error) {
      console.error('failed to fetch trading types', error);
    }
  };

  const deleteTradingType = async (tradingIds: number[]) => {
    try {
      await Promise.all(tradingIds.map((id) => fetchDeleteTradingType(id)));
      getTradingTypes(paginationData.currentPage, paginationData.pageSize);
      setSelectedItems([]);
    } catch (error) {
      console.error('failed to delete trading types', error);
    }
  };

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
          deleteTradingType(selectedItems);
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

  const handlePageChange = (page: number) => {
    getTradingTypes(page, paginationData.pageSize);
  };

  const handleEdit = (id: number) => {
    const selectedType = mockTrade.find((item) => item.tradingTypeId === id);
    if (selectedType) {
      let updatedName = selectedType.tradingTypeName;
      openContentModal({
        title: '매매유형 수정',
        content: (
          <FileInput
            title='매매유형'
            file={null}
            fname={selectedType.tradingTypeName}
            icon={selectedType.tradingTypeIcon}
            onNameChange={(name) => (updatedName = name)}
          />
        ),
        onAction: async () => {
          await fetchPutTradingType({
            tradingTypeId: selectedType.tradingTypeId,
            tradingTypeOrder: selectedType.tradingTypeOrder,
            tradingTypeName: updatedName,
            tradingTypeIcon: 'testIcon',
            isActive: 'Y',
          });
          getTradingTypes(paginationData.currentPage, paginationData.pageSize);
        },
      });
    }
  };

  const handleUpload = () => {
    let newName: string = '';

    openContentModal({
      title: '매매유형 등록',
      content: (
        <FileInput
          title='매매유형'
          file={null}
          fname={''}
          icon={''}
          onNameChange={(name) => {
            newName = name;
          }}
        />
      ),
      onAction: async () => {
        await fetchPostTradingType({
          tradingTypeName: newName,
          tradingTypeIcon: 'testIcon',
          isActive: 'Y',
        });
        getTradingTypes(paginationData.currentPage, paginationData.pageSize);
      },
    });
  };

  useEffect(() => {
    getTradingTypes(1, paginationData.pageSize);
  }, []);

  return (
    <div css={tradeStyle}>
      <div css={headingStyle}>
        <div css={titleStyle}>매매유형 관리</div>
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
        attributes={tradeAttributes}
        data={formattedData}
        onSelectChange={handleSelectChange}
        onEdit={handleEdit}
      />
      <Pagination
        totalPage={paginationData.totalPage}
        limit={paginationData.pageSize}
        page={paginationData.currentPage}
        setPage={handlePageChange}
      />
      <Modal />
      <ContentModal />
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
