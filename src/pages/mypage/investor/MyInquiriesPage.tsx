import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { fetchMyInquiryList } from '@/api/myInquiry';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import { ROUTES } from '@/constants/routes';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { myInquirieListData, Status } from '@/types/myinquires';

const MyInquiriesPage = () => {
  const { isToastVisible, hideToast, message } = useToastStore();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const { data, isLoading, isError, isFetching } = useQuery<
    {
      content: myInquirieListData[];
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
    },
    Error
  >({
    queryKey: ['myInquiries', page, pageSize],
    queryFn: () => fetchMyInquiryList(page - 1, pageSize),
  });

  const onClickInquiryList = (inquiryId: string) => {
    navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.DETAIL(inquiryId));
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <div css={myPageWrapperStyle}>로딩 중...</div>;
  }

  if (isError) {
    return <div css={myPageWrapperStyle}>문의 목록 데이터를 불러오는 데 실패했습니다.</div>;
  }

  const myInquiries = data?.content || [];
  const totalPages = data?.totalPages || 1;
  const totalElements = data?.totalElements || 0;

  return (
    <div css={myPageWrapperStyle}>
      <div css={myPageHeaderStyle}>
        <div>
          <h2>나의 문의</h2>
          <p>
            총 <span>{totalElements}</span>개의 문의 내역이 있습니다
          </p>
        </div>
      </div>

      <div css={tableWrapper}>
        {isFetching && <div>새로운 데이터를 불러오는 중...</div>}
        <div>
          <div css={headerStyle}>
            <div>제목</div>
            <div>트레이더</div>
            <div>답변상태</div>
            <div>날짜</div>
          </div>
          {myInquiries.map((inquiry) => (
            <div
              role='button'
              tabIndex={0}
              onClick={() => onClickInquiryList(String(inquiry.id))}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClickInquiryList(String(inquiry.id));
                }
              }}
              key={inquiry.id}
            >
              <div css={rowStyle}>
                <div css={inquiriesTitleStyle}>
                  <span>Q.</span>
                  <div>{inquiry.title}</div>
                </div>
                <div css={traderInfoStyle}>
                  <img
                    src={inquiry.traderProfileUrl || '/default-profile.png'}
                    alt={`${inquiry.traderName}의 프로필`}
                  />
                  <span>{inquiry.traderName}</span>
                </div>
                <div css={statusStyle(inquiry.status)}>
                  {inquiry.status === 'PENDING' && <span className='dot' />}
                  {inquiry.status === 'COMPLETED' ? '완료' : '대기'}
                </div>
                <div>{inquiry.createdAt.slice(0, 10).replace(/-/g, '.')}</div>
              </div>
            </div>
          ))}
        </div>
        <Pagination totalPage={totalPages} limit={data?.size || 10} page={page} setPage={setPage} />
      </div>
      {isToastVisible && <Toast message={message} isVisible={isToastVisible} onClose={hideToast} />}
    </div>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
    margin-bottom: 8px;
  }

  p {
    ${theme.textStyle.body.body3}

    span {
      color: ${theme.colors.main.primary};
    }
  }
`;

const tableWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 56px;
`;

const rowStyle = css`
  display: grid;
  grid-template-columns: minmax(0, 4.8fr) minmax(0, 2.5fr) minmax(0, 1.6fr) minmax(0, 1.4fr);
  align-items: center;
  height: 90px;
  background: ${theme.colors.main.white};
  color: ${theme.colors.gray[900]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  text-align: center;
  line-height: ${theme.typography.lineHeights.lg};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.teal[50]};
  }
`;

const headerStyle = css`
  ${rowStyle};
  height: 48px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: default;

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;

const inquiriesTitleStyle = css`
  display: flex;
  align-items: flex-start;
  padding: 24px;

  span {
    color: ${theme.colors.gray[300]};
    margin-right: 12px;
  }

  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const traderInfoStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding-left: 24.5px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const statusStyle = (status: Status) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  color: ${status === 'COMPLETED' ? theme.colors.gray[400] : theme.colors.gray[900]};

  .dot {
    width: 8px;
    height: 8px;
    background-color: ${theme.colors.teal[400]};
    border-radius: 50%;
    display: ${status === 'PENDING' ? 'block' : 'none'};
  }
`;

export default MyInquiriesPage;
