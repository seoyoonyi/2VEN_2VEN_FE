import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import InquiresInput from '@/components/page/mypage-investor/inquires-edit/InquiresInput';
import StrategyInfo from '@/components/page/mypage-investor/inquires-edit/StrategyInfo';
import theme from '@/styles/theme';
import { InquiryDetailData } from '@/types/myinquires';

const myInquiresDetailData: InquiryDetailData = {
  id: 1,
  investorId: 'string',
  investorName: '내가여기서투자짱',
  investorProfileUrl:
    'https://i.pinimg.com/enabled_lo_mid/736x/78/04/d7/7804d73be61366364997b925a613f438.jpg',
  traderId: 'string',
  traderName: '나는야전략가',
  traderProfileUrl: 'https://i.pinimg.com/736x/e1/f2/c8/e1f2c8afb9d6a5613107b4b3115b4f6c.jpg',
  strategyId: 0,
  strategyName: '사람들이 살 때 많이 따라사는 전략',
  investmentAmount: 200000000000,
  investmentDate: '2024-11-22T03:34:23.732Z',
  title: '이거 믿을만한 전략인가요, 이거 믿을만한 전략인가요..?',
  content: `안녕하세요. 이 전략의 최근 1년간 평균 수익률과 최대 손실률이 궁금합니다. 데이터를 확인할 수 있다면 공유 부탁드립니다. 또한, 변동성이 큰 시장 상황에서도 안정적으로 작동하는 전략인지 알고 싶습니다. 예를 들어, 최근 금리 인상기 동안 어떤 성과를 보였는지 궁금합니다.😊😊😊 이 전략에서 주로 사용하는 자산이 무엇인지도 알고 싶습니다. 제 투자 성향이 보수적인 편인데, 이 전략이 제게 적합할지 조언해주시면 감사하겠습니다. 마지막으로, 초보 투자자도 이 전략을 쉽게 따라 할 수 있는지 알고 싶습니다. 시작할 때 주의해야 할 점이나 참고할 수 있는 자료가 있다면 알려주세요. 감사합니다. 😊 안녕하세요. 이 전략의 최근 1년간 평균 수익률과 최대 손실률이 궁금합니다. 데이터를 확인할 수 있다면 공유 부탁드립니다. 또한, 변동성이 큰 시장 상황에서도 안정적으로 작동하는 전략인지 알고 싶습니다. 예를 들어, 최근 금리 인상기 동안 어떤 성과를 보였는지 궁금합니다.😊😊😊 이 전략에서 주로 사용하는 자산이 무엇인지도 알고 싶습니다. 제 투자 성향이 보수적인 편인데, 이 전략이 제게 적합할지 조언해주시면 감사하겠습니다. 마지막으로, 초보 투자자도 이 전략을 쉽게 따라 할 수 있는지 알고 싶습니다. 시작할 때 주의해야 할 점이나 참고할 수 있는 자료가 있다면 알려주세요. 감사합니다. 😊`,
  status: 'COMPLETE',
  createdAt: '2024-11-22T03:34:23.732Z',
  updatedAt: '2024-11-22T03:34:23.732Z',
  traderAnswer:
    '안녕하세요. 문의해주셔서 감사합니다! 이 전략의 최근 1년간 평균 수익률은 약 12%이며, 최대 손실률은 5% 정도입니다. 전략의 성과 데이터는 전략 페이지에서 확인하실 수 있으니 참고 부탁드립니다. 변동성이 큰 시장에서도 안정적으로 작동하도록 설계된 전략입니다. 특히 최근 금리 인상기 동안에도 안정적인 수익률을 유지했으며, 시장 변동성에 대응하는 방식을 지속적으로 개선하고 있습니다. 이 전략은 주로 대형 우량주와 ETF를 중심으로 구성되어 있으며, 보수적인 투자 성향에도 적합합니다. 포트폴리오 리스크를 최소화하면서도 꾸준한 수익을 목표로 하고 있으니 투자 성향과 잘 맞을 거라 생각됩니다. 초보 투자자분들도 쉽게 따라 하실 수 있도록 상세한 가이드와 추천 종목 리스트를 제공하고 있습니다. 시작 시 궁금한 점이 있으시면 언제든 문의해주시면 자세히 도와드리겠습니다. 감사합니다, 좋은 하루 되세요! 😊🙇‍♀️👍',
  answerDate: '2024-11-22T03:34:23.732Z',
};

const MyInquiresEditPage = () => (
  <div css={editWrapper}>
    <div css={titleStyle}>문의 수정</div>
    <StrategyInfo {...myInquiresDetailData} />
    <InquiresInput {...myInquiresDetailData} />
    <div css={buttonWrapper}>
      <Button variant='neutral' customStyle={buttonStyle}>
        작성취소
      </Button>
      <Button customStyle={buttonStyle}>수정완료</Button>
    </div>
  </div>
);

const editWrapper = css`
  width: 955px;
  display: flex;
  flex-direction: column;
  padding: 48px 40px 56px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const titleStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.heading.h3};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.md};
  margin-bottom: 24px;
`;

const buttonWrapper = css`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  padding: 0 32px;
`;

export default MyInquiresEditPage;
