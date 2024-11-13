import { useState } from 'react';

import { css } from '@emotion/react';

import Checkbox from '@/components/common/Checkbox';

export const TermsCheckbox = () => {
  const [singleChecked, setSingleChecked] = useState(false);

  return (
    <div css={termsTitleStyle}>
      <Checkbox checked={singleChecked} onChange={setSingleChecked} />
      <h4>[필수] 개인정보 처리방침</h4>
    </div>
  );
};

const termsTitleStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
