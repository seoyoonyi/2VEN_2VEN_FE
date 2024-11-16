import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';

import AnalysisTable, { AnalysisProps } from '../AnalysisTable';

import Button from '@/components/common/Button';

const DailyAnalysis = ({ attributes, data }: AnalysisProps) => (
  <div css={dailyStyle}>
    {data.length > 0 && (
      <div css={editArea}>
        <div css={addArea}>
          <Button variant='secondary' size='xs' width={116} css={buttonStyle}>
            <BiPlus size={16} />
            직접입력
          </Button>
          <Button variant='accent' size='xs' width={116} css={buttonStyle}>
            <BiPlus size={16} />
            엑셀추가
          </Button>
        </div>
        <Button variant='neutral' size='xs' width={89}>
          삭제
        </Button>
      </div>
    )}
    <AnalysisTable attributes={attributes} data={data} />
  </div>
);

const dailyStyle = css`
  width: 100%;
`;

const addArea = css`
  display: flex;
  gap: 8px;
`;

const editArea = css`
  display: flex;
  justify-content: space-between;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 3px;
`;
export default DailyAnalysis;
