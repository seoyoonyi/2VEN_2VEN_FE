import { css } from '@emotion/react';

import futureIcon from '@/assets/images/producttype_futures.png';
import StockIcon from '@/assets/images/producttype_stock.png';
import TradeTypeHIcon from '@/assets/images/tradetype_H.png';
import TradeTypePIcon from '@/assets/images/tradetype_P.png';
import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import RejectTextarea from '@/components/page/admin/RejectTextarea';
import StatusComponent from '@/components/page/admin/strategyStatusLabel';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { formatDate } from '@/utils/dateFormat';
import { getPostStatus } from '@/utils/statusUtils';

interface Strategy {
  strategyApprovalRequestId: number;
  requestDatetime: string;
  isApproved: string;
  strategyId: number;
  strategyTitle: string;
  isPosted: string;
  strategyStatus: string;
  tradingTypeIcon: string;
  tradingCycleIcon: string;
  investmentAssetClassesIcons: string[];
}

const data: Strategy[] = [
  {
    strategyApprovalRequestId: 10,
    requestDatetime: '2024-11-22T19:05:22.521418',
    isApproved: 'N',
    strategyId: 2,
    strategyTitle:
      '사람들 많이 살 때 따라사는 전략입니다람쥐 사람들 많이 살 때 따라사는 전략입니다람쥐',
    isPosted: 'Y',
    strategyStatus: 'STRATEGY_OPERATION_UNDER_MANAGEMENT',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [StockIcon, StockIcon, StockIcon, StockIcon],
  },
  {
    strategyApprovalRequestId: 11,
    requestDatetime: '2024-11-22T20:10:30.123456',
    isApproved: 'Y',
    strategyId: 3,
    strategyTitle:
      '사람들 많이 살 때 따라사는 전략입니다람쥐 사람들 많이 살 때 따라사는 전략입니다람쥐',
    isPosted: 'N',
    strategyStatus: 'STRATEGY_OPERATION_COMPLETED',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [futureIcon, StockIcon],
  },
  {
    strategyApprovalRequestId: 12,
    requestDatetime: '2024-11-22T21:15:45.789012',
    isApproved: 'N',
    strategyId: 4,
    strategyTitle:
      '사람들 많이 살 때 따라사는 전략입니다람쥐 사람들 많이 살 때 따라사는 전략입니다람쥐',
    isPosted: 'Y',
    strategyStatus: 'STRATEGY_OPERATION_UNDER_MANAGEMENT',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [futureIcon, StockIcon],
  },
  {
    strategyApprovalRequestId: 13,
    requestDatetime: '2024-11-23T08:25:00.456789',
    isApproved: 'Y',
    strategyId: 5,
    strategyTitle:
      '사람들 많이 살 때 따라사는 전략입니다람쥐 사람들 많이 살 때 따라사는 전략입니다람쥐',
    isPosted: 'N',
    strategyStatus: 'STRATEGY_OPERATION_UNDER_MANAGEMENT',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [futureIcon, futureIcon, futureIcon, futureIcon, futureIcon],
  },
  {
    strategyApprovalRequestId: 14,
    requestDatetime: '2024-11-23T09:40:10.123456',
    isApproved: 'N',
    strategyId: 6,
    strategyTitle:
      '사람들 많이 살 때 따라사는 전략입니다람쥐 사람들 많이 살 때 따라사는 전략입니다람쥐',
    isPosted: 'Y',
    strategyStatus: 'STRATEGY_OPERATION_COMPLETED',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [futureIcon, StockIcon],
  },
  // 추가된 복제 데이터
  {
    strategyApprovalRequestId: 15,
    requestDatetime: '2024-11-23T10:45:00.789012',
    isApproved: 'N',
    strategyId: 7,
    strategyTitle: '새로운 전략입니다람쥐 새로운 전략입니다람쥐 새로운 전략입니다람쥐',
    isPosted: 'N',
    strategyStatus: 'STRATEGY_OPERATION_UNDER_MANAGEMENT',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [futureIcon, StockIcon],
  },
  {
    strategyApprovalRequestId: 16,
    requestDatetime: '2024-11-23T11:55:10.456789',
    isApproved: 'Y',
    strategyId: 8,
    strategyTitle: '복제된 전략입니다람쥐 복제된 전략입니다람쥐 복제된 전략입니다람쥐',
    isPosted: 'Y',
    strategyStatus: 'STRATEGY_OPERATION_COMPLETED',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [futureIcon, futureIcon, StockIcon],
  },
  {
    strategyApprovalRequestId: 17,
    requestDatetime: '2024-11-23T12:30:30.123456',
    isApproved: 'Y',
    strategyId: 9,
    strategyTitle: '복제된 데이터 입니다람쥐 복제된 데이터 입니다람쥐 복제된 데이터 입니다람쥐',
    isPosted: 'N',
    strategyStatus: 'STRATEGY_OPERATION_COMPLETED',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [futureIcon, StockIcon, StockIcon],
  },
  {
    strategyApprovalRequestId: 18,
    requestDatetime: '2024-11-23T13:10:45.789012',
    isApproved: 'N',
    strategyId: 10,
    strategyTitle: '전략이 더 추가됩니다람쥐 전략이 더 추가됩니다람쥐 전략이 더 추가됩니다람쥐',
    isPosted: 'Y',
    strategyStatus: 'STRATEGY_OPERATION_UNDER_MANAGEMENT',
    tradingTypeIcon: TradeTypeHIcon,
    tradingCycleIcon: TradeTypePIcon,
    investmentAssetClassesIcons: [futureIcon, StockIcon, futureIcon],
  },
];

