import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import ReviewItem from '@/components/page/strategy-detail/review/ReviewItem';
import theme from '@/styles/theme';

interface Review {
  id: number;
  writerId: string; // 작성자 ID
  profileImg: string; // 프로필 이미지 URL
  content: string;
  date: string;
}

interface ReviewInputListProps {
  reviews: Review[]; // 부모에서 전달받은 리뷰 데이터
  writerId: string;
  profileImg: string;
  onAddReview: (newReview: Review) => void; // 리뷰 추가 콜백
  onEditReview: (id: number, updatedContent: string) => void; // 리뷰 수정 콜백
  onDeleteReview: (id: number) => void; // 리뷰 삭제 콜백
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
    setInputValue(e.target.value); // 입력값 업데이트
  };

  const handleAddButtonClick = () => {
    if (!inputValue.trim()) return;

    // 새로운 리뷰 생성
    const newReview: Review = {
      id: Date.now(), // 고유 ID 생성
      writerId, // 작성자 ID
      profileImg, // 기본 프로필 이미지 경로
      content: inputValue.trim(),
      date: new Date().toISOString().split('T')[0], // 현재 날짜
    };

    setInputValue(''); // 입력 필드 초기화

    if (onAddReview) {
      onAddReview(newReview); // 콜백 호출
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
          disabled={!inputValue.trim()} // 입력값이 없을 경우 버튼 비활성화
          onClick={handleAddButtonClick} // 등록 버튼 클릭 시 동작
        >
          등록
        </Button>
      </div>

      {/* 리뷰 리스트 */}
      {/* <div css={reviewListStyle}>
        {reviews.map((review) => (
          <div key={review.id} css={reviewItemStyle}>
            <img src={review.profileImg} alt='프로필 이미지' css={avatarStyle} />
            <div>
              <div css={reviewHeaderStyle}>
                <span css={userNameStyle}>{review.writerId}</span>
                <span css={dateStyle}>{review.date}</span>
              </div>
              <p css={reviewContentStyle}>{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; */}
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
