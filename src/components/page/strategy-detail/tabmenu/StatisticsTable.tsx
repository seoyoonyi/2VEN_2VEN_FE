import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface DataRowProps {
  label: string;
  value: string;
  colSpan?: number;
}

interface statisticsProps {
  data: DataRowProps[];
}

const getColorByValue = (value: string) => {
  if (value.startsWith('-')) {
    return {
      backgroundColor: '#EFF6FF',
      color: theme.colors.main.blue,
    };
  } else if (value.startsWith('+')) {
    return {
      color: theme.colors.main.red,
    };
  } else {
    return {
      backgroundColor: 'inherit',
      color: 'inherit',
    };
  }
};

const DataRow = ({ label, value, colSpan = 1 }: DataRowProps) => {
  const { backgroundColor, color } = getColorByValue(value);
  return (
    <tr css={rowStyle}>
      <td css={labelStyle} colSpan={colSpan}>
        {label}
      </td>
      <td
        css={css`
          ${valueStyle};
          background-color: ${backgroundColor};
          color: ${color};
        `}
        colSpan={colSpan}
      >
        {value}
      </td>
    </tr>
  );
};

const StatisticsTable = ({ data }: statisticsProps) => {
  const chunkSize = 3;

  const sectionsLeft = Array.from({ length: Math.ceil(15 / chunkSize) }, (_, index) =>
    data.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  const sectionsRight = Array.from(
    { length: Math.ceil((data.length - 15) / chunkSize) },
    (_, index) => data.slice(15 + index * chunkSize, 15 + (index + 1) * chunkSize)
  );

  const Section = ({ data }: { data: { label: string; value: string }[] }) => (
    <div css={tableWrapperStyle}>
      <tbody css={sectionStyle}>
        {data.map((row, index) => (
          <DataRow key={index} label={row.label} value={row.value} />
        ))}
      </tbody>
    </div>
  );

  return (
    <div css={containerStyle}>
      <table css={tableStyle}>
        {sectionsLeft.map((data, idx) => (
          <Section data={data} key={`left-${idx}`} />
        ))}
      </table>

      <table css={tableStyle}>
        {sectionsRight.map((data, idx) => (
          <Section data={data} key={`right-${idx}`} />
        ))}
      </table>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  border: none;
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
`;

const tableWrapperStyle = css`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${theme.colors.gray[100]};
`;
const rowStyle = css`
  td {
    border: none;
    height: 50px;
    padding: 10px 12px;
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
  }
`;

const labelStyle = css`
  ${theme.textStyle.body.body2};
  width: 230px;
  background-color: ${theme.colors.gray[100]};
`;

const valueStyle = css`
  ${theme.textStyle.body.body3};
  width: 230px;
  box-sizing: border-box;
`;

export default StatisticsTable;
