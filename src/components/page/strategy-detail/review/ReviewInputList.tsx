import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import ReviewItem from '@/components/page/strategy-detail/review/ReviewItem';
import theme from '@/styles/theme';

interface Review {
  id: number;
  writerId: string;
  profileImg: string;
  content: string;
  date: string;
}

interface ReviewInputListProps {
  reviews: Review[];
  writerId: string;
  profileImg: string;
  onAddReview: (newReview: Review) => void;
  onEditReview: (id: number, updatedContent: string) => void;
  onDeleteReview: (id: number) => void;
}

const ReviewInputList = ({
  reviews,
  writerId,
  profileImg,
  onAddReview,
  onEditReview,
  onDeleteReview,
}: ReviewInputListProps) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddButtonClick = () => {
    if (!inputValue.trim()) return;

    // 리뷰 등록
    const newReview: Review = {
      id: Date.now(),
      writerId,
      profileImg,
      content: inputValue.trim(),
      date: new Date().toISOString().split('T')[0],
    };

    setInputValue('');

    if (onAddReview) {
      onAddReview(newReview);
    }
  };

  return (
    <div>
      {/* 리뷰 입력창 */}
      <div css={inputContainerStyle}>
        <input
          type='text'
          value={inputValue}
          onChange={onInputChange}
          placeholder='내용을 입력해주세요'
          css={inputStyle}
        />
        <Button
          variant='primary'
          size='sm'
          width={110}
          disabled={!inputValue.trim()}
          onClick={handleAddButtonClick}
        >
          등록
        </Button>
      </div>

      <div css={reviewListStyle}>
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            writerId={writerId}
            onEdit={onEditReview || (() => {})}
            onDelete={onDeleteReview || (() => {})}
          />
        ))}
      </div>
    </div>
  );
};

const inputContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const inputStyle = css`
  ${theme.textStyle.body.body3};
  flex: 1;
  resize: none;
  height: ${theme.input.height.md};
  padding: ${theme.input.padding.md};
  font-size: ${theme.input.fontSize.md};
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
  }

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }
`;

const reviewListStyle = css`
  margin-top: 24px;
`;

export default ReviewInputList;
