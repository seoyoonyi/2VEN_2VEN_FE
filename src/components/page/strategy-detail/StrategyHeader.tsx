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
  onDelete: (id: number) => void;
  onApproval: () => void;
}

export const StrategyHeader = ({
  id,
  strategyTitle,
  traderId = '71-88RZ_QQ65hMGknyWKLA', // 기본값으로 일단 설정하기!!!
  onDelete,
  onApproval,
}: StrategyHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore(); // store에서 user 정보 가져오기

  const handleMoveEditPage = (id: string) => {
    navigate(`${ROUTES.MYPAGE.TRADER.STRATEGIES.EDIT(id)}`);
  };

  // 문의기페이지로 데이터 정보 넘김(요게 스테이트!!!)
  const handleInquiryPage = () => {
    navigate(`${ROUTES.STRATEGY.INQUIRIES}`, {
      state: {
        strategyTitle, // 전달할 전략 제목
        strategyId: id, // 전달할 전략 ID
        traderId,
      },
    });
  };

  // 옵셔널
  // const handleInquiryPage = () => {
  //   navigate(`${ROUTES.STRATEGY.INQUIRIES}`, {
  //     state: {
  //       strategyTitle: strategy?.strategyTitle, // 전달할 전략 제목
  //       strategyId: strategy?.strategyId, // 전달할 전략 ID
  //       traderId: strategy?.traderId,
  //     },
  //   });
  // };

  const handleFollowingPage = () => {
    navigate(`${ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS}`);
  };

  const userRole = user?.role as UserRole; // 유저 지정

  return (
    <div css={actionAreaStyle}>
      <button css={shareButtonStyle}>
        <GiCircle size={40} css={circleStyle} />
        <MdOutlineShare size={16} css={shareStyle} />
      </button>
      {userRole === 'ROLE_TRADER' ? ( // 트레이더 전용 버튼
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
          <Button size='xs' width={120} onClick={onApproval}>
            승인요청
          </Button>
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
