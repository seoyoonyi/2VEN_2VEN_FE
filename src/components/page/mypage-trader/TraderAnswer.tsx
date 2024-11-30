import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import { createTraderReply, deleteTraderReply, updateTraderReply } from '@/api/inquiries/trader';
import { ROUTES } from '@/constants/routes';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { InquiryDetailData } from '@/types/inquiries';

const TraderAnswer = ({ data }: { data: InquiryDetailData }) => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const { openModal } = useModalStore();
  const { showToast } = useToastStore();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 관리
  const [replyContent, setReplyContent] = useState<string>(data.replyContent || ''); // 답변 내용 관리

  // 답변이 없는 경우 기본적으로 수정 모드 활성화
  useEffect(() => {
    if (!data.replyContent) {
      setIsEditing(true);
    }
  }, [data.replyContent]);

  const handleReplySubmit = async () => {
    if (!inquiryId || !replyContent.trim()) {
      showToast('답변 내용을 입력해주세요.', 'error');
      return;
    }

    try {
      // 답변이 없으면 새로 작성, 있으면 수정 API 호출
      const result = data.replyContent
        ? await updateTraderReply(inquiryId, replyContent) // 수정
        : await createTraderReply(inquiryId, replyContent); // 새로 작성

      if (result.success) {
        showToast(
          data.replyContent ? '답변 수정이 완료되었습니다.' : '답변 등록이 완료되었습니다.',
          'basic'
        );
        setIsEditing(false); // 편집 모드 종료
      } else {
        showToast('작업에 실패했습니다.', 'error');
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
      showToast('알 수 없는 에러가 발생했습니다.', 'error');
    }
  };

  const handleDelete = () => {
    openModal({
      type: 'warning',
      title: '답변 삭제',
      desc: `작성한 답변을 삭제하시겠습니까? \n 삭제 후 복구할 수 없습니다.`,
      onAction: async () => {
        if (!inquiryId) return;

        try {
          await deleteTraderReply(inquiryId);
          navigate(ROUTES.MYPAGE.TRADER.INQUIRIES.LIST);
          showToast('답변 삭제가 완료되었습니다.', 'basic');
        } catch (error) {
          console.error('Failed to delete reply:', error);
        }
      },
    });
  };

  const handleCancelEdit = () => {
    setReplyContent(data.replyContent || ''); // 원래 답변으로 복구
    setIsEditing(false); // 편집 모드 종료
  };

  return (
    <section css={answerWrapper}>
      <header css={headerWrapper}>
        <h2>나의 답변</h2>

        {data.replyContent && !isEditing && (
          <div css={editWrapper}>
            <button
              type='button'
              onClick={() => setIsEditing(true)} // 수정 모드 활성화
            >
              수정
            </button>
            <div></div>
            <button type='button' onClick={handleDelete}>
              삭제
            </button>
          </div>
        )}
      </header>

      <div css={traderAnswerWrapper}>
        {isEditing ? (
          <div css={editorStyle}>
            <textarea
              css={textareaStyle}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder='답변 내용을 입력해주세요.'
            />
            <div css={buttonGroupStyle}>
              <button onClick={handleReplySubmit}>저장</button>
              <button onClick={handleCancelEdit}>취소</button>
            </div>
          </div>
        ) : (
          <div css={answerStyle}>{data.replyContent || '답변이 없습니다.'}</div>
        )}
      </div>
    </section>
  );
};

const answerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 40px 56px 40px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

const headerWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.main.black};

  h2 {
    ${theme.textStyle.subtitles.subtitle1}
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

const traderAnswerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;

const answerStyle = css`
  color: ${theme.colors.main.black};
  font-weight: ${theme.typography.fontWeight.regular};
  white-space: pre-wrap;
`;

const editorStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const textareaStyle = css`
  width: 100%;
  height: 100px;
  padding: 8px;
  font-size: ${theme.typography.fontSizes.body};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 4px;
  resize: none;

  &:focus {
    outline: none;
    border-color: ${theme.colors.main.primary};
  }
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 8px;

  button {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:first-of-type {
    background-color: #007bff;
    color: white;
  }

  button:last-of-type {
    background-color: #ccc;
  }
`;

export default TraderAnswer;
