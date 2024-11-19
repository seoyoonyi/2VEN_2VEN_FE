import { useState } from 'react';

import { css } from '@emotion/react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchTradingTypes } from '@/api/tradingType';
import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import FileInput from '@/components/page/admin/FileInput';
import TypeTable from '@/components/page/admin/TypeTable';
import { useAddTradingType, useDeleteTradingType, usePutTradingType } from '@/hooks/useTradingType';
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
  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();
  const { mutate: deleteTradingType } = useDeleteTradingType();
  const { mutate: addTradingType } = useAddTradingType();
  const { mutate: updateTradingType } = usePutTradingType();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPage: 0,
    totalElements: 0,
    pageSize: 10,
  });

  const { data } = useQuery<TradingTypeProps[], Error>({
    queryKey: ['tradingTypes', paginationData.currentPage, paginationData.pageSize],
    queryFn: async () => {
      try {
        const res = await fetchTradingTypes(
          paginationData.currentPage - 1,
          paginationData.pageSize
        );
        setPaginationData({
          currentPage: paginationData.currentPage,
          totalPage: res.totalPages,
          totalElements: res.totalElements,
          pageSize: res.pageSize,
        });
        return res.data;
      } catch (err) {
        console.error('Error fetching trading types:', err);
        throw err;
      }
    },
    placeholderData: keepPreviousData,
  });

  const formattedData = data?.map((item) => ({
    id: item.tradingTypeId || data.length + 1,
    icon: item.tradingTypeIcon,
    title: item.tradingTypeName,
  }));

  const handleSelectChange = (selectedIdx: number[]) => {
    setSelectedItems(selectedIdx);
  };

  const handlePageChange = (page: number) => {
    setPaginationData((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleDelete = () => {
    if (selectedItems.length > 0) {
      openModal({
        type: 'warning',
        title: '이미지 삭제',
        desc: `선택하신 ${selectedItems.length}개의 유형을 삭제하시겠습니까?`,
        onAction: () => {
          selectedItems.forEach((id) => deleteTradingType(id));
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

  const handleEdit = (id: number) => {
    const selectedType = data?.find((item) => item.tradingTypeId === id);
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
        onAction: () => {
          if (!updatedName.trim()) {
            alert('매매유형명이 입력되지않았습니다.');
            return;
          }
          updateTradingType({
            tradingTypeId: selectedType.tradingTypeId,
            tradingTypeOrder: selectedType.tradingTypeOrder,
            tradingTypeName: updatedName,
            tradingTypeIcon: 'testIcon',
            isActive: 'Y',
          });
          setSelectedItems([]);
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
        if (!newName.trim()) {
          alert('매매유형명이 입력되지않았습니다.');
          return;
        }
        addTradingType({
          tradingTypeName: newName,
          tradingTypeIcon: 'testIcon',
          isActive: 'Y',
        });
      },
    });
  };

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
        data={formattedData || []}
        selectedItems={selectedItems}
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
