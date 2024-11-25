import { css } from '@emotion/react';
import { AiOutlineMore } from 'react-icons/ai';
import { VscFolder } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import DropdownMenu from '@/components/common/DropdownMenu';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import FolderModal from '@/components/page/mypage-investor/myfolder/FolderModal';
import { ROUTES } from '@/constants/routes';
import { useDropdown } from '@/hooks/useDropdown';
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
  const { activeDropdown, toggleDropdown, closeDropdown } = useDropdown();
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
      onAction: () => console.log('폴더 추가'),
    });
  };

  const handleUpdateFolder = () => {
    openContentModal({
      title: '폴더 수정',
      content: <FolderModal />,
      onAction: () => {
        console.log('폴더 수정');
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
        console.log('폴더 삭제');
        showToast('폴더 삭제가 완료되었습니다.');
      },
    });
  };

  const dropdownActions = [
    {
      label: '폴더명 수정',
      onClick: (folderId: string) => {
        handleUpdateFolder();
      },
    },
    {
      label: '폴더 삭제',
      onClick: () => {
        handleDeleteFolder();
      },
    },
  ];

  return (
    <div css={myPageWrapperStyle}>
      <div css={myPageHeaderStyle}>
        <h2>나의 관심 전략</h2>
        <p>
          총 <span>{folderData.length}</span>개의 폴더가 있습니다
        </p>
        <Button variant='secondary' size='xs' css={buttonStyle} onClick={handleAddFolder}>
          +폴더추가
        </Button>
      </div>
      <div css={tableWrapperStyle}>
        <div>
          <div css={headerStyle}>
            <div css={folderNameStyle}>폴더이름</div>
            <div>전략갯수</div>
            <div>수정일자</div>
            <div>
              <AiOutlineMore />
            </div>
          </div>
          {folderData.map((folder) => (
            <div
              role='button'
              tabIndex={0}
              onClick={() => handleFolderList(String(folder.folderId))}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFolderList(String(folder.folderId));
                }
              }}
              key={folder.folderId}
            >
              <div css={rowStyle}>
                <div css={folderNameStyle}>
                  <VscFolder size={20} color={theme.colors.gray[400]} />
                  {folder.folderName}
                </div>
                <div>{folder.strategyCount}</div>
                <div>{folder.updatedAt}</div>
                <DropdownMenu
                  isActive={activeDropdown === folder.folderId}
                  toggleDropdown={() => toggleDropdown(folder.folderId)}
                  actions={dropdownActions.map((action) => ({
                    label: action.label,
                    handleClick: () => {
                      action.onClick(String(folder.folderId));
                      closeDropdown();
                    },
                  }))}
                />
              </div>
            </div>
          ))}
        </div>
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

const myPageHeaderStyle = css`
  margin-bottom: 40px;
  position: relative;

  h2 {
    ${theme.textStyle.headings.h3}
    margin-bottom: 8px;
  }

  p {
    ${theme.textStyle.body.body3}

    span {
      color: ${theme.colors.main.primary};
    }
  }
`;

const buttonStyle = css`
  position: absolute;
  padding: 0 32px;
  right: 0;
  bottom: 0;
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

const rowStyle = css`
  display: grid;
  grid-template-columns: 505px 160px 160px 50px;
  align-items: center;
  height: 64px;
  background: ${theme.colors.main.white};
  color: ${theme.colors.gray[900]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  text-align: center;
  line-height: ${theme.typography.lineHeights.lg};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.teal[50]};
  }
`;

const headerStyle = css`
  ${rowStyle};
  height: 56px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: default;

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;

const folderNameStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
`;
export default InvestorMyPage;
