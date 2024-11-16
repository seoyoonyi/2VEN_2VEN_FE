import { css } from '@emotion/react';

import AnalysisTable, { AnalysisProps } from '../AnalysisTable';

const MonthlyAnalysis = ({ attributes, data }: AnalysisProps) => (
  <div css={monthlyStyle}>
    <AnalysisTable attributes={attributes} data={data} />
  </div>
);
const monthlyStyle = css`
  width: 100%;
`;
export default MonthlyAnalysis;
