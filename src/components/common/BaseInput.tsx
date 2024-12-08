import { InputHTMLAttributes } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

export type InputSize = 'small' | 'medium' | 'large';
export type InputStatus = 'default' | 'error' | 'success';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputSize;
  status?: InputStatus;
  customStyle?: SerializedStyles;
}

const BaseInput: React.FC<BaseInputProps> = ({
  variant = 'medium',
  status = 'default',
  customStyle,
  ...props
}) => {
  const currentInputStyles = [
    baseInputStyles,
    inputSizeStyles[variant],
    inputStatusStyles[status],
    customStyle,
  ];

  return <input {...props} css={currentInputStyles} />;
};

export default BaseInput;

const baseInputStyles = css`
  display: block;
  width: 100%;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  outline: none;
  transition: all 0.2s ease;
  line-height: 150%;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }

  &:hover:not(:disabled) {
    border-color: ${theme.colors.main.primary};
  }

  &:focus:not(:disabled) {
    border-color: ${theme.colors.main.primary};
  }

  &:disabled {
    background-color: ${theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

const inputSizeStyles = {
  small: css`
    height: ${theme.input.height.sm};
    padding: ${theme.input.padding.sm};
    font-size: ${theme.input.fontSize.sm};
  `,
  medium: css`
    height: ${theme.input.height.md};
    padding: ${theme.input.padding.md};
    font-size: ${theme.input.fontSize.md};
  `,
  large: css`
    height: ${theme.input.height.lg};
    padding: ${theme.input.padding.lg};
    font-size: ${theme.input.fontSize.lg};
  `,
};

const inputStatusStyles = {
  default: css``,
  error: css`
    border-color: ${theme.colors.main.alert};

    &:hover:not(:disabled) {
      border-color: ${theme.colors.main.alert};
    }

    &:focus:not(:disabled) {
      border-color: ${theme.colors.main.alert};
    }
  `,
  success: css`
    border-color: ${theme.colors.gray[400]};
  `,
};
