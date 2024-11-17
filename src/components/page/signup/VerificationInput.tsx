import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import theme from '@/styles/theme';
import { formatTime } from '@/utils/time';

interface VerificationInputProps {
  value: string; // 부모컴포넌트에서 관리하는 입력값
  onChange: (value: string) => void; // 입력값 변경 콜백함수
  resetTimer?: number; // 타이머 리셋을 위한 상태
  onTimeEnd?: () => void; // 타이머 종료 콜백함수
  isDisabled?: boolean; // 입력창 비활성화 여부
}

// 타이머 기능있는 인증번호 입력창 컴포넌트(인증번호입력+타이머)
const VerificationInput = ({
  value,
  onChange,
  resetTimer = 0,
  onTimeEnd,
  isDisabled = false, // 기본값 false
}: VerificationInputProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(179); // 초기값 3분  => 179초

  // resetTimer가 변경될 때만 타이머 시작!
  useEffect(() => {
    setTimeLeft(179); // 타이머 초기화
    onChange(''); // 입력값 초기화
  }, [resetTimer, onChange]);

  // 타이머 로직
  useEffect(() => {
    // 타이머가 정확히 0일 때만 onTimeEnd 콜백함수 호출
    if (timeLeft === 0) {
      onTimeEnd?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // 컴포넌트 언마운트되면 타이머 종료
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, onTimeEnd]);

  return (
    <div css={inputContainerStyle}>
      <Input
        type='text'
        inputSize='lg'
        placeholder='메일로 받은 인증번호 입력'
        onChange={(e) => onChange(e.target.value)}
        value={value}
        css={inputStyle}
        disabled={isDisabled || timeLeft === 0} // timeLeft가 0 이거나 isDisabled가 true이면 입력창 비활성화
      />
      <span css={timerStyle}>{timeLeft !== null ? formatTime(timeLeft) : ''}</span>
    </div>
  );
};
const inputContainerStyle = css`
  position: relative;
  width: 288px;
`;
const inputStyle = css`
  width: 288px;
  padding-right: 60px;
  &:hover,
  &:focus {
    border: 1px solid ${theme.colors.gray[300]} !important;
  }
`;
const timerStyle = css`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  color: ${theme.colors.main.primary};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.lg};
  pointer-events: none; // 이벤트 전파 차단
`;
export default VerificationInput;
