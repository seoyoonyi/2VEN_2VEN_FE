import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import theme from '@/styles/theme';
import { InquiresInputProps } from '@/types/myinquires';

const InquiresInput = ({ title, content }: InquiresInputProps) => (
  <div css={inquiresInputWrapper}>
    <div css={flexStyle}>
      <label htmlFor='inquire-title'>문의 제목</label>
      <Input
        id='inquire-title'
        value={title}
        onChange={() => {}}
        placeholder='문의 제목을 입력해주세요.'
        css={titleInputStyle}
      />
      <div css={lengthStyle}>
        <span>{title.length}</span>/80
      </div>
    </div>
    <div css={flexStyle}>
      <label htmlFor='inquire-content'>문의 내용</label>
      <textarea
        id='inquire-content'
        value={content}
        onChange={() => {}}
        placeholder='텍스트를 입력해주세요'
        css={textareaStyle}
      />
      <div css={lengthStyle}>
        <span>{content.length}</span>/800
      </div>
    </div>
  </div>
);

const inquiresInputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 32px;
  color: ${theme.colors.main.black};
  margin-bottom: 64px;
`;

const flexStyle = css`
  display: flex;
  flex-direction: column;

  label {
    font-size: ${theme.typography.fontSizes.subtitle.md};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeights.md};
    margin-bottom: 10px;
  }
`;

const titleInputStyle = css`
  font-size: ${theme.typography.fontSizes.subtitle.md};
  line-height: ${theme.typography.lineHeights.md};
  color: ${theme.colors.gray[700]};
`;

const textareaStyle = css`
  width: 100%;
  height: 208px;
  padding: 12px;
  line-height: ${theme.typography.lineHeights.sm};
  resize: none;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  outline: none;
  transition: all 0.2s ease;
  color: ${theme.colors.gray[700]};
  font-size: 18px;
  font-weight: ${theme.typography.fontWeight.regular};
  white-space: pre-wrap;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }
`;

const lengthStyle = css`
  margin-top: 8px;
  text-align: right;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.colors.gray[500]};

  span {
    color: ${theme.colors.main.primary};
  }
`;

export default InquiresInput;
