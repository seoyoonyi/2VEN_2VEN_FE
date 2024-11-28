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
  useAddTradingType,
  useDeleteTradingType,
  usePutTradingType,
} from '@/hooks/mutations/useTradingType';
import {
  useFetchDetailTradingType,
  useFetchtradingList,
} from '@/hooks/queries/useFetchTradingType';
import usePagination from '@/hooks/usePagination';
import { useAuthStore } from '@/stores/authStore';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { TradingTypeProps } from '@/types/admin';
import { UserRole } from '@/types/route';

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
  const { token, user } = useAuthStore();
  const { pagination, setPage } = usePagination(1, 10);
  const { tradingList, currentPage, totalPages, pageSize, isLoading } = useFetchtradingList(
    pagination.currentPage - 1,
    pagination.pageSize,
    user?.role as UserRole
  );
  const { mutate: deleteTradingType } = useDeleteTradingType();
  const { mutate: addTradingType } = useAddTradingType();
  const { mutate: updateTradingType } = usePutTradingType();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [tradingId, setTradingId] = useState<number | null>(null);

  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();

  const { tradingDetail, iconName } = useFetchDetailTradingType(
    tradingId as number,
    user?.role as UserRole
  );

  console.log(tradingList);

  const formattedData = tradingList.map((item: TradingTypeProps) => ({
    id: item.tradingTypeId || tradingList.length + 1,
    icon: item.tradingTypeIcon,
    title: item.tradingTypeName,
  }));

  const handleSelectChange = (selectedIdx: number[]) => {
    setSelectedItems(selectedIdx);
  };

  const handleDelete = () => {
    if (!user) return;
    if (selectedItems.length > 0) {
      openModal({
        type: 'warning',
        title: '매매유형 삭제',
        desc: `선택하신 ${selectedItems.length}개의 유형을 삭제하시겠습니까?`,
        onAction: () => {
          selectedItems.forEach((id) => {
            const tradingItem = formattedData?.find(
              (item: TradingTypeProps) => item.tradingTypeId === id
            );
            if (tradingItem) {
              deleteTradingType({
                tradingTypeId: tradingItem.id,
                role: user?.role,
                fileUrl: tradingItem.icon,
              });
            }
          });
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
    if (!id) return;
    setTradingId(id);
  };

  const handleUpload = () => {
    if (!user) return;
    let newName: string = '';
    let newIcon: string = '';
    openContentModal({
      title: '매매유형 등록',
      content: (
        <FileInput
          mode='upload'
          role={user.role}
          token={token}
          title='매매유형'
          fname={''}
          icon={''}
          iconName={''}
          onNameChange={(name) => {
            newName = name;
          }}
          onFileIconUrl={(icon) => {
            newIcon = icon;
          }}
        />
      ),
      onAction: async () => {
        if (!newName.trim()) {
          alert('매매유형명이 입력되지않았습니다.');
          return;
        }
        addTradingType({
          data: {
            tradingTypeName: newName,
            tradingTypeIcon: newIcon,
            isActive: 'Y',
          },
          role: user.role,
        });
      },
    });
  };

  if (isLoading) {
    <Loader />;
  }

  useEffect(() => {
    if (!user) return;
    if (tradingDetail && tradingId !== null) {
      let updatedName = tradingDetail.tradinggTypeName;
      let updatedIcon = tradingDetail.tradingTypeIcon;
      openContentModal({
        title: '매매유형 수정',
        content: (
          <FileInput
            mode='update'
            role={user.role}
            token={token}
            title='매매유형'
            fname={tradingDetail.tradingTypeName}
            icon={tradingDetail.tradingTypeIcon}
            iconName={iconName}
            onNameChange={(name) => (updatedName = name)}
            onFileIconUrl={(icon) => (updatedIcon = icon)}
          />
        ),
        onAction: () => {
          if (!updatedName.trim()) {
            alert('매매유형명이 입력되지않았습니다.');
            return;
          }
          updateTradingType({
            data: {
              tradingTypeId: tradingDetail.tradingTypeId,
              tradingTypeOrder: tradingDetail.tradingTypeOrder,
              tradingTypeName: updatedName,
              tradingTypeIcon: updatedIcon,
              isActive: 'Y',
            },
            role: user.role,
          });
        },
      });
    }
  }, [tradingId, tradingDetail]);

  return (
    <>
      <div css={adminHeaderStyle}>
        <h2>매매유형 관리</h2>
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
          attributes={tradeAttributes}
          data={formattedData || []}
          selectedItems={selectedItems}
          onSelectChange={handleSelectChange}
          onEdit={handleEdit}
        />
        <Pagination totalPage={totalPages} limit={pageSize} page={currentPage} setPage={setPage} />
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

export default TradingTypeListPage;
