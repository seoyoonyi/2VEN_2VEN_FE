// input styles

import { css } from '@emotion/react';

export const inputSizeStyles = {
  sm: css`
    height: ${theme.input.height.sm};
    padding: ${theme.input.padding.sm};
    font-size: ${theme.input.fontSize.sm};
  `,
  md: css`
    height: ${theme.input.height.md};
    padding: ${theme.input.padding.md};
    font-size: ${theme.input.fontSize.md};
  `,
  lg: css`
    height: ${theme.input.height.lg};
    padding: ${theme.input.padding.lg};
    font-size: ${theme.input.fontSize.lg};
  `,
};

export const iconSpacingStyles = {
  sm: css`
    gap: 8px;
    svg {
      width: 16px;
      height: 16px;
    }
  `,
  md: css`
    gap: 8px;
    svg {
      width: 20px;
      height: 20px;
    }
  `,
  lg: css`
    gap: 10px;
    svg {
      width: 24px;
      height: 24px;
    }
  `,
};

export const baseInputStyles = css`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d4d4d8;
  background-color: white;
  outline: none;
  transition: all 0.2s ease;
  font-family: 'Pretendard', sans-serif;
  line-height: 150%;

  &::placeholder {
    color: #3f3f46;
  }

  &:hover {
    border-color: #0d9488;
  }

  &:focus {
    border-color: #0d9488;
  }

  &:disabled {
    background-color: #f4f4f5;
    cursor: not-allowed;
  }
`;

export const inputStatusStyles = {
  default: css``,
  error: css`
    border-color: #ea580c !important;
  `,
  success: css`
    border-color: #d4d4d8;
  `,
};

export const iconButtonStyles = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #71717a;

  &:hover {
    color: #3f3f46;
  }
`;
