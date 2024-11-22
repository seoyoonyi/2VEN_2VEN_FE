export interface InquiryDetailData {
  id: number;
  investorId: string;
  investorName: string;
  investorProfileUrl: string;
  title: string;
  content: string;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  status: 'PENDING' | 'COMPLETE';
  traderId: string;
  traderName: string;
  traderProfileUrl: string;
  traderAnswer: string;
  answerDate: string;
  strategyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionProps {
  title: string;
  investorName: string;
  investorProfileUrl: string;
  createdAt: string;
  content: string;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  status: 'PENDING' | 'COMPLETE';
}

export interface AnswerProps {
  traderName: string;
  traderProfileUrl: string;
  traderAnswer: string;
  answerDate: string;
}
