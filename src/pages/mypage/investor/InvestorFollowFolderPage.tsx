import { useState } from 'react';

import { css } from '@emotion/react';

import ContentModal from '@/components/common/ContentModal';
import Pagination from '@/components/common/Pagination';
import StrategyList from '@/components/common/StrategyList';
import Toast from '@/components/common/Toast';
import FolderModal from '@/components/page/mypage-investor/myfolder/FolderModal';
import useFetchStrategyList from '@/hooks/queries/useFetchStrategyList';
import useContentModalStore from '@/stores/contentModalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';

const InvestorFollowFolderPage = () => {
  const { openContentModal } = useContentModalStore();
  const { isToastVisible, showToast, hideToast, message } = useToastStore();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data } = useFetchStrategyList({
    page: page - 1,
    pageSize: limit,
  });

  const handleMoveFolder = () => {
    openContentModal({
      title: '폴더 이동',
      content: <FolderModal isMove={true} />,
      onAction: () => {
        console.log('폴더 이동');
        showToast('폴더 이동이 완료되었습니다.');
        return true;
      },
    });
  };

  const dropdownActions = [
    {
      label: '폴더 이동',
      onClick: () => {
        handleMoveFolder();
      },
    },
    {
      label: '전략 언팔로우',
      onClick: () => {
        console.log('전략 언팔로우');
        showToast('전략을 언팔로우했습니다.');
        return true;
      },
    },
  ];

  return (
    <div css={myPageWrapperStyle}>
      <div>
        <div css={myPageHeaderStyle}>
          <div css={folderInfoStyle}>
            나의관심전략 &gt; <span>기본폴더</span>
          </div>
          <h2>기본폴더</h2>
          <p>
            총 <span>10</span>개의 전략이 있습니다
          </p>
          <div />
        </div>
        <div css={tableWrapperStyle}>
          <StrategyList
            strategies={data.data}
            containerWidth='875px'
            gridTemplate='255px 150px 140px 120px 80px 80px 50px'
            moreMenu
            dropdownActions={dropdownActions}
          />
          <Pagination totalPage={data.totalPages} limit={limit} page={page} setPage={setPage} />
        </div>
      </div>
      <ContentModal />
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
  margin-bottom: 32px;

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

const folderInfoStyle = css`
  color: ${theme.colors.gray[500]};
  text-align: right;
  font-weight: 400;
  margin-bottom: 4px;

  span {
    color: ${theme.colors.gray[700]};
  }
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

export default InvestorFollowFolderPage;
