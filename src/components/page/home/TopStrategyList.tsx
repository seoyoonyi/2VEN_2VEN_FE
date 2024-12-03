import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import LineChart from '@/components/common/LineChart';
import theme from '@/styles/theme';

interface RankingData {
  strategyId: number;
  strategyTitle: string;
  traderNickname: string;
  traderProfile: string;
  cumulativeProfitLossRateList: number[];
  dailyChange: number;
  cumulativeProfitLossRate: number;
  smScore: number;
}

interface TopStrategyListProps {
  rankingData: RankingData[];
}

const TopStrategyList = ({ rankingData }: TopStrategyListProps) => {
  // 1. SM Score 기준 내림차순 정렬
  const sortedData = [...rankingData].sort((a, b) => b.smScore - a.smScore);

  return (
    <div css={scoreContentStyle}>
      <div>
        <h1 css={scoreTitleStyle}>SM SCORE 랭킹 TOP 5</h1>
      </div>
      <div css={tableStyle}>
        <div css={headerStyle}>
          <div>순위</div>
          <div>전략명</div>
          <div>그래프</div>
          <div>전일대비</div>
          <div>누적수익률</div>
        </div>
        {sortedData.slice(0, 5).map(
          (
            data,
            index // 상위 5개만 표시
          ) => (
            <Link to={`/strategies/${data.strategyId}`} key={data.strategyId} css={rowStyle}>
              <div css={rankStyle}>{index + 1}</div>
              <div css={strategyStyle}>
                <div css={strategyTitleStyle}>{data.strategyTitle}</div>
                <div css={traderInfoStyle}>
                  <img
                    src={data.traderProfile || '/default-image.png'} // 기본 이미지 제공
                    alt={`${data.traderNickname || '익명'} 이미지`}
                    css={traderImageStyle}
                  />
                  <span css={traderNicknameStyle}>{data.traderNickname || '익명'}</span>
                </div>
              </div>
              <div css={graphStyle}>
                {data.cumulativeProfitLossRateList?.length > 0 ? (
                  <LineChart
                    data={data.cumulativeProfitLossRateList}
                    size='md'
                    colorTheme='secondary'
                  />
                ) : (
                  '-'
                )}
              </div>
              <div css={dailyChangeStyle}>
                {data.dailyChange !== 0 ? (
                  <>
                    <span className='value'>{data.dailyChange}</span>
                    <span className='percent'>%</span>
                  </>
                ) : (
                  '-'
                )}
              </div>
              <div css={cumulativeReturnStyle}>
                {data.cumulativeProfitLossRate !== 0 ? (
                  <>
                    <span className='value'>{data.cumulativeProfitLossRate}</span>
                    <span className='percent'>%</span>
                  </>
                ) : (
                  '-'
                )}
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

const scoreContentStyle = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
`;

const scoreTitleStyle = css`
  ${theme.textStyle.headings.h1}
  color: ${theme.colors.gray[900]};
  text-align: center;
  padding: 56px;
`;

const tableStyle = css``;

const headerStyle = css`
  background-color: ${theme.colors.gray[800]};
  ${theme.textStyle.subtitles.subtitle3};
  color: ${theme.colors.main.white};
  display: grid;
  height: 56px;
  grid-template-columns: 64px 378px 378px 160px 160px;
  align-items: center;
  text-align: center;
`;

const rowStyle = css`
  display: grid;
  grid-template-columns: 64px 378px 378px 160px 160px;
  height: 200px;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid ${theme.colors.gray[400]};
  &:last-child {
    border-bottom: 0;
  }
`;

const rankStyle = css`
  ${theme.textStyle.headings.h3};
  color: ${theme.colors.teal[600]};
  padding: 36px 0;
`;

const strategyStyle = css`
  align-items: flex-start;
  padding: 24px;
`;

const strategyTitleStyle = css`
  ${theme.textStyle.headings.h3};
  color: ${theme.colors.gray[900]};
  text-align: start;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const traderInfoStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  text-align: center;
  align-items: center;
`;

const traderImageStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const traderNicknameStyle = css`
  ${theme.textStyle.subtitles.subtitle2};
  color: ${theme.colors.gray[900]};
`;

const graphStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const dailyChangeStyle = css`
  color: ${theme.colors.gray[900]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .value {
    ${theme.textStyle.headings.h2};
  }

  .percent {
    ${theme.textStyle.headings.h3};
  }
`;

const cumulativeReturnStyle = css`
  color: ${theme.colors.main.red};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .value {
    ${theme.textStyle.headings.h2};
  }

  .percent {
    ${theme.textStyle.headings.h3};
  }
`;

export default TopStrategyList;
