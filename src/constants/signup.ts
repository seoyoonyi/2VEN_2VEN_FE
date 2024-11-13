import InvestorCardImage from '@/assets/images/investor_card.png';
import TraderCardImage from '@/assets/images/trader_card.png';
import { UserTypeText } from '@/types/signup';
export const USER_TYPE_TEXT: UserTypeText = {
  investor: {
    heading: '투자자로 가입',
    description: '다양한 전략을 확인하고 싶은가요?',
    src: InvestorCardImage,
    alt: '투자자카드 이미지',
  },
  trader: {
    heading: '트레이더로 가입',
    description: '나만의 전략을 공유하고 싶은가요?',
    src: TraderCardImage,
    alt: '트레이더카드 이미지',
  },
};
