import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import theme from '@/styles/theme';
import { formatTime } from '@/utils/time';

interface VerificationInputProps {
  value: string; // 부모컴포넌트에서 관리하는 입력값
  onChange: (value: string) => void; // 입력값 변경 콜백함수
  isActive?: boolean; // 컴포넌트 활성화 여부
  onTimeEnd?: () => void; // 타이머 종료 콜백함수
}

// 타이머 기능있는 인증번호 입력창 컴포넌트(인증번호입력+타이머)
const VerificationInput = ({
  value,
  onChange,
  isActive = false, // 기본값은 비활성화
  onTimeEnd,
}: VerificationInputProps) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // 초기값 null로 설정

  // 활성화 상태가 되면 타이머 시작!
  // isActive가 true로 변경될 때마다 타이머 재시작
  useEffect(() => {
    if (isActive) {
      setTimeLeft(299); // 5분(300초) 타이머 시작 또는 타이머 재시작
      onChange(''); // 입력값 초기화
    }
  }, [isActive, onChange]);

  // 타이머 로직
  useEffect(() => {
    // 비활성화 상태거나, timeLeft가 null이거나, 0이하일 때 타이머 종료
    if (!isActive || timeLeft === null || timeLeft <= 0) {
      // 타이머 종료 콜백함수 호출
      if (timeLeft === 0) {
        onTimeEnd?.();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // 이전 값이 null이 아니고 0보다 크면 1초씩 감소
        if (prev !== null) {
          return prev - 1;
        }
        return prev;
      });
    }, 1000);

    // 컴포넌트 언마운트되면 타이머 종료
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, isActive, onTimeEnd]);

  if (!isActive) {
    return null; // 비활성화 상태일 때는 null 반환
  }

  return (
    <div css={inputContainerStyle}>
      <Input
        type='text'
        inputSize='lg'
        placeholder='메일로 받은 인증번호 입력'
        onChange={(e) => onChange(e.target.value)}
        value={value}
        css={inputStyle}
        disabled={timeLeft === 0} // 타이머 종료되면 입력창 비활성화
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
