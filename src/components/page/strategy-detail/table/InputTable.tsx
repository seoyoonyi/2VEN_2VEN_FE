import { useState } from 'react';

import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import theme from '@/styles/theme';

export interface InputTableProps {
  date: string;
  depWdPrice: number;
  dailyProfitLoss: number;
}

export interface InputAnalysisProps {
  data: InputTableProps[];
  onChange: (data: InputTableProps[]) => void;
}

const attributes = ['일자', '입출금', '일손익'];

const InputTable = ({ data, onChange }: InputAnalysisProps) => {
  const [inputData, setInputData] = useState<InputTableProps[]>(data);

  const handleInputChange = (idx: number, field: keyof InputTableProps, value: string) => {
    const updatedData = inputData.map((row, i) => (i === idx ? { ...row, [field]: value } : row));
    setInputData(updatedData);
    onChange(updatedData);
  };

  return (
    <div css={tableStyle}>
      <table css={tableVars}>
        <thead>
          <tr css={tableRowStyle}>
            {attributes.map((row, idx) => (
              <th key={idx} css={tableHeadStyle}>
                {row}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputData.map((row, idx) => (
            <tr key={idx} css={tableRowStyle}>
              <td css={tableCellStyle}>
                <Input
                  type='date'
                  value={row.date}
                  onChange={(e) => handleInputChange(idx, 'date', e.target.value)}
                  css={inputStyle}
                />
              </td>
              <td css={tableCellStyle}>
                <Input
                  type='number'
                  value={row.depWdPrice}
                  placeholder='예)123,456,789'
                  onChange={(e) => handleInputChange(idx, 'depWdPrice', e.target.value)}
                  css={inputStyle}
                />
              </td>
              <td css={tableCellStyle}>
                <Input
                  type='number'
                  value={row.dailyProfitLoss}
                  placeholder='예)+123,456'
                  onChange={(e) => handleInputChange(idx, 'dailyProfitLoss', e.target.value)}
                  css={inputStyle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const tableStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;
  width: 100%;
  color: ${theme.colors.gray[700]};
  .checkbox {
    cursor: pointer;
  }
`;

const tableVars = css`
  border-collapse: collapse;
  table-layout: fixed;
`;

const tableRowStyle = css`
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const tableHeadStyle = css`
  align-items: center;
  ${theme.textStyle.body.body1};
  height: 56px;
  text-align: center;
  background-color: ${theme.colors.gray[100]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  text-align: center;
  vertical-align: middle;
`;

const tableCellStyle = css`
  text-align: center;
  vertical-align: middle;
  padding: 16px;
  ${theme.textStyle.body.body1};

  button {
    margin: 0 auto;
  }
  input::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

const inputStyle = css`
  width: 100%;
  border-radius: 4px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & {
    -moz-appearance: textfield;
    appearance: none;
  }
`;

export default InputTable;
