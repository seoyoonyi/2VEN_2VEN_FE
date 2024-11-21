import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface InquiryTitleProps {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const InquiryTitle = ({ title, onTitleChange, maxLength = 80 }: InquiryTitleProps) => (
  <section css={containerStyle}>
    <div css={titleInputStyle}>
      {/* 'inquiry-title'은 어떤 컨벤션일까,, */}
      <label htmlFor='inquiry-title' css={labelStyle}>
        문의 제목
      </label>
      <div css={lengthStyle}>
        <span style={{ color: theme.colors.teal[600] }}>{title.length}</span> /{maxLength}
      </div>
    </div>
    <input
      id='inquiry-title'
      type='text'
      value={title}
      onChange={onTitleChange}
      placeholder='제목을 입력해주세요'
      css={inputStyle}
      maxLength={maxLength}
    />
  </section>
);

const containerStyle = css`
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
  outline: 1px solid red; /* 아웃라인 */
`;

const titleInputStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 84px;
  outline: 1px solid blue; /* 아웃라인 */
`;

const labelStyle = css`
  ${theme.textStyle.body.body2};
  outline: 1px solid blue; /* 아웃라인 */
`;

const lengthStyle = css`
  // color: ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.regular};
  font-size: 13px; /* 테마에 없음 */
  display: flex;
  outline: 1px solid blue; /* 아웃라인 */
`;

const inputStyle = css`
  ${theme.textStyle.subtitles.subtitle2};
  width: 792px;
  height: 56px;
  padding: 14px;
  border: 1px solid ${theme.colors.gray[300]};
`;

export default InquiryTitle;
