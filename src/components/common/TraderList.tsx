import { css } from '@emotion/react';
import { MdArrowForward } from 'react-icons/md';

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
            <div css={followerBadgeStyle}>{trader.followersCount}</div>
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
              <MdArrowForward size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2칸씩 표시 */
  gap: 24px; /* 카드 사이 간격 */
`;

const cardStyle = css`
  display: flex;
  align-items: center;
  background: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 4px;
  padding: 32px;
  gap: 16px;
`;

const badgeContainerStyle = css`
  position: relative; /* 배지를 이미지 위에 배치하기 위해 */
`;

const profileImageStyle = css`
  display: flex;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;

const followerBadgeStyle = css`
  position: absolute;
  bottom: -4px; /* 이미지의 오른쪽 아래 */
  right: -4px;
  width: 24px;
  height: 24px;
  background: ${theme.colors.teal[900]}; /* 배지 색상 */
  color: ${theme.colors.main.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px; /* 테마에 없음 */
  font-weight: ${theme.typography.fontWeight.bold};
  border: 1px solid ${theme.colors.main.white}; /* 배지 테두리 */
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

const emptyContainerStyle = css`
  text-align: center;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.typography.fontSizes.caption};
`;

export default TraderList;
