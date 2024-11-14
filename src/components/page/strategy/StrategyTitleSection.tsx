import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import theme from '@/styles/theme';

interface TitleProps {
  title: string;
  author: {
    traderId: string;
    traderName: string;
    imgUrl: string;
  };
  date: string;
  followers: number;
}

const StrategyTitleSection = ({ title, author, date, followers }: TitleProps) => {
  const navigate = useNavigate();

  const handleMoveProfile = (traderId: string) => {
    navigate(`/traders/${traderId}`);
  };

  return (
    <div css={containerStyle}>
      <div css={tagAreaStyle}>
        <div css={tagStyle}>태그</div>
        <div css={tagStyle}>태그2</div>
      </div>

      <div css={titleAreaStyle}>
        <div css={infoAreaStyle}>
          <div css={titleStyle}>{title}</div>

          <div css={authorInfoStyle}>
            <button onClick={() => handleMoveProfile(author.traderId)} css={authorDetailsStyle}>
              <img src={author.imgUrl} alt={author.traderName} css={authorImageStyle} />
              <span css={authorNameStyle}>{author.traderName}</span>
            </button>
            <span css={postDateStyle}>작성일자 {date}</span>
          </div>
        </div>

        <div css={followerAreaStyle}>
          <div css={followerTextStyle}>팔로워</div>
          <div>{followers}</div>
          <div css={editDeleteStyle}>
            <span css={editStyle}>수정</span>
            <span css={deleteStyle}>삭제</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
`;

const tagAreaStyle = css`
  display: flex;
  gap: 8px;
`;

const tagStyle = css`
  display: flex;
  padding: 0px 10px;
  height: 21px;
  align-items: center;
  justify-content: center;
  font-size: ${theme.buttons.label.sm.fontSize};
  font-weight: ${theme.buttons.label.lg.fontWeight};
  line-height: ${theme.buttons.label.lg.lineHeight};
  background-color: ${theme.colors.teal[100]};
`;

const titleAreaStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const infoAreaStyle = css`
  display: flex;
  flex-direction: column;
  width: 921px;
`;

const titleStyle = css`
  ${theme.textStyle.headings.h3};
`;

const authorInfoStyle = css`
  gap: 8px;
`;

const authorDetailsStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  gap: 8px;
  background: none;
  border: none;
  margin: 0;
  cursor: pointer;
  outline: none;
`;

const authorImageStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  object-fit: cover;
`;

const authorNameStyle = css`
  ${theme.textStyle.subtitles.subtitle2};
`;

const postDateStyle = css`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.gray[400]};
  ${theme.textStyle.captions.caption2};
`;

const followerAreaStyle = css`
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: center;
  margin-top: 3px;
  ${theme.textStyle.subtitles.subtitle2};
`;

const followerTextStyle = css`
  font-size: ${theme.buttons.label.md.fontSize};
  font-weight: ${theme.buttons.label.sm.fontWeight};
`;

const editDeleteStyle = css`
  display: flex;
  margin-top: 15px;
  gap: 13px;
`;

const editStyle = css`
  cursor: pointer;
  color: ${theme.colors.gray[400]};
  font-size: ${theme.buttons.label.md.fontSize};
  font-weight: ${theme.buttons.label.sm.fontWeight};

  &:hover {
    color: ${theme.colors.main.black};
  }
`;

const deleteStyle = css`
  cursor: pointer;
  color: ${theme.colors.gray[400]};
  font-size: ${theme.buttons.label.md.fontSize};
  font-weight: ${theme.buttons.label.sm.fontWeight};

  &:hover {
    color: ${theme.colors.main.black};
  }
`;

export default StrategyTitleSection;
