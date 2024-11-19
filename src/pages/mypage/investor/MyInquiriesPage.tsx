import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import Pagination from '@/components/common/Pagination';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

type Status = '대기' | '완료';

interface myInquiriesData {
  id: number;
  inqurieTitle: string;
  profileImg: string;
  nickName: string;
  inqurieStatus: Status;
  date: string;
}

const myInquiries: myInquiriesData[] = [
  {
    id: 1,
    inqurieTitle: '이거 믿을만한 전략인가요?',
    profileImg: 'https://i.pinimg.com/736x/56/cd/db/56cddb00efcd9cec66ce5474092f3328.jpg',
    nickName: '내가여기서투자짱',
    inqurieStatus: '대기',
    date: '2024.11.16',
  },
  {
    id: 2,
    inqurieTitle: '안녕하세요. 이 전략에 대해 궁금한 점이 있어 문의드립니다. 어쩌구저쩌구',
    profileImg: 'https://i.pinimg.com/474x/f5/56/15/f55615edf4217032bea9ce9cb6242053.jpg',
    nickName: '저희닉네임길이제한이얼마나있을까요?',
    inqurieStatus: '대기',
    date: '2024.11.16',
  },
  {
    id: 3,
    inqurieTitle: '이거 제안서가 이상한데 자세히 설명 가능할까요?',
    profileImg: 'https://i.pinimg.com/474x/6f/6d/ff/6f6dffbfa8c99f4963f5c4b0d814ae22.jpg',
    nickName: 'imnotningning',
    inqurieStatus: '완료',
    date: '2024.11.16',
  },
  {
    id: 4,
    inqurieTitle: '이거 믿을만한 전략인가요?',
    profileImg: 'https://i.pinimg.com/736x/56/cd/db/56cddb00efcd9cec66ce5474092f3328.jpg',
    nickName: '내가여기서투자짱',
    inqurieStatus: '대기',
    date: '2024.11.16',
  },
  {
    id: 5,
    inqurieTitle: '안녕하세요. 이 전략에 대해 궁금한 점이 있어 문의드립니다. 어쩌구저쩌구',
    profileImg: 'https://i.pinimg.com/474x/f5/56/15/f55615edf4217032bea9ce9cb6242053.jpg',
    nickName: '저희닉네임길이제한이얼마나있을까요?',
    inqurieStatus: '대기',
    date: '2024.11.16',
  },
  {
    id: 6,
    inqurieTitle: '이거 제안서가 이상한데 자세히 설명 가능할까요?',
    profileImg: 'https://i.pinimg.com/474x/6f/6d/ff/6f6dffbfa8c99f4963f5c4b0d814ae22.jpg',
    nickName: 'imnotningning',
    inqurieStatus: '완료',
    date: '2024.11.16',
  },
  {
    id: 7,
    inqurieTitle: '이거 믿을만한 전략인가요?',
    profileImg: 'https://i.pinimg.com/736x/56/cd/db/56cddb00efcd9cec66ce5474092f3328.jpg',
    nickName: '내가여기서투자짱',
    inqurieStatus: '대기',
    date: '2024.11.16',
  },
  {
    id: 8,
    inqurieTitle: '안녕하세요. 이 전략에 대해 궁금한 점이 있어 문의드립니다. 어쩌구저쩌구',
    profileImg: 'https://i.pinimg.com/474x/f5/56/15/f55615edf4217032bea9ce9cb6242053.jpg',
    nickName: '저희닉네임길이제한이얼마나있을까요?',
    inqurieStatus: '대기',
    date: '2024.11.16',
  },
  {
    id: 9,
    inqurieTitle: '이거 제안서가 이상한데 자세히 설명 가능할까요?',
    profileImg: 'https://i.pinimg.com/474x/6f/6d/ff/6f6dffbfa8c99f4963f5c4b0d814ae22.jpg',
    nickName: 'imnotningning',
    inqurieStatus: '완료',
    date: '2024.11.16',
  },
  {
    id: 10,
    inqurieTitle: '이거 제안서가 이상한데 자세히 설명 가능할까요?',
    profileImg: 'https://i.pinimg.com/474x/6f/6d/ff/6f6dffbfa8c99f4963f5c4b0d814ae22.jpg',
    nickName: 'imnotningning',
    inqurieStatus: '완료',
    date: '2024.11.16',
  },
];

const MyInquiriesPage = () => (
  <div css={investorMypageWrapper}>
    <div css={titleWrapper}>
      <h1>나의 문의</h1>
      <span>
        총 <strong>50</strong>개의 문의 내역이 있습니다.
      </span>
    </div>
    <div css={tableWrapper}>
      <div css={headerStyle}>
        <div>제목</div>
        <div>트레이더</div>
        <div>답변상태</div>
        <div>날짜</div>
      </div>
      {myInquiries.map((inquirie) => (
        <Link
          to={`${ROUTES.MYPAGE.INVESTOR.MYINQUIRY.DETAIL(inquirie.id.toString())}`}
          key={inquirie.id}
        >
          <div css={rowStyle}>
            <div css={inquirieTitleStyle}>
              <span>Q.</span>
              <div>{inquirie.inqurieTitle}</div>
            </div>
            <div css={traderInfoStyle}>
              <img src={inquirie.profileImg} alt={`${inquirie.nickName}s profile`} />
              <span>{inquirie.nickName}</span>
            </div>
            <div css={statusStyle(inquirie.inqurieStatus)}>
              {inquirie.inqurieStatus === '대기' && <span className='dot' />}
              {inquirie.inqurieStatus}
            </div>
            <div>{inquirie.date}</div>
          </div>
        </Link>
      ))}
    </div>
    <Pagination totalPage={5} limit={10} page={1} setPage={() => {}} />
  </div>
);

const investorMypageWrapper = css`
  display: flex;
  flex-direction: column;
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const titleWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
  color: ${theme.colors.gray[700]};

  h1 {
    font-size: 34px;
    font-weight: 700;
    line-height: 140%;
  }

  span {
    font-weight: 400;

    strong {
      color: ${theme.colors.main.primary};
    }
  }
`;

const tableWrapper = css`
  margin-bottom: 56px;
`;

const rowStyle = css`
  display: grid;
  grid-template-columns: 415px 200px 140px 120px;
  align-items: center;
  height: 90px;
  background: ${theme.colors.main.white};
  color: ${theme.colors.gray[900]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  text-align: center;
  line-height: ${theme.typography.lineHeights.lg};
`;

const headerStyle = css`
  ${rowStyle};
  height: 48px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const inquirieTitleStyle = css`
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
  color: ${status === '완료' ? theme.colors.gray[400] : theme.colors.gray[900]};

  .dot {
    width: 8px;
    height: 8px;
    background-color: ${theme.colors.teal[400]};
    border-radius: 50%;
    display: ${status === '대기' ? 'block' : 'none'};
  }
`;

export default MyInquiriesPage;
