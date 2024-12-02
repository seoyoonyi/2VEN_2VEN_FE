import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import ContentModal from '@/components/common/ContentModal';
import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import FolderHeader from '@/components/page/mypage-investor/myfolder/FolderHeader';
import FolderList from '@/components/page/mypage-investor/myfolder/FolderList';
import FolderModal from '@/components/page/mypage-investor/myfolder/FolderModal';
import { ROUTES } from '@/constants/routes';
import { useSubmitFolder } from '@/hooks/mutations/useFollwingStrategyMutation';
import { useFolderList } from '@/hooks/queries/useFetchFolderList';
import { useAuthStore } from '@/stores/authStore';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';

const InvestorMyPage = () => {
  const { openContentModal } = useContentModalStore();
  const { openModal } = useModalStore();
  const { isToastVisible, showToast, hideToast, message, type } = useToastStore();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  console.log(token);

  const { data, isLoading, isError } = useFolderList();
  const { mutate } = useSubmitFolder();

  let folderName = '';

  const handleFolderList = (folderId: string) => {
    navigate(ROUTES.MYPAGE.INVESTOR.FOLLOWING.STRATEGIES(folderId));
    window.scrollTo(0, 0);
  };

  const handleAddFolder = () => {
    openContentModal({
      title: '폴더 추가',
      content: (
        <FolderModal
          onChangeFolderName={(value) => {
            folderName = value;
          }}
        />
      ),
      onAction: () => {
        if (!folderName.trim()) {
          showToast('폴더명을 입력해주세요.', 'error');
          return false;
        }

        mutate(folderName, {
          onSuccess: () => {
            showToast('폴더 추가가 완료되었습니다.');
          },
          onError: () => {
            showToast('폴더 추가에 실패했습니다.', 'error');
          },
        });

        return true;
      },
    });
  };

  const handleUpdateFolder = () => {
    openContentModal({
      title: '폴더 수정',
      content: <FolderModal />,
      onAction: () => {
        showToast('폴더 수정이 완료되었습니다.');
        return true;
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
        return true;
      },
    });
  };

  if (isLoading) {
    return (
      <div css={tableWrapperStyle}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div css={tableWrapperStyle}>Error fetching folder list...</div>;
  }

  return (
    <div css={myPageWrapperStyle}>
      <FolderHeader folderCount={data.data.length} onAddFolder={handleAddFolder} />
      <div css={tableWrapperStyle}>
        <FolderList
          folderData={data.data}
          onFolderClick={handleFolderList}
          onEditFolder={handleUpdateFolder}
          onDeleteFolder={handleDeleteFolder}
        />
        <Pagination totalPage={5} limit={10} page={1} setPage={() => {}} />
      </div>
      <ContentModal />
      <Modal />
      {isToastVisible && (
        <Toast message={message} onClose={hideToast} isVisible={isToastVisible} type={type} />
      )}
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
