import { useState } from 'react';

import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';

import InputTable, { InputTableProps } from './InputTable';
import TableModal from './TableModal';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import useTableModalStore from '@/stores/tableModalStore';
import theme from '@/styles/theme';

export interface AnalysisAttribuesProps {
  title: string;
}

export interface AnalysisDataProps {
  date: string;
  original: string;
  trade: string;
  day: string;
  daily: string;
  addMoney: string;
  addRate: string;
}

export interface AnalysisProps {
  attributes: AnalysisAttribuesProps[];
  data: AnalysisDataProps[];
}

const AnalysisTable = ({ attributes, data }: AnalysisProps) => {
  const [selected, setSelected] = useState<boolean[]>(new Array(data.length).fill(false));
  const [selectAll, setSelectAll] = useState(false);
  const [tableData, setTableData] = useState<InputTableProps[]>([]);
  const { openTableModal } = useTableModalStore();

  const handleAllChecked = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelected(new Array(data.length).fill(newSelectAll));
  };

  const handleSelected = (idx: number) => {
    const updatedSelected = [...selected];
    updatedSelected[idx] = !updatedSelected[idx];
    setSelected(updatedSelected);
    setSelectAll(updatedSelected.every(Boolean));
  };

  const handleUpdateData = (data: InputTableProps, idx: number) => {
    const updatedTableData = [...tableData];
    updatedTableData[idx] = { ...updatedTableData[idx], ...data };
    setTableData(updatedTableData);
  };

  const handleUpdateModal = (data: InputTableProps, idx: number) => {
    openTableModal({
      type: 'insert',
      title: '일간분석 데이터 직접 입력',
      data: <InputTable data={[data]} onSave={() => handleUpdateData(data, idx)} />,
      onAction: () => {},
    });
  };

  const getColorValue = (item: string) => {
    if (item.startsWith('-')) return false;

    if (item.startsWith('+')) return true;

    return null;
  };

  return (
    <div css={tableStyle}>
      <table css={tableVars}>
        <thead>
          <tr css={tableRowStyle}>
            <th css={tableHeadStyle}>
              <Checkbox checked={selectAll} onChange={handleAllChecked} />
            </th>
            {attributes.map((item, idx) => (
              <th key={idx} css={tableHeadStyle}>
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} css={tableRowStyle}>
                <td css={tableCellStyle}>
                  <Checkbox checked={selected[idx]} onChange={() => handleSelected(idx)} />
                </td>
                <td css={tableCellStyle}>{row.date}</td>
                <td css={tableCellStyle}>{row.original}</td>
                <td css={tableCellStyle}>{row.trade}</td>
                <td
                  css={[
                    tableCellStyle,
                    getColorValue(row.day) === true
                      ? redTextStyle
                      : getColorValue(row.day) === false
                        ? blueTextStyle
                        : defaultTextStyle,
                  ]}
                >
                  {row.day}
                </td>
                <td css={tableCellStyle}>{row.daily}</td>
                <td css={tableCellStyle}>{row.addMoney}</td>
                <td css={tableCellStyle}>{row.addRate}</td>
                <td css={tableCellStyle}>
                  <Button
                    variant='secondaryGray'
                    size='xs'
                    width={65}
                    onClick={() => handleUpdateModal(row, idx)}
                  >
                    수정
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={attributes.length + 1} css={noDataStyle}>
                내용을 추가해주세요.
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
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TableModal />
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
  ${theme.textStyle.body.body2};

  button {
    margin: 0 auto;
  }
`;

const noDataStyle = css`
  height: 200px;
  vertical-align: middle;
  text-align: center;
  padding: 16px;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.textStyle.body.body2};
`;

const addArea = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const defaultTextStyle = css`
  color: ${theme.colors.gray[700]};
`;
const redTextStyle = css`
  color: ${theme.colors.main.red};
`;

const blueTextStyle = css`
  color: ${theme.colors.main.blue};
`;
export default AnalysisTable;
