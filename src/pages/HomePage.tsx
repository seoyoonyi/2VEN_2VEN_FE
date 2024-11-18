import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import axios from 'axios';
import { MdKeyboardArrowRight, MdArrowForward } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';

import TraderUserImage3 from '@/assets/images/ani_trader.png';
import TraderUserImage1 from '@/assets/images/apt_trader.png';
import EverageMetricsChartImage from '@/assets/images/everage_metrics_chart.png';
import InvestorMainImage from '@/assets/images/investor_main.png';
import TraderUserImage2 from '@/assets/images/nimo_trader.png';
import SMScoreGraphImage from '@/assets/images/SMScore_graph.png';
import TraderMainImage from '@/assets/images/trader_main.png';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const HomePage = () => {
  const navigate = useNavigate();

  const [traderCount, setTraderCount] = useState('0'); // 기본값 설정
  const [strategyCount, setStrategyCount] = useState('0'); // 기본값 설정

  useEffect(() => {
    const fetchTraderStats = async () => {
      try {
        const { data } = await axios.get('/api/trader-Strategy');
        setTraderCount(data.traderCount || '0');
        setStrategyCount(data.strategyCount || '0');
      } catch (error) {
        console.error('트레이더 통계 조회 실패:', error);
      }
    };

    fetchTraderStats();
  }, []);

  const rankingData = [
    {
      rank: 1,
      strategyId: 101,
      strategyName: '따라사는 전략',
      traderNickname: 'MACS',
      traderImage: TraderUserImage1,
      graph: SMScoreGraphImage,
      dailyChange: '0%',
      cumulativeReturn: '37%',
      smScore: 85, // SM SCORE 추가
    },
    {
      rank: 2,
      strategyId: 102,
      strategyName: 'EFT레버리지/인버스',
      traderNickname: 'NIMO',
      traderImage: TraderUserImage2,
      graph: SMScoreGraphImage,
      dailyChange: '1%',
      cumulativeReturn: '40%',
      smScore: 82,
    },
    {
      rank: 3,
      strategyId: 103,
      strategyName: '인플레이션 방어 전략',
      traderNickname: 'AniHelp',
      traderImage: TraderUserImage3,
      graph: SMScoreGraphImage,
      dailyChange: '-1%',
      cumulativeReturn: '33%',
      smScore: 78,
    },
    {
      rank: 4,
      strategyId: 104,
      strategyName: 'S&P500 추종 전략',
      traderNickname: 'AptHunter',
      traderImage: TraderUserImage1,
      graph: SMScoreGraphImage,
      dailyChange: '2%',
      cumulativeReturn: '50%',
      smScore: 75,
    },
    {
      rank: 5,
      strategyId: 105,
      strategyName: '유동성 높은 ETF 전략',
      traderNickname: 'SmartInvestor',
      traderImage: TraderUserImage2,
      graph: SMScoreGraphImage,
      dailyChange: '0%',
      cumulativeReturn: '45%',
      smScore: 70,
    },
  ];

  const handleSignUpClick = () => {
    navigate(ROUTES.AUTH.SIGNUP.SELECT_TYPE);
  };

  const handleStrategyListClick = () => {
    navigate(ROUTES.STRATEGY.LIST);
  };

  const handleTraderListClick = () => {
    navigate(ROUTES.TRADER.LIST);
  };

  return (
    <>
      {/* 투자자Main */}
      <section css={investorSectionStyle}>
        <div css={contentStyle}>
          {/* 왼쪽 영역 */}
          <div css={textStyle}>
            <div>
              <p css={questionTextStyle}>투자자이신가요?</p>
              <h1 css={mainHeadingStyle}>가장 좋은 투자 전략을 Follow 하세요!</h1>
              <p css={subTextStyle}>관심 전략의 레코드가 매일매일 업데이트됩니다</p>
            </div>
            <div css={buttonGroupStyle}>
              <Button variant='primary' size='xl' width={208} onClick={handleSignUpClick}>
                투자자 가입하기
              </Button>
              <Button variant='secondary' size='xl' width={208} onClick={handleStrategyListClick}>
                전략 랭킹 보기
              </Button>
            </div>
          </div>
          {/* 오른쪽 영역 */}
          <div css={rightSectionStyle}>
            <img src={InvestorMainImage} alt='투자자 이미지' css={imageStyle} />
          </div>
        </div>
        {/* 팔로우 랭킹 */}
        <div css={followStyle}>
          <div css={rankingBoxStyle}>
            <div css={rankingTitleStyle}>
              <h3>팔로우 랭킹</h3>
              <button onClick={handleTraderListClick} css={rankingButtonStyle}>
                랭킹더보기
                <MdArrowForward css={arrowForwardStyle} />
              </button>
            </div>
            <div css={rankingItemStyle}>
              <div css={rankWithIconStyle}>
                <h3 css={rankTextStyle}>1st</h3>
                <MdKeyboardArrowRight css={arrowIconStyle} />
              </div>
              <div css={userInfoStyle}>
                <img src={TraderUserImage1} alt='아파트수집가' css={userImageStyle} />
                <p css={traderNameStyle}>아파트수집가</p>
              </div>
              <span css={amountTextStyle}>137,031,335원</span>
            </div>
            <div css={rankingItemStyle}>
              <div css={rankWithIconStyle}>
                <h3 css={rankTextStyle}>2nd</h3>
                <MdKeyboardArrowRight css={arrowIconStyle} />
              </div>
              <div css={userInfoStyle}>
                <img src={TraderUserImage2} alt='제로니모' css={userImageStyle} />
                <p css={traderNameStyle}>제로니모</p>
              </div>
              <span css={amountTextStyle}>29,852,370원</span>
            </div>
            <div css={rankingItemStyle}>
              <div css={rankWithIconStyle}>
                <h3 css={rankTextStyle}>3rd</h3>
                <MdKeyboardArrowRight css={arrowIconStyle} />
              </div>
              <div css={userInfoStyle}>
                <img src={TraderUserImage3} alt='애니헬프' css={userImageStyle} />
                <p css={traderNameStyle}>애니헬프</p>
              </div>
              <span css={amountTextStyle}>29,266,720원</span>
            </div>
          </div>
          <div css={descriptionContainerStyle}>
            <p css={descriptionStyle}>트레이더의 누적 수익 금액입니다.</p>
          </div>
        </div>
      </section>

      {/* 트레이더Main */}
      <section css={traderSectionStyle}>
        <div css={traderContentStyle}>
          <div css={traderMainStyle}>
            {/* 왼쪽 영역 - 이미지 */}
            <div css={leftSectionStyle}>
              <img src={TraderMainImage} alt='트레이더 이미지' css={imageStyle} />
            </div>
            {/* 오른쪽 영역 - 텍스트 */}
            <div css={traderTextStyle}>
              <div>
                <p css={questionTextStyle}>트레이더이신가요?</p>
                <h1 css={mainHeadingStyle}>
                  지금 바로 좋은 투자
                  <br /> 전략을 공유해 보세요
                </h1>
                <p css={subTextStyle}>투자전략 분석과 투자자 매칭서비스를 제공해드립니다</p>
              </div>
              <div css={buttonGroupStyle}>
                <Button variant='primary' size='xl' width={208} onClick={handleSignUpClick}>
                  트레이더 가입하기
                </Button>
                <Button variant='secondary' size='xl' width={208} onClick={handleTraderListClick}>
                  트레이더 목록보기
                </Button>
              </div>
            </div>
          </div>
          {/* 통계 정보 */}
          <div css={traderTotalStyle}>
            <div css={statsImageContainerStyle}>
              <img src={TraderUserImage1} alt='트레이더1' css={userImageStyle} />
              <img src={TraderUserImage2} alt='트레이더2' css={userImageStyle} />
              <img src={TraderUserImage3} alt='트레이더3' css={userImageStyle} />
            </div>
            <p css={statsTextStyle}>
              <span css={highlightTextStyle}>+{traderCount}</span>
              <span css={spacingTextStyle}>명의 트레이더가</span> {/* 간격 조정 */}
              <span css={highlightTextStyle}>{strategyCount}</span>
              <span css={spacingTextStyle}>개의 전략을 공유하고 있습니다</span> {/* 간격 조정 */}
            </p>
          </div>
          {/* 대표전략통합평균지표 */}
          <div css={metricsContainerStyle}>
            <img
              src={EverageMetricsChartImage}
              alt='대표전략통합평균지표'
              css={metricsImageStyle}
            />
            {/* SMScore */}
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
                {rankingData.map((data) => (
                  <Link to={`/strategies/${data.strategyId}`} key={data.rank} css={rowStyle}>
                    <div css={rankStyle}>{data.rank}</div>
                    <div css={strategyStyle}>
                      <div css={strategyTitleStyle}>{data.strategyName}</div>
                      <div css={traderInfoStyle}>
                        <img
                          src={data.traderImage}
                          alt={`${data.traderNickname} 이미지`}
                          css={traderImageStyle}
                        />
                        <span css={traderNicknameStyle}>{data.traderNickname}</span>
                      </div>
                    </div>
                    <div css={graphStyle}>
                      <img src={data.graph} alt='그래프' />
                    </div>
                    <div css={dailyChangeStyle}>
                      <span className='value'>{data.dailyChange.split('%')[0]}</span>
                      <span className='percent'>%</span>
                    </div>
                    <div css={cumulativeReturnStyle}>
                      <span className='value'>{data.cumulativeReturn.split('%')[0]}</span>
                      <span className='percent'>%</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 마지막섹션(배경) */}
      <section css={lastSectionStyle}></section>
    </>
  );
};

/* 투자자Main */
const investorSectionStyle = css`
  position: relative;
`;

const contentStyle = css`
  max-width: ${theme.layout.width.content};
  height: 894px;
  display: flex;
  gap: 20px;
  margin: 0 auto;
`;

const textStyle = css`
  padding: 88px 0;
`;

const questionTextStyle = css`
  ${theme.textStyle.subtitles.subtitle3};
  color: ${theme.colors.teal[600]};
  margin-bottom: 16px;
`;

const mainHeadingStyle = css`
  ${theme.textStyle.headings.h1};
  color: ${theme.colors.gray[900]};
  margin-bottom: 12px;
`;

const subTextStyle = css`
  ${theme.textStyle.subtitles.subtitle2};
  color: ${theme.colors.gray[700]};
  margin-bottom: 40px;
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 16px;
`;

const rightSectionStyle = css`
  height: 550px;
`;

const imageStyle = css`
  height: 100%;
`;

/* 팔로우 랭킹 */
const followStyle = css`
  position: absolute;
  left: 50%;
  bottom: -120px;
  transform: translate(-50%, 0);
  width: ${theme.layout.width.content};
  margin: -100px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
`;

const rankingBoxStyle = css`
  display: flex;
  width: 100%;
`;

const rankingTitleStyle = css`
  background-color: ${theme.colors.gray[900]};
  color: ${theme.colors.main.white};
  width: 25%;
  height: 342px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 54px 40px;
  ${theme.textStyle.headings.h3}
`;

const rankingButtonStyle = css`
  ${theme.textStyle.captions.caption2};
  color: ${theme.colors.main.white};
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: 0;
  cursor: pointer;
`;

const arrowForwardStyle = css`
  font-size: 20px;
  color: ${theme.colors.main.white};
`;

const rankingItemStyle = css`
  background-color: ${theme.colors.gray[50]};
  width: 25%;
  height: 342px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-right: 1px solid ${theme.colors.gray[200]};
  padding: 54px 40px;
  gap: 8px;
`;

const rankWithIconStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const rankTextStyle = css`
  color: ${theme.colors.teal[700]};
  ${theme.textStyle.headings.h3};
`;

const arrowIconStyle = css`
  color: ${theme.colors.gray[900]};
  font-size: 24px;
`;

const userInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const traderNameStyle = css`
  color: ${theme.colors.gray[900]};
  ${theme.textStyle.subtitles.subtitle2};
`;

const userImageStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.main.white}; /* 토탈공유 */
  position: relative; /* 토탈공유 */
  margin-left: -12px; /* 토탈공유 */
  &:first-of-type {
    margin-left: 0;
  }
`;

const amountTextStyle = css`
  ${theme.textStyle.subtitles.subtitle1};
  color: ${theme.colors.gray[900]};
  text-align: center;
`;

const descriptionContainerStyle = css`
  width: 100%;
  text-align: right;
  margin-top: 16px;
`;

const descriptionStyle = css`
  ${theme.textStyle.captions.caption2};
  color: ${theme.colors.gray[400]};
`;

/* 투자자Main */

const traderSectionStyle = css`
  position: relative;
  background-color: ${theme.colors.gray[200]};
  padding-top: 300px;
`;

const traderContentStyle = css`
  height: 1476px;
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
`;

const traderMainStyle = css`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const leftSectionStyle = css`
  height: 520px;
`;

const traderTotalStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 16px;
`;

const statsImageContainerStyle = css`
  display: flex;
  position: relative;
`;

const statsTextStyle = css`
  ${theme.textStyle.headings.h3}
  color: ${theme.colors.gray[500]};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const highlightTextStyle = css`
  ${theme.textStyle.headings.h2}
  color: ${theme.colors.gray[900]};
`;

const spacingTextStyle = css`
  color: ${theme.colors.gray[600]};
  margin-right: 4px;
`;

const traderTextStyle = css`
  padding: 80px 0;
`;

/*대표전략통합평균지표*/
const metricsContainerStyle = css`
  position: absolute;
  width: ${theme.layout.width.content};
  z-index: 10;
`;

const metricsImageStyle = css`
  padding: 200px 0;
  width: 100%;
`;

/*SM Score*/
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

  img {
    width: 90%;
  }
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

const lastSectionStyle = css`
  position: relative;
  height: 2098px;
`;

export default HomePage;
