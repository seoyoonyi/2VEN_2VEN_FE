import { useEffect, useState, useMemo } from 'react';

import { css } from '@emotion/react';

import AnalysisTable, { AnalysisProps } from '../table/AnalysisTable';

import { fetchMonthlyAnalysis } from '@/api/strategyDetail';
import Pagination from '@/components/common/Pagination';

export interface MonthlyDataProps {
  strategyMonthlyDataId: number;
  analysisMonth: string;
  monthlyAveragePrinciple: number;
  monthlyDepWdAmount: number;
  monthlyPl: number;
  monthlyReturn: number;
  monthlyCumulativePl: number;
  monthlyCumulativeReturn: number;
}

const MonthlyAnalysis = ({ attributes, strategyId }: AnalysisProps) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyDataProps[]>([]);
  const [paginatedData, setPaginatedData] = useState({
    currentPage: 1,
    totalPage: 0,
    totalElements: 0,
    pageSize: 5,
  });
  const normalizedData = useMemo(
    () =>
      monthlyData.map((data) => ({
        dataId: data.strategyMonthlyDataId,
        date: data.analysisMonth,
        principal: data.monthlyAveragePrinciple,
        dep_wd_price: data.monthlyDepWdAmount,
        profit_loss: data.monthlyPl,
        pl_rate: data.monthlyReturn,
        cumulative_profit_loss: data.monthlyCumulativePl,
        cumulative_profit_loss_rate: data.monthlyCumulativeReturn,
      })),
    [monthlyData]
  );

  const handleChangePage = async (newPage: number) => {
    setPaginatedData((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMonthlyAnalysis(
        Number(strategyId),
        paginatedData.currentPage,
        paginatedData.pageSize
      );
      setPaginatedData({
        currentPage: res.page,
        totalPage: res.totalPages,
        totalElements: res.totalItems,
        pageSize: res.pageSize,
      });
      setMonthlyData(res.data);
    };
    fetchData();
  }, [strategyId, paginatedData.currentPage, paginatedData.pageSize]);

  return (
    <div css={monthlyStyle}>
      <AnalysisTable attributes={attributes} analysis={normalizedData} mode='read' />
      <div css={paginationArea}>
        <Pagination
          limit={paginatedData.pageSize}
          page={paginatedData.currentPage}
          totalPage={paginatedData.totalPage}
          setPage={handleChangePage}
        />
      </div>
    </div>
  );
};

const monthlyStyle = css`
  width: 100%;
`;

const paginationArea = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 40px;
`;
export default MonthlyAnalysis;
