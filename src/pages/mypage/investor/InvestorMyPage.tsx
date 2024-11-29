import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import ContentModal from '@/components/common/ContentModal';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import FolderHeader from '@/components/page/mypage-investor/myfolder/FolderHeader';
import FolderList from '@/components/page/mypage-investor/myfolder/FolderList';
import FolderModal from '@/components/page/mypage-investor/myfolder/FolderModal';
import { ROUTES } from '@/constants/routes';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';

interface folderDataProps {
  folderId: number;
  folderName: string;
  strategyCount: number;
  updatedAt: string;
}

const folderData: folderDataProps[] = [
  {
    folderId: 1,
    folderName: '기본 폴더',
    strategyCount: 10,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 2,
    folderName: '조금 생각해볼 전략',
    strategyCount: 2,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 3,
    folderName: '이번주 안에 투자할 전략',
    strategyCount: 17,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 4,
    folderName: '아무한테도 알려주기 싫은 전략',
    strategyCount: 15,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 5,
    folderName: '아무한테도 알려주기 싫은 전략',
    strategyCount: 15,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 6,
    folderName: '폴더가.. 이렇게 많아질까?..',
    strategyCount: 15,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 7,
    folderName: '굳굳 전략',
    strategyCount: 15,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 8,
    folderName: '아무한테도 알려주기 싫은 전략',
    strategyCount: 15,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 9,
    folderName: '집에 가고싶은 전략',
    strategyCount: 15,
    updatedAt: '2024.11.16',
  },
  {
    folderId: 10,
    folderName: '아무한테도 알려주기 싫은 전략',
    strategyCount: 15,
    updatedAt: '2024.11.16',
  },
];

const InvestorMyPage = () => {
  const { openContentModal } = useContentModalStore();
  const { openModal } = useModalStore();
  const { isToastVisible, showToast, hideToast, message } = useToastStore();
  const navigate = useNavigate();

  const handleFolderList = (folderId: string) => {
    navigate(ROUTES.MYPAGE.INVESTOR.FOLLOWING.STRATEGIES(folderId));
    window.scrollTo(0, 0);
  };

  const handleAddFolder = () => {
    openContentModal({
      title: '폴더 추가',
      content: <FolderModal />,
      onAction: () => {
        showToast('폴더 추가가 완료되었습니다.');
      },
    });
  };

  const handleUpdateFolder = () => {
    openContentModal({
      title: '폴더 수정',
      content: <FolderModal />,
      onAction: () => {
        showToast('폴더 수정이 완료되었습니다.');
      },
    });
  };

  const handleDeleteFolder = () => {
    openModal({
      type: 'warning',
      title: '폴더 삭제',
      desc: `폴더를 삭제하면 내부 전략들도 삭제됩니다.`,
      actionButton: '삭제',
      onAction: () => {
        showToast('폴더 삭제가 완료되었습니다.');
      },
    });
  };

  return (
    <div css={myPageWrapperStyle}>
      <FolderHeader folderCount={folderData.length} onAddFolder={handleAddFolder} />
      <div css={tableWrapperStyle}>
        <FolderList
          folderData={folderData}
          onFolderClick={handleFolderList}
          onEditFolder={handleUpdateFolder}
          onDeleteFolder={handleDeleteFolder}
        />
        <Pagination totalPage={5} limit={10} page={1} setPage={() => {}} />
      </div>
      <ContentModal />
      <Modal />
      {isToastVisible && <Toast message={message} onClose={hideToast} isVisible={isToastVisible} />}
    </div>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

export default InvestorMyPage;
