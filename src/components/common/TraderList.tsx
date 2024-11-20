import { css } from '@emotion/react';
import { MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import theme from '@/styles/theme';

interface TraderData {
  traderId: number;
  name: string;
  profileImage: string;
  description: string;
  strategiesCount: number;
  followersCount: number;
}

interface TraderListProps {
  traders: TraderData[];
}

const TraderList = ({ traders }: TraderListProps) => {
  const navigate = useNavigate();

  if (traders.length === 0) {
    return (
      <div css={emptyContainerStyle}>
        <p>등록된 트레이더가 없습니다</p>
      </div>
    );
  }

  return (
    <div css={containerStyle}>
      {traders.map((trader) => (
        <div css={cardStyle} key={trader.traderId}>
          {/* 좌측: 프로필 이미지 및 팔로워 */}
          <div css={badgeContainerStyle}>
            <img src={trader.profileImage} alt={`${trader.name} 프로필`} css={profileImageStyle} />
            {trader.followersCount > 0 && (
              <div css={followerBadgeStyle}>{trader.followersCount}</div>
            )}
          </div>
          <div css={infoContainerStyle}>
            <div css={nameStyle}>{trader.name}</div>
            <div css={descriptionStyle}>{trader.description}</div>
            <div css={statsStyle}>
              <span css={strategyCountStyle}>
                <span css={strategyTextStyle}>전략</span>
                <span css={separatorStyle}></span>
                <span css={strategyNumberStyle}>{trader.strategiesCount.toLocaleString()}개</span>
              </span>
              <MdArrowForward
                size={24}
                onClick={() => navigate(`/traders/${trader.traderId}`)} // 클릭 시 이동
                css={arrowIconStyle}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const cardStyle = css`
  display: flex;
  align-items: flex-start;
  background: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 4px;
  padding: 32px;
  gap: 16px;
  transition: outline-color ease; /* outline 효과 적용 */

  &:hover {
    outline: 2px solid ${theme.colors.teal[600]}; /* hover 시 outline 추가 */
    outline-offset: -1px; /* border와 일치하도록 offset 설정 */
    cursor: pointer;
  }
`;

const badgeContainerStyle = css`
  position: relative;
`;

const profileImageStyle = css`
  display: flex;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${theme.colors.gray[300]};
`;

const followerBadgeStyle = css`
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 24px;
  height: 24px;
  background: ${theme.colors.teal[900]};
  color: ${theme.colors.main.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px; /* 테마에 없음 */
  font-weight: ${theme.typography.fontWeight.bold};
  border: 1px solid ${theme.colors.main.white};
`;

const infoContainerStyle = css`
  flex: 1;
`;

const nameStyle = css`
  ${theme.textStyle.subtitles.subtitle3};
  color: ${theme.colors.gray[900]};
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const descriptionStyle = css`
  ${theme.textStyle.captions.caption2};
  color: ${theme.colors.gray[500]};
  height: 42px;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const statsStyle = css`
  color: ${theme.colors.gray[500]};
  font-size: ${theme.typography.fontSizes.caption};
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const strategyCountStyle = css`
  ${theme.textStyle.body.body1};
  color: ${theme.colors.gray[700]};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const strategyTextStyle = css`
  ${theme.textStyle.body.body1};
  color: ${theme.colors.gray[700]}; /* "전략" 텍스트 색상 */
`;

const separatorStyle = css`
  background: ${theme.colors.gray[400]};
  width: 1px;
  height: 20px;
`;

const strategyNumberStyle = css`
  ${theme.textStyle.body.body1};
  color: ${theme.colors.teal[600]}; /* 숫자 부분의 색상 설정 */
`;

const arrowIconStyle = css`
  cursor: pointer; /* 마우스 커서 변경 */
  &:hover {
    color: ${theme.colors.teal[600]}; /* 호버 시 색상 변경 */
  }
`;

const emptyContainerStyle = css`
  text-align: center;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.typography.fontSizes.caption};
`;

export default TraderList;
