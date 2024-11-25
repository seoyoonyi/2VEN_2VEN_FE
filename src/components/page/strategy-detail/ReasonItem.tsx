import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface RejectReasonProps {
  title: string;
  admin: string;
  adminImg: string;
  content: string;
}
const ReasonItem = ({ title, admin, adminImg, content }: RejectReasonProps) => (
  <div css={reasonStyle}>
    <div css={headerStyle}>
      <div css={titleStyle}>{title}</div>
      <div css={adminStyle}>
        <img src={adminImg} alt={admin} css={imgStyle} />
        <div>{admin}</div>
      </div>
    </div>
    <div css={contentStyle}>{content}</div>
  </div>
);

const reasonStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: ${theme.layout.width.content};
  background-color: ${theme.colors.main.white};
  padding: 40px 40px 48px;
  border-radius: 8px;
  margin-top: 95px;
  margin-bottom: -63px;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const titleStyle = css`
  ${theme.textStyle.subtitles.subtitle1}
  color: #ea580c;
`;

const adminStyle = css`
  display: flex;
  gap: 8px;
  ${theme.textStyle.body.body2};
`;

const imgStyle = css`
  width: 24px;
  height: 24px;
  border-radius: 24px;
`;

const contentStyle = css`
  ${theme.textStyle.body.body3};
  background-color: ${theme.colors.gray[50]};
  white-space: pre-wrap;
  padding: 12px;
`;
export default ReasonItem;
