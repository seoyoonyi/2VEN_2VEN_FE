import { css } from '@emotion/react';

interface IconTagProps {
  img: string;
}

interface IconTagSectionProps {
  imgs: IconTagProps[];
}

const IconTagSection = ({ imgs }: IconTagSectionProps) => (
  <div css={tagAreaStyle}>
    {imgs.map((item, idx) => (
      <div key={idx} css={tagStyle}>
        <img src={item.img} alt={`icon-${idx}`} css={tagStyle} />
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
  height: 22px;
  align-items: center;
  justify-content: center;
`;

export default IconTagSection;
