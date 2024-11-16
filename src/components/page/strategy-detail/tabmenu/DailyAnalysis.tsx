import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';

import AnalysisTable, { AnalysisProps } from '../table/AnalysisTable';
import InputTable, { InputTableProps } from '../table/InputTable';
import TableModal from '../table/TableModal';

import Button from '@/components/common/Button';
import useTableModalStore from '@/stores/tableModalStore';

const DailyAnalysis = ({ attributes, data }: AnalysisProps) => {
  //const [tableData, setTableData] = useState<InputTableProps[]>([]);
  const { openTableModal } = useTableModalStore();

  const handleOpenModal = () => {
    openTableModal({
      type: 'insert',
      title: '일간분석 데이터 직접 입력',
      data: <InputTable data={[{ date: '', trade: '', day: '' }]} onSave={handleSaveData} />,
      onAction: () => {},
    });
  };

  const handleSaveData = (data: InputTableProps[]) => {
    console.log('저장~^^');
  };

  return (
    <div css={dailyStyle}>
      {data.length > 0 && (
        <div css={editArea}>
          <div css={addArea}>
            <Button
              variant='secondary'
              size='xs'
              width={116}
              css={buttonStyle}
              onClick={handleOpenModal}
            >
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
      <AnalysisTable attributes={attributes} data={data} mode={'write'} />
      <TableModal />
    </div>
  );
};

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
