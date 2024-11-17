import { css } from '@emotion/react';

import AnalysisTable, { AnalysisProps } from '../table/AnalysisTable';

const MonthlyAnalysis = ({ attributes, data }: AnalysisProps) => (
  <div css={monthlyStyle}>
    <AnalysisTable attributes={attributes} data={data} mode='read' />
  </div>
);
const monthlyStyle = css`
  width: 100%;
`;
export default MonthlyAnalysis;
