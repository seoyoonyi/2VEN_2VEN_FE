import { css } from '@emotion/react';
import { GiCircle } from 'react-icons/gi';
import { MdOutlineShare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';

interface StrategyHeaderProps {
  id: number;
  strategyTitle: string;
  traderId: string;
  isStrategyApproved: string;
  isApprovedState: boolean;
  onDelete: (id: number) => void;
  onApproval: () => void;
}

export const StrategyHeader = ({
  id,
  strategyTitle,
  traderId,
  isStrategyApproved,
  isApprovedState,
  onDelete,
  onApproval,
}: StrategyHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const userRole = user?.role as UserRole; // 유저 지정

  const handleMoveEditPage = (id: string) => {
    navigate(`${ROUTES.MYPAGE.TRADER.STRATEGIES.EDIT(id)}`);
  };

  const handleInquiryPage = () => {
    navigate(`${ROUTES.STRATEGY.INQUIRIES}`, {
      state: {
        strategyTitle,
        strategyId: id,
        traderId,
      },
    });
  };

  const handleFollowingPage = () => {
    navigate(`${ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS}`);
  };

  return (
    <div css={actionAreaStyle}>
      <button css={shareButtonStyle}>
        <GiCircle size={40} css={circleStyle} />
        <MdOutlineShare size={16} css={shareStyle} />
      </button>
      {userRole === 'ROLE_ADMIN' || (userRole === 'ROLE_TRADER' && user?.memberId === traderId) ? ( // 트레이더 전용 버튼
        <div css={buttonAreaStyle}>
          <Button size='xs' variant='secondaryGray' width={90} onClick={() => onDelete(id)}>
            삭제
          </Button>
          <Button
            size='xs'
            variant='neutral'
            width={90}
            onClick={() => {
              handleMoveEditPage(String(id));
            }}
          >
            수정
          </Button>
          {isStrategyApproved === 'P' ? (
            <Button size='xs' width={120} disabled>
              승인대기
            </Button>
          ) : (
            <Button size='xs' width={120} onClick={onApproval} disabled={!isApprovedState}>
              승인요청
            </Button>
          )}
        </div>
      ) : (
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
          <Button
            size='sm'
            variant='primary'
            width={124}
            onClick={() => {
              handleFollowingPage();
            }}
          >
            전략 팔로우
          </Button>
        </div>
      )}
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
