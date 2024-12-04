import { css } from '@emotion/react';

interface IconTagSectionProps {
  imgs: string[];
}

const IconTagSection = ({ imgs }: IconTagSectionProps) => (
  <div css={tagAreaStyle}>
    {imgs.map((item, idx) => (
      <div key={idx} css={tagStyle}>
        <img src={item} alt={`icon-${idx}`} css={tagStyle} />
      </div>
    ))}
  </div>
);

const tagAreaStyle = css`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const tagStyle = css`
  display: flex;
  max-width: 100px;
  height: 25px;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export default IconTagSection;
