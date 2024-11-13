import { css } from '@emotion/react';
import { MdCheck } from 'react-icons/md';

import theme from '@/styles/theme';

interface PageHeaderProps {
  title: string;
  desc: string;
}

const PageHeader = ({ title, desc }: PageHeaderProps) => (
  <section css={headerStyle}>
    <div css={containerStyle}>
      <h1 css={titleStyle}>{title}</h1>
      <div css={descWrapperStyle}>
        <MdCheck css={iconStyle} />
        <div css={descStyle}>{desc}</div>
      </div>
    </div>
  </section>
);

const headerStyle = css`
  background-color: ${theme.colors.gray[100]};
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 76px 0;
  gap: 16px;
`;

const titleStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.heading.h2};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.md};
`;

const descWrapperStyle = css`
  display: flex;
  gap: 4px;
`;

const iconStyle = css`
  display: flex;
  margin-top: 1px;
  width: 24px;
  height: 24px;
  color: ${theme.colors.main.primary};
`;

const descStyle = css`
  color: ${theme.colors.gray[600]};
  white-space: pre-line;
  font-size: ${theme.typography.fontSizes.subtitle.md};
  font-weight: ${theme.typography.fontWeight.medium};
  line-height: ${theme.typography.lineHeights.md};
`;

export default PageHeader;
