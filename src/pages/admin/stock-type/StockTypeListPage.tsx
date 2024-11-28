import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import FileInput from '@/components/page/admin/FileInput';
import TypeTable from '@/components/page/admin/TypeTable';
import {
  useDeleteInvestmentAssets,
  usePostInvestmentAssets,
  usePutInvestmentAssets,
} from '@/hooks/mutations/useStockType';
import {
  useFetchDetailInvestmentType,
  useFetchInvestmentList,
} from '@/hooks/queries/useFetchStockType';
import usePagination from '@/hooks/usePagination';
import { useAuthStore } from '@/stores/authStore';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { InvestmentAssetProps } from '@/types/admin';
import { UserRole } from '@/types/route';

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
  const { token, user } = useAuthStore();
  const { pagination, setPage } = usePagination(1, 10);
  const [selectedStocks, setSelectedStocks] = useState<number[]>([]);
  const [stockId, setStockId] = useState<number | null>(null);
  const { investmentList, currentPage, totalPages, pageSize, isLoading } = useFetchInvestmentList(
    pagination.currentPage - 1,
    pagination.pageSize,
    user?.role as UserRole
  );
  const { mutate: addInvestmentAssets } = usePostInvestmentAssets();
  const { mutate: deleteInvestmentAssets } = useDeleteInvestmentAssets();
  const { mutate: updateInvestmentAssets } = usePutInvestmentAssets();
  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();

  const { investmentDetail, iconName } = useFetchDetailInvestmentType(
    stockId as number,
    user?.role as UserRole
  );

  const formattedData = investmentList?.map((item: InvestmentAssetProps) => ({
    id: item.investmentAssetClassesId || investmentList.length + 1,
    title: item.investmentAssetClassesName,
    icon: item.investmentAssetClassesIcon,
  }));

  const handleSelectChange = (selectedIdx: number[]) => {
    setSelectedStocks(selectedIdx);
  };

  const handleDelete = () => {
    if (!user) return;
    if (selectedStocks.length > 0) {
      openModal({
        type: 'warning',
        title: '이미지 삭제',
        desc: `선택하신 ${selectedStocks.length}개의 유형을 삭제하시겠습니까?`,
        onAction: () => {
          selectedStocks.forEach((id) => {
            const stockItem = investmentList?.find(
              (item: InvestmentAssetProps) => item.investmentAssetClassesId === id
            );
            if (stockItem) {
              deleteInvestmentAssets({
                investmentTypeId: stockItem.investmentAssetClassesId,
                role: user?.role,
                fileUrl: stockItem.nvestmentAssetClassesIcon,
              });
            }
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
    if (!user) return;
    let newName: string = '';
    let selectedIcon: string = '';
    openContentModal({
      title: '상품유형 등록',
      content: (
        <FileInput
          mode='upload'
          role={user.role}
          token={token}
          title='상품유형'
          fname={''}
          icon={''}
          iconName={''}
          onNameChange={(name) => {
            newName = name;
          }}
          onFileIconUrl={(newIcon) => {
            selectedIcon = newIcon;
          }}
        />
      ),
      onAction: () => {
        if (!newName.trim()) {
          alert('상품유형명이 입력되지않았습니다.');
          return;
        }
        if (isCheckDupicateName(newName, 1, investmentList)) {
          alert('이미 존재하는 상품유형입니다.');
          return;
        }
        addInvestmentAssets({
          data: {
            investmentAssetClassesName: newName,
            investmentAssetClassesIcon: selectedIcon,
            isActive: 'Y',
          },
          role: user.role,
        });
      },
    });
  };

  const handleEdit = (id: number) => {
    if (!id) return;
    setStockId(id);
  };

  if (isLoading) {
    <Loader />;
  }

  useEffect(() => {
    if (!user) return;
    if (investmentDetail) {
      let updatedName = investmentDetail.investmentAssetClassesName;
      let updatedIcon = investmentDetail.investmentAssetClassesIcon;
      openContentModal({
        title: '상품유형 수정',
        content: (
          <FileInput
            mode='update'
            role={user.role}
            token={token}
            title='상품유형'
            fname={investmentDetail.investmentAssetClassesName}
            icon={investmentDetail.investmentAssetClassesIcon}
            iconName={iconName}
            onNameChange={(name) => (updatedName = name)}
            onFileIconUrl={(newIcon) => {
              updatedIcon = newIcon;
            }}
          />
        ),
        onAction: () => {
          if (!updatedName.trim()) {
            alert('상품유형명이 입력되지않았습니다.');
            return;
          }
          updateInvestmentAssets({
            data: {
              investmentAssetClassesId: investmentDetail.investmentAssetClassesId,
              investmentAssetClassesName: updatedName,
              investmentAssetClassesIcon: updatedIcon,
              isActive: 'Y',
            },
            role: user.role,
          });
        },
      });
    }
  }, [investmentDetail]);

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
      <div css={tableWrapper}>
        <TypeTable
          attributes={stockAttributes}
          data={formattedData || []}
          selectedItems={selectedStocks}
          onSelectChange={handleSelectChange}
          onEdit={handleEdit}
        />
        <Pagination
          totalPage={totalPages}
          limit={pageSize}
          page={currentPage + 1}
          setPage={setPage}
        />
      </div>
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

const tableWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 56px;
`;

export default StockTypeListPage;
