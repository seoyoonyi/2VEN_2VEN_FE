import { css } from '@emotion/react';

import Checkbox from '@/components/common/Checkbox';

interface imgSectionProps {
  img: string;
  name: string;
  id: number;
  isSelected: boolean;
  isSelfed: boolean;
  onSelect: (id: number) => void;
}

const ImgSection = ({ img, id, name, isSelected, isSelfed, onSelect }: imgSectionProps) => (
  <div css={imgWrapper}>
    <div css={imgContent}>
      <img src={img} alt={img} css={imgSection} />
      {isSelfed ? (
        <Checkbox checked={isSelected ?? false} onChange={() => onSelect(id)}>
          <div>{name}</div>
        </Checkbox>
      ) : (
        <div>{name}</div>
      )}
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
export default ImgSection;