const StrategyApprovalListPage = () => {
  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();

  const handleStrategyApproval = () => {
    openModal({
      type: 'confirm',
      title: '전략 승인',
      desc: `해당 전략을 승인하시겠어요?`,
      onAction: () => console.log('전략승인했따!당당구리'),
    });
  };

  const handleStrategyReject = () => {
    openContentModal({
      title: '승인거부',
      content: <RejectTextarea />,
      onAction: () => console.log('전략거부!'),
    });
  };

  return (
    <>
      <div css={adminHeaderStyle}>
        <h2>전략 승인 관리</h2>
        <p>
          <span>0</span>개의 새로운 승인요청이 있습니다
        </p>
      </div>
      <div css={tableWrapperStyle}>
        <div css={tableContainerStyle}>
          <table>
            <colgroup css={colgroupStyle}>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>전략명</th>
                <th>전략상태</th>
                <th>등록일</th>
                <th>종목</th>
                <th>공개여부</th>
                <th>요청관리</th>
              </tr>
            </thead>
            <tbody>
              {data.map((strategy) => (
                <tr key={strategy.strategyApprovalRequestId}>
                  <td>
                    <div>
                      <p>{strategy.strategyTitle}</p>
                      <div className='badge-container'>
                        {strategy.investmentAssetClassesIcons
                          ?.slice(0, 2)
                          .map((icon, index) => (
                            <img key={`${icon}-${index}`} src={icon} alt={icon} height={18} />
                          ))}

                        <div className='count-container'>
                          {strategy.investmentAssetClassesIcons.length > 2 && (
                            <div className='count-container'>
                              +{strategy.investmentAssetClassesIcons.length - 2}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <StatusComponent status={strategy.strategyStatus} />
                  </td>
                  <td>{formatDate(strategy.requestDatetime)}</td>
                  <td>하이브리드</td>
                  <td>{getPostStatus(strategy.isPosted)}</td>
                  <td>
                    <Button variant='accent' size='sm' onClick={handleStrategyApproval}>
                      승인
                    </Button>
                    <Button variant='neutral' size='sm' onClick={handleStrategyReject}>
                      거부
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination totalPage={5} limit={10} page={1} setPage={() => {}} />
      </div>
      <Modal />
      <ContentModal />
    </>
  );
};

const adminHeaderStyle = css`
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
    margin-bottom: 8px;
  }

  p {
    ${theme.textStyle.body.body3}
    span {
      color: ${theme.colors.main.primary};
    }
  }
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

const tableContainerStyle = css`
  width: 875px;
  overflow-x: auto;

  @media (max-width: 1180px) {
    width: 774px;
  }

  @media (max-width: 1024px) {
    width: 618px;
  }

  table {
    width: 875px;
    border-collapse: collapse;

    thead {
      background-color: ${theme.colors.gray[100]};
      color: ${theme.colors.gray[700]};
      border-bottom: 1px solid ${theme.colors.gray[500]};

      th {
        height: 56px;
        vertical-align: middle;
        ${theme.textStyle.body.body1};
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid ${theme.colors.gray[200]};
      }
      td {
        height: 100px;
        vertical-align: middle;
        text-align: center;

        &:first-of-type {
          padding: 0 20px;

          p {
            width: 100%;
            width: 295px;
            height: 24px;
            margin-bottom: 12px;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          div.badge-container {
            display: flex;
            align-items: center;
            gap: 4px;
            width: 100%;

            .count-container {
              // margin-left: 4px;
              color: ${theme.colors.gray[400]};
              font-size: ${theme.typography.fontSizes.caption};
            }
          }
        }

        &:nth-of-type(2) {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &:nth-of-type(6) {
          display: flex;
          justify-content: center;
          align-items: center;

          button {
            padding: 24px 20px;
          }
        }
      }
    }
  }
`;

const colgroupStyle = css`
  col:nth-of-type(1) {
    width: 295px;
  }
  col:nth-of-type(2) {
    width: 100px;
  }
  col:nth-of-type(3) {
    width: 120px;
  }
  col:nth-of-type(4) {
    width: 100px;
  }
  col:nth-of-type(5) {
    width: 100px;
  }
  col:nth-of-type(6) {
    width: 160px;
  }
`;

export default StrategyApprovalListPage;
