/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { css } from '@emotion/react';

import Pagination from '@/components/common/Pagination';
import ReviewInputList from '@/components/page/strategy-detail/review/ReviewInputList';
import theme from '@/styles/theme';

interface Review {
  id: number;
  writerId: string;
  profileImg: string;
  content: string;
  date: string;
}

const itemsPerPage = 5; // 한 페이지에 표시할 리뷰 수

const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      writerId: '내가 투자 짱',
      profileImg: 'https://via.placeholder.com/40',
      content: '우와 대박 쩔어용',
      date: '2024-11-25',
    },
    {
      id: 2,
      writerId: '너님이 투자 짱',
      profileImg: 'https://via.placeholder.com/40',
      content: '워메워메',
      date: '2024-11-24',
    },
  ]); // 전체 리뷰 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const writerId = '내가 투자 짱';

  // 리뷰 추가 시 호출될 함수
  const handleAddReview = (newReview: Review) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]); // 새로운 리뷰 추가
  };

  // 리뷰 수정 시 호출될 함수
  const handleEditReview = (id: number, updatedContent: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, content: updatedContent } : review
      )
    );
  };

  // 리뷰 삭제 시 호출될 함수
  const handleDeleteReview = (id: number) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  };

  // 현재 페이지의 리뷰 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedReviews = reviews.slice(startIndex, endIndex);

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <h2 css={titleStyle}>리뷰</h2>
        <span css={countStyle}>{reviews.length}</span>
      </div>

      {/* 리뷰 입력 및 표시 */}
      <ReviewInputList
        reviews={displayedReviews} // 현재 페이지의 리뷰 전달
        writerId={writerId}
        profileImg='https://via.placeholder.com/40'
        onAddReview={handleAddReview} // 새로운 리뷰 추가 핸들러 전달
        onEditReview={handleEditReview} // 리뷰 수정 핸들러 전달
        onDeleteReview={handleDeleteReview} // 리뷰 삭제 핸들러 전달
      />

      {/* 페이지네이션 */}
      <div css={PaginationStyle}>
        <Pagination
          totalPage={Math.ceil(reviews.length / itemsPerPage)} // 총 페이지 수 계산
          limit={itemsPerPage}
          page={currentPage}
          setPage={setCurrentPage} // 페이지 변경 핸들러
        />
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  max-width: ${theme.layout.width.content};
  padding: 40px 40px 56px 40px;
  background-color: ${theme.colors.main.white};
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  gap: 4px;
`;

const titleStyle = css`
  ${theme.textStyle.subtitles.subtitle1};
`;

const countStyle = css`
  ${theme.textStyle.subtitles.subtitle1};
  color: ${theme.colors.main.primary};
`;

const PaginationStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export default ReviewSection;
