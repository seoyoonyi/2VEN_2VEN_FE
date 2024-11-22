import { useState } from 'react';

import { css } from '@emotion/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchInvestmentTypes } from '@/api/stockType';
import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import FileInput from '@/components/page/admin/FileInput';
import TypeTable from '@/components/page/admin/TypeTable';
import {
  useDeleteInvestmentAssets,
  usePostInvestmentAssets,
  usePutInvestmentAssets,
} from '@/hooks/mutations/useStockType';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { InvestmentAssetProps } from '@/types/admin';

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
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPage: 0,
    totalElements: 0,
    pageSize: 10,
  });
  const [selectedStocks, setSelectedStocks] = useState<number[]>([]);
  const { mutate: addInvestmentAssets } = usePostInvestmentAssets();
  const { mutate: deleteInvestmentAssets } = useDeleteInvestmentAssets();
  const { mutate: updateInvestmentAssets } = usePutInvestmentAssets();
  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();

  const { data } = useQuery<InvestmentAssetProps[], Error>({
    queryKey: ['investmentTypes', paginationData.currentPage, paginationData.pageSize],
    queryFn: async () => {
      try {
        const res = await fetchInvestmentTypes(
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
      } catch (error) {
        console.error('failed to fetch investmentTypes', error);
        throw error;
      }
    },
    placeholderData: keepPreviousData,
  });

  const formattedData = data?.map((item) => ({
    id: item.investmentAssetClassesId || data.length + 1,
    title: item.investmentAssetClassesName,
    icon: item.investmentAssetClassesIcon,
  }));

  const handleSelectChange = (selectedIdx: number[]) => {
    setSelectedStocks(selectedIdx);
  };

  const handlePageChange = (page: number) => {
    setPaginationData((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleDelete = () => {
    if (selectedStocks.length > 0) {
      openModal({
        type: 'warning',
        title: '이미지 삭제',
        desc: `선택하신 ${selectedStocks.length}개의 유형을 삭제하시겠습니까?`,
        onAction: () => {
          selectedStocks.forEach((id) => {
            deleteInvestmentAssets(id);
          });
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

  const isCheckDupicateName = (
    newName: string,
    id: number | undefined = -1,
    data?: InvestmentAssetProps[]
  ): boolean => {
    if (!data || !id) return false;
    return data.some((item) => item.investmentAssetClassesName === newName);
  };

  const handleUpload = () => {
    let newName: string = '';
    openContentModal({
      title: '상품유형 등록',
      content: (
        <FileInput
          title='상품유형'
          file={null}
          fname={''}
          icon={''}
          onNameChange={(name) => {
            newName = name;
          }}
        />
      ),
      onAction: () => {
        if (!newName.trim()) {
          alert('상품유형명이 입력되지않았습니다.');
          return;
        }
        if (isCheckDupicateName(newName, 1, data)) {
          alert('이미 존재하는 상품유형입니다.');
          return;
        }
        addInvestmentAssets({
          investmentAssetClassesName: newName,
          investmentAssetClassesIcon: 'testIcon',
          isActive: 'Y',
        });
      },
    });
  };

  const handleEdit = (id: number) => {
    const selectedType = data?.find((item) => item.investmentAssetClassesId === id);
    if (selectedType) {
      let updatedName = selectedType.investmentAssetClassesName;
      openContentModal({
        title: '매매유형 수정',
        content: (
          <FileInput
            title='매매유형'
            file={null}
            fname={selectedType.investmentAssetClassesName}
            icon={selectedType.investmentAssetClassesIcon}
            onNameChange={(name) => (updatedName = name)}
          />
        ),
        onAction: () => {
          if (!updatedName.trim()) {
            alert('상품유형명이 입력되지않았습니다.');
            return;
          }
          if (isCheckDupicateName(updatedName, selectedType.investmentAssetClassesId, data)) {
            alert('이미 존재하는 상품유형입니다.');
            return;
          }
          updateInvestmentAssets({
            investmentAssetClassesId: selectedType.investmentAssetClassesId,
            investmentAssetClassesName: updatedName,
            investmentAssetClassesIcon: 'testIcon',
            isActive: 'Y',
          });
          setSelectedStocks([]);
        },
      });
    }
  };

  return (
    <>
      <div css={adminHeaderStyle}>
        <h2>상품유형 관리</h2>
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
        data={formattedData || []}
        selectedItems={selectedStocks}
        onSelectChange={handleSelectChange}
        onEdit={handleEdit}
        customStyle={tabletyle}
      />
      <Pagination
        totalPage={paginationData.totalPage}
        limit={paginationData.pageSize}
        page={paginationData.currentPage}
        setPage={handlePageChange}
      />
      <Modal />
      <ContentModal />
    </>
  );
};

const adminHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
  }
`;

const buttonArea = css`
  display: flex;
  gap: 8px;
`;

const tabletyle = css`
  width: 875px;
`;

export default StockTypeListPage;
