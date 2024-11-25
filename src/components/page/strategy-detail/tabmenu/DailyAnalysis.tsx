import { useState, useEffect, useMemo } from 'react';

import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';

import AnalysisTable, { AnalysisProps } from '../table/AnalysisTable';
import InputTable, { InputTableProps } from '../table/InputTable';
import TableModal from '../table/TableModal';

import { fetchDailyAnalysis } from '@/api/strategyDetail';
import Button from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';
import usePagination from '@/hooks/usePagination';
import useTableModalStore from '@/stores/tableModalStore';

export interface AnalysisDataProps {
  daily_strategic_statistics_id: number;
  input_date: string;
  principal: number;
  dep_wd_price: number;
  daily_profit_loss: number;
  daily_pl_rate: number;
  cumulative_profit_loss: number;
  cumulative_profit_loss_rate: number;
}

const DailyAnalysis = ({ strategyId, attributes }: AnalysisProps) => {
  const [tableData, setTableData] = useState<InputTableProps[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisDataProps[]>([]);
  const { pagination, setPage, setPaginatedData } = usePagination(1, 5);
  const { openTableModal } = useTableModalStore();
  const normalizedData = useMemo(
    () =>
      analysis.map((data) => ({
        dataId: data.daily_strategic_statistics_id,
        date: data.input_date,
        principal: data.principal,
        dep_wd_price: data.dep_wd_price,
        profit_loss: data.daily_profit_loss,
        pl_rate: data.daily_pl_rate,
        cumulative_profit_loss: data.cumulative_profit_loss,
        cumulative_profit_loss_rate: data.cumulative_profit_loss_rate,
      })),
    [analysis]
  );

  const handleOpenModal = () => {
    const initalData = Array(5).fill({ date: '', trade: '', day: '' });
    openTableModal({
      type: 'insert',
      title: '일간분석 데이터 직접 입력',
      data: <InputTable data={initalData} onChange={handleInputChange} />,
      onAction: handleSaveData,
    });
  };

  const handleInputChange = (updatedData: InputTableProps[]) => {
    setTableData(updatedData);
  };

  const handleSaveData = () => {
    setTableData((prevData) => {
      const updatedData = [...prevData, ...tableData];
      return updatedData;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDailyAnalysis(
        Number(strategyId),
        pagination.currentPage,
        pagination.pageSize
      );
      setAnalysis(res.data);
      setPaginatedData({
        currentPage: res.page,
        totalPage: res.totalPages,
        totalElements: res.totalItems,
        pageSize: res.pageSize,
      });
    };
    fetchData();
  }, [strategyId, pagination.currentPage, pagination.pageSize, setPaginatedData]);

  return (
    <div css={dailyStyle}>
      {analysis.length > 0 && (
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
      <AnalysisTable
        attributes={attributes}
        analysis={normalizedData}
        mode={'write'}
        onUpload={handleOpenModal}
      />
      <div css={PaginationArea}>
        <Pagination
          totalPage={pagination.totalPage}
          limit={pagination.pageSize}
          page={pagination.currentPage}
          setPage={setPage}
        />
      </div>
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

const PaginationArea = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 40px;
`;
export default DailyAnalysis;
