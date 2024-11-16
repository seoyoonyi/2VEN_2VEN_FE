import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import theme from '@/styles/theme';

interface StrategyData {
  strategyId: number;
  strategyTitle: string;
  analytics_graph?: string;
  tradingTypeIcon: string;
  cycleIcon: string;
  investmentAssetClassesIcon: string[];
  cumulativeReturn?: number;
  oneYearReturn?: number;
  mdd?: number;
  smscore?: number;
  followers_count?: number;
}

interface StrategyListProps {
  strategies: StrategyData[];
  showRank?: boolean;
  startRank?: number;
  containerWidth?: string;
  gridTemplate?: string;
}

const StrategyList = ({
  strategies,
  showRank = false,
  startRank = 1,
  containerWidth = theme.layout.width.content,
  gridTemplate = '64px 278px 278px 160px 160px 100px 100px',
}: StrategyListProps) => (
  <div css={containerStyle(containerWidth)}>
    <div css={headerStyle(gridTemplate)}>
      {showRank && <div>순위</div>}
      <div>전략명</div>
      <div>분석 그래프</div>
      <div>수익률</div>
      <div>MDD</div>
      <div>SM Score</div>
      <div>팔로워</div>
    </div>
    {strategies.map((strategy, idx) => (
      <Link to={`/strategies/${strategy.strategyId}`} key={strategy.strategyId}>
        <div css={rowStyle(gridTemplate)}>
          {showRank && <div css={rankStyle}>{startRank + idx}</div>}
          <div css={strategyTitleContainerStyle}>
            <div css={strategyTitleStyle}>{strategy.strategyTitle}</div>
            <div css={iconStyle}>
              <img src={strategy.tradingTypeIcon} alt='매매유형' width={18} height={18} />
              <img src={strategy.cycleIcon} alt='주기' width={18} height={18} />
              {strategy.investmentAssetClassesIcon
                ?.slice(0, 2)
                .map((icon) => <img key={icon} src={icon} alt={icon} height={18} />)}
              <div css={countStyle}>
                {strategy.investmentAssetClassesIcon.length > 2 && (
                  <div css={countStyle}>+{strategy.investmentAssetClassesIcon.length - 2}</div>
                )}
              </div>
            </div>
          </div>
          <div css={graphStyle}>
            {strategy.analytics_graph ? (
              <img src={strategy.analytics_graph} alt='분석 그래프' />
            ) : (
              '-'
            )}
          </div>
          <div css={yieldStyle}>
            {strategy.cumulativeReturn !== undefined ? (
              <>
                <div>
                  <span>누적</span>
                  {strategy.cumulativeReturn}%
                </div>
                <div>
                  <span>최근 1년</span>
                  {strategy.oneYearReturn}%
                </div>
              </>
            ) : (
              '-'
            )}
          </div>
          <div css={mddStyle(strategy.mdd)}>
            {strategy.mdd !== undefined
              ? strategy.mdd > 0
                ? `+${strategy.mdd.toLocaleString()}`
                : strategy.mdd.toLocaleString()
              : '-'}
          </div>
          <div>{strategy.smscore !== undefined ? strategy.smscore : '-'}</div>
          <div>{strategy.followers_count !== undefined ? strategy.followers_count : '0'}</div>
        </div>
      </Link>
    ))}
  </div>
);

const containerStyle = (width: string) => css`
  display: flex;
  flex-direction: column;
  width: ${width};
  margin: 0 auto;
`;

const rowStyle = (gridTemplate: string) => css`
  display: grid;
  grid-template-columns: ${gridTemplate};
  align-items: center;
  height: 140px;
  background: ${theme.colors.main.white};
  color: ${theme.colors.gray[900]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  text-align: center;
  line-height: ${theme.typography.lineHeights.lg};
`;

const headerStyle = (gridTemplate: string) => css`
  ${rowStyle(gridTemplate)};
  height: 56px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const rankStyle = css`
  height: 58px;
`;

const strategyTitleContainerStyle = css`
  padding: 0 24px;
`;

const strategyTitleStyle = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-bottom: 12px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const iconStyle = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
`;

const countStyle = css`
  margin-left: 4px;
  color: ${theme.colors.gray[400]};
  font-size: ${theme.typography.fontSizes.caption};
`;

const graphStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const yieldStyle = css`
  margin: 0 auto;
  text-align: right;
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};

  span {
    color: ${theme.colors.gray[400]};
    margin-right: 4px;
  }
`;

const mddStyle = (mdd: number) => css`
  color: ${mdd < 0 ? theme.colors.main.blue : theme.colors.main.red};
`;

export default StrategyList;
