import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Toast from '@/components/common/Toast';
import useToastStore from '@/stores/toastStore';

const ToastTestPage = () => {
  const { isToastVisible, showToast, hideToast, message } = useToastStore();

  // 기본 토스트
  const handleShowBasicToast = () => {
    console.log('기본 토스트 버튼 클릭');
    showToast('링크가 복사되었습니다!');
  };

  // action(선택지가 있는) 메시지
  const handleShowActionToast = () => {
    console.log('이동/취소 버튼 토스트 클릭');
    showToast('폴더 이동이 완료되었습니다!');
  };

  // action 메시지
  const handleShowUndoToast = () => {
    console.log('실행 취소 버튼 토스트 클릭');
    showToast('전략을 언팔로우했습니다.');
  };

  return (
    <div css={containerStyle}>
      {/* 기본 토스트 */}
      <h2>basic</h2>
      <Button variant='primary' size='sm' width={200} onClick={handleShowBasicToast}>
        기본 토스트
      </Button>

      {/* 이동/취소 버튼 토스트 */}
      <h2>action</h2>
      <Button variant='secondary' size='sm' width={200} onClick={handleShowActionToast}>
        이동/취소 버튼 토스트
      </Button>

      {/* 실행 취소 버튼 토스트 */}
      <h2>action</h2>
      <Button variant='secondary' size='sm' width={200} onClick={handleShowUndoToast}>
        실행 취소 버튼 토스트
      </Button>
      {/* 토스트 컴포넌트 렌더링 */}
      {isToastVisible && (
        <Toast
          message={message}
          isVisible={isToastVisible}
          onClose={hideToast}
          // 버튼 추가
          buttons={[
            ...(message === '폴더 이동이 완료되었습니다'
              ? [
                  { label: '이동', onClick: () => console.log('이동 버튼 클릭') },
                  { label: '취소', onClick: () => console.log('취소 버튼 클릭') },
                ]
              : []),
            ...(message === '전략을 언팔로우했습니다'
              ? [{ label: '실행 취소', onClick: () => console.log('실행 취소 클릭') }]
              : []),
          ]}
        />
      )}
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export default ToastTestPage;
