import { css } from '@emotion/react';

import Checkbox from '@/components/common/Checkbox';

interface imgSectionProps {
  img: string;
  name: string;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

const ImgSection = ({ img, name, isSelected, onSelect }: imgSectionProps) => (
  <div css={imgWrapper}>
    <div css={imgContent}>
      <img src={img} alt={img} css={imgSection} />
      <Checkbox checked={isSelected} onChange={onSelect}>
        <div css={imgName}>{name}</div>
      </Checkbox>
    </div>
  </div>
);

const imgWrapper = css`
  display: flex;
  margin: 20px 0px 40px;
  align-items: center;
`;

const imgSection = css`
  width: 225px;
  height: 163px;
  object-fit: cover;
`;
const imgContent = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const imgName = css``;
export default ImgSection;
