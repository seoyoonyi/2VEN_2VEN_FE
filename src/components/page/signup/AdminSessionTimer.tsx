import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { MdOutlineTimer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import theme from '@/styles/theme';

const AdminSessionTimer = () => {
  const navigate = useNavigate();
  const { adminAuth, setAdminAuth } = useAdminAuthStore();
  const [timeLeft, setTimeLeft] = useState('만료됨');

  useEffect(() => {
    // expires_at이 undefined일 수 있으므로 타입 가드 추가
    const expiresAt = adminAuth?.expiresAt;
    if (!expiresAt) {
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiryTime = new Date(expiresAt).getTime();
      const difference = expiryTime - now;

      if (difference <= 0) {
        // 세션만료
        setAdminAuth({
          ...adminAuth,
          authorized: false,
          authorizationStatus: 'EXPIRED' as const,
          expiresAt: undefined, // 만료시 expires_at 제거
        });
        navigate(ROUTES.AUTH.ADMIN.VERIFY); // 세션만료시 인증페이지로 이동
        return '만료됨';
      }

      const minutes = Math.floor((difference / 1000 / 60) % 60); // 분
      const seconds = Math.floor((difference / 1000) % 60); // 초
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [adminAuth, navigate, setAdminAuth]);

  if (!adminAuth?.expiresAt) {
    return null;
  }
  return (
    <div css={timerStyle}>
      <MdOutlineTimer />
      <span>{timeLeft}</span>
      {/* <span>32:54</span> */}
    </div>
  );
};

const timerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  background-color: ${theme.colors.teal[50]};
  color: ${theme.colors.main.primary};

  span {
    font-size: ${theme.typography.fontSizes.caption};
    line-height: ${theme.typography.lineHeights.sm};
    font-weight: ${theme.typography.fontWeight.bold};
  }
`;

export default AdminSessionTimer;
