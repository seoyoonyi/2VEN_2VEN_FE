import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteMyInquiry } from '@/api/myInquiry';
import Modal from '@/components/common/Modal';
import { ROUTES } from '@/constants/routes';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { InquiryDetailData, Status } from '@/types/myinquires';

const Question = ({ data }: { data: InquiryDetailData }) => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const { openModal } = useModalStore();
  const { showToast } = useToastStore();

  const navigate = useNavigate();

  const handleDelete = () => {
    openModal({
      type: 'warning',
      title: '문의 삭제',
      desc: `작성한 문의를 삭제하시겠습니까? \n 삭제 후 복구할 수 없습니다.`,
      onAction: async () => {
        if (!inquiryId) return;

        try {
          await deleteMyInquiry(Number(inquiryId));
          navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST);
          showToast('문의 삭제가 완료되었습니다.', 'basic');
        } catch (error) {
          console.error('Failed to delete inquiry:', error);
        }
      },
    });
  };

  return (
    <div css={questionWrapper}>
      <header css={questionHeaderWrapper}>
        <span css={statusStyle(data.status)}>
          {data.status === 'PENDING' && <span className='dot' />}
          {data.status === 'PENDING' ? '대기' : '완료'}
        </span>
        <h1 css={titleStyle}>{data.title}</h1>
        <div css={infoWrapper}>
          <div css={infoStyle}>
            <img src={data.investorProfileUrl} alt={`${data.investorName}'s profile`} />
            <h2>{data.investorName}</h2>
            <span>{data.createdAt.slice(0, 10).replace(/-/g, '.')}</span>
          </div>
          {data.status === 'PENDING' && (
            <div css={editWrapper}>
              <button
                type='button'
                onClick={() => navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.EDIT(inquiryId || ''))}
              >
                수정
              </button>
              <div></div>
              <button type='button' onClick={handleDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
        <Modal />
      </header>

      <section css={strategyInfoWrapper}>
        <div css={strategyInfoStyle}>
          <h3>관심전략명</h3>
          <div>{data.strategyName}</div>
        </div>
        <div>
          <div css={strategyInfoStyle}>
            <h3>투자개시금액</h3>
            <span>{data.investmentAmount.toLocaleString()}</span>
          </div>
          <div css={strategyInfoStyle}>
            <h3>투자개시시점</h3>
            <span>{data.investmentDate.slice(0, 10).replace(/-/g, '.')}</span>
          </div>
        </div>
      </section>

      <section css={questionStyle}>{data.content}</section>
    </div>
  );
};

const questionWrapper = css`
  display: flex;
  flex-direction: column;
  height: 609px;
  padding: 48px 40px 56px 40px;
  gap: 24px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

const questionHeaderWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const infoWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const infoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme.colors.main.black};
  }

  span {
    color: ${theme.colors.gray[400]};
    font-size: ${theme.typography.fontSizes.caption};
    font-weight: 400;
  }
`;

const editWrapper = css`
  display: flex;
  gap: 4px;

  button {
    background-color: transparent;
    color: ${theme.colors.gray[500]};
    text-align: center;
    font-size: ${theme.typography.fontSizes.caption};
    line-height: 130%;
    cursor: pointer;
  }

  div {
    width: 1px;
    height: 18px;
    background-color: ${theme.colors.gray[300]};
  }
`;

const statusStyle = (status: Status) => css`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 72px;
  height: 32px;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.regular};
  background-color: ${status === 'PENDING' ? theme.colors.teal[50] : theme.colors.gray[200]};
  color: ${theme.colors.main.black};

  .dot {
    width: 8px;
    height: 8px;
    background-color: ${theme.colors.teal[400]};
    border-radius: 50%;
  }
`;

const titleStyle = css`
  font-size: ${theme.typography.fontSizes.subtitle.md};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.md};
`;

const strategyInfoWrapper = css`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  background: ${theme.colors.gray[50]};

  div:nth-child(2) {
    display: flex;
    gap: 8px;
  }
`;

const strategyInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  h3 {
    width: 84px;
    color: ${theme.colors.main.primary};
    font-weight: ${theme.typography.fontWeight.bold};
  }

  div {
    padding: 0 8px;
    color: ${theme.colors.main.black};
    font-size: 18px;
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeights.sm};
    border-left: 1px solid ${theme.colors.gray[300]};
  }

  span {
    width: 294px;
    padding: 0 8px;
    color: ${theme.colors.gray[700]};
    border-left: 1px solid ${theme.colors.gray[300]};
    font-size: 18px;
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeights.sm};
  }
`;

const questionStyle = css`
  padding: 12px 16px;
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.colors.main.black};
  overflow-y: auto;
  white-space: pre-wrap;
`;

export default Question;
