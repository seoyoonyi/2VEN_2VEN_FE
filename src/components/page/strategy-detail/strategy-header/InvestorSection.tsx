import { useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { followStrategy, unfollowStrategy } from '@/api/follow';
import Button from '@/components/common/Button';
import FollowModal from '@/components/page/mypage-investor/myfolder/FollowModal';
import { StrategyHeaderProps } from '@/components/page/strategy-detail/StrategyHeader';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import useContentModalStore from '@/stores/contentModalStore';
import useToastStore from '@/stores/toastStore';

interface InvestorSectionProps
  extends Pick<
    StrategyHeaderProps,
    'strategyId' | 'strategyTitle' | 'memberId' | 'isFollowed' | 'refetch'
  > {}

const InvestorSection = ({
  strategyId,
  strategyTitle,
  memberId,
  isFollowed: initialisFollowed,
  refetch,
}: InvestorSectionProps) => {
  const { user } = useAuthStore();
  const [isFollowed, setisFollowed] = useState(initialisFollowed);
  const navigate = useNavigate();
  const { openContentModal } = useContentModalStore();
  const { showToast } = useToastStore();

  const handleInquiryPage = () => {
    navigate(`${ROUTES.STRATEGY.INQUIRIES}`, {
      state: {
        strategyTitle,
        strategyId,
        memberId,
      },
    });
  };

  const handleFollowingPage = () => {
    if (!user) {
      showToast('로그인이 필요한 서비스 입니다.', 'error');
      navigate(ROUTES.AUTH.SIGNIN);
      return;
    }
    let selectedFolderId = '';

    openContentModal({
      title: '전략 팔로우',
      content: (
        <FollowModal
          onFolderSelect={(folderId) => {
            selectedFolderId = folderId;
          }}
        />
      ),
      onAction: () => {
        if (!selectedFolderId) {
          showToast('폴더를 선택해주세요.', 'error');
          return false;
        }

        followStrategy(selectedFolderId, strategyId.toString())
          .then(() => {
            showToast('전략이 폴더에 성공적으로 추가되었습니다.');
            setisFollowed(true);
            refetch();
          })
          .catch(() => {
            showToast('이미 폴더에 추가된 전략입니다.', 'error');
          });

        return true;
      },
    });
  };

  const handleUnfollow = async () => {
    try {
      await unfollowStrategy(strategyId);
      showToast('전략이 언팔로우되었습니다.');
      setisFollowed(false);
      refetch();
    } catch (error) {
      showToast('전략 언팔로우에 실패했습니다.', 'error');
    }
  };

  return (
    <div css={buttonAreaStyle}>
      <Button
        size='sm'
        variant='accent'
        width={114}
        onClick={() => {
          handleInquiryPage();
        }}
      >
        문의하기
      </Button>
      {isFollowed ? (
        <Button size='sm' variant='neutral' width={124} onClick={handleUnfollow}>
          전략 언팔로우
        </Button>
      ) : (
        <Button size='sm' variant='primary' width={124} onClick={handleFollowingPage}>
          전략 팔로우
        </Button>
      )}
    </div>
  );
};

const buttonAreaStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default InvestorSection;
