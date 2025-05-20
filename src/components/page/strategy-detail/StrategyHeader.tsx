import { css } from '@emotion/react';
import { GiCircle } from 'react-icons/gi';
import { MdOutlineShare } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

import InvestorSection from './strategy-header/InvestorSection';

import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Toast from '@/components/common/Toast';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';
import { isAdmin, isStrategyOwner, isTrader } from '@/utils/statusUtils';

export interface StrategyHeaderProps {
  strategyId: number;
  strategyTitle: string;
  memberId: string;
  isApproved: string;
  isApprovedState: boolean;
  isTerminated: boolean;
  isFollowed: boolean;
  onDelete: (id: number) => void;
  onEnd: () => void;
  onApproval: () => void;
  refetch: () => void;
}

export const StrategyHeader = ({
  strategyId,
  strategyTitle,
  memberId,
  isApproved,
  isApprovedState,
  isTerminated,
  isFollowed: initialisFollowed,
  onEnd,
  onDelete,
  onApproval,
  refetch,
}: StrategyHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const userRole = user?.role as UserRole;
  const { showToast, type, message, hideToast, isToastVisible } = useToastStore();

  const handleMoveEditPage = (id: string) => {
    navigate(`${ROUTES.MYPAGE.TRADER.STRATEGIES.EDIT(id)}`);
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('클립보드에 링크가 복사되었습니다!', 'basic');
    } catch (error) {
      console.error('failed to copy currentPage');
      showToast('링크 복사에 실패했습니다.', 'error');
    }
  };

  return (
    <div css={actionAreaStyle}>
      {isApproved === 'Y' ? (
        <button
          css={shareButtonStyle}
          onClick={() => handleCopy(`${import.meta.env.VITE_FRONT_URL}${location.pathname}`)}
        >
          <GiCircle size={40} css={circleStyle} />
          <MdOutlineShare size={16} css={shareStyle} />
        </button>
      ) : (
        <div></div>
      )}
      {(isAdmin(userRole) && user?.authorized) ||
      (user && isTrader(userRole) && isStrategyOwner(memberId, user)) ? ( // 트레이더 전용 버튼
        <div css={buttonAreaStyle}>
          <Button size='xs' variant='secondaryGray' width={90} onClick={() => onDelete(strategyId)}>
            삭제
          </Button>
          {!isTerminated && (
            <>
              <Button
                size='xs'
                variant='neutral'
                width={90}
                onClick={() => {
                  handleMoveEditPage(String(strategyId));
                }}
              >
                수정
              </Button>
            </>
          )}
          {isApproved === 'P' ? (
            <Button size='xs' width={120} disabled>
              승인대기
            </Button>
          ) : isApproved === 'Y' ? (
            <Button size='xs' width={120} onClick={onEnd} disabled={isTerminated}>
              운용종료
            </Button>
          ) : (
            <Button size='xs' width={120} onClick={onApproval} disabled={!isApprovedState}>
              승인요청
            </Button>
          )}
        </div>
      ) : null}
      {userRole === 'ROLE_INVESTOR' && (
        <InvestorSection
          memberId={memberId}
          strategyId={strategyId}
          strategyTitle={strategyTitle}
          isFollowed={initialisFollowed}
          refetch={refetch}
        />
      )}
      <ContentModal />
      <Toast type={type} message={message} onClose={hideToast} isVisible={isToastVisible} />
    </div>
  );
};

const actionAreaStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const shareButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  cursor: pointer;
  margin-left: 8px;
  margin-bottom: 20px;
`;

const circleStyle = css`
  color: ${theme.colors.gray[400]};
  position: absolute;
`;

const shareStyle = css`
  color: ${theme.colors.gray[500]};
  position: relative;
  z-index: 1;
`;

const buttonAreaStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export default StrategyHeader;
