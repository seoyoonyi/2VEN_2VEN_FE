import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import theme from '@/styles/theme';

interface typeTableProps {
  icon: string;
  title: string;
}

interface AttributeProps {
  item: string;
}

interface dataProps {
  attributes: AttributeProps[];
  data: typeTableProps[];
}

const TypeTable = ({ attributes, data }: dataProps) => {
  const [selected, setSelected] = useState<boolean[]>(new Array(data.length).fill(false));
  const [selectAll, setSelectAll] = useState(false);

  const handleAllChecked = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelected(new Array(data.length).fill(newSelectAll));
  };

  const handleSelect = (idx: number) => {
    const updatedSelected = [...selected];
    updatedSelected[idx] = !updatedSelected[idx];
    setSelected(updatedSelected);

    setSelectAll(updatedSelected.every(Boolean));
  };

  return (
    <div css={tableStyle}>
      <table css={tableVars}>
        <thead>
          <tr css={tableRowStyle}>
            <th css={tableHeadStyle}>
              <Checkbox checked={selectAll} onChange={handleAllChecked} />
            </th>
            {attributes.map((row, idx) => (
              <th key={idx} css={tableHeadStyle} colSpan={idx === 0 ? 4 : 2}>
                {row.item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} css={tableRowStyle}>
              <td css={tableCellStyle}>
                <Checkbox checked={selected[idx]} onChange={() => handleSelect(idx)} />
              </td>
              <td css={tableCellStyle} colSpan={4}>
                <img src={row.icon} alt={row.title} css={tableImgStyle} />
              </td>
              <td css={tableCellStyle} colSpan={2}>
                {row.title}
              </td>
              <td css={tableCellStyle} colSpan={2}>
                <Button variant='accent' size='xs' width={72}>
                  수정
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableVars = css`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const tableRowStyle = css`
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const tableHeadStyle = css`
  ${theme.textStyle.body.body1};
  height: 56px;
  padding: 10px 12px;
  vertical-align: middle;
  text-align: center;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
`;

const tableCellStyle = css`
  text-align: center;
  vertical-align: middle;
  padding: 16px;

  button {
    margin: 0 auto;
  }
`;

const tableImgStyle = css`
  display: block;
  margin: 0 auto;
  height: 20px;
  object-fit: cover;
`;

const tableStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  .checkbox {
    cursor: pointer;
  }
`;

export default TypeTable;
