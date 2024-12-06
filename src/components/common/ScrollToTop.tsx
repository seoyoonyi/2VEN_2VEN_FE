import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { BiArrowToTop } from 'react-icons/bi';

import theme from '@/styles/theme';

const SCROLL_BOTTOM_SPARE = 300;

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - SCROLL_BOTTOM_SPARE;
    setIsVisible(isAtBottom);
  };

  // 화면 맨 위로 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isVisible ? (
    <button onClick={scrollToTop} css={scrollToTopButtonStyle} aria-label='스크롤'>
      <BiArrowToTop css={iconStyle} />
    </button>
  ) : null;
};

const scrollToTopButtonStyle = css`
  position: fixed;
  bottom: 250px;
  right: 100px;
  z-index: 100;
  width: 48px;
  height: 48px;
  border: 1px solid ${theme.colors.gray[200]};
  background: ${theme.colors.main.white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition:
    background 0.3s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[50]};
    box-shadow: 0px 8px 8px 0px rgba(24, 24, 29, 0.08);
    svg {
      color: ${theme.colors.gray[600]};
    }
  }

  &:active {
    background: ${theme.colors.gray[100]};
    svg {
      color: ${theme.colors.gray[600]};
    }
  }
`;

const iconStyle = css`
  width: 32px;
  height: 32px;
  color: ${theme.colors.gray[500]};
`;

export default ScrollToTop;
