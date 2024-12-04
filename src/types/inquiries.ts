export type Status = 'COMPLETED' | 'PENDING';

// 문의등록
export interface InquiryCreateData {
  investorId: string;
  traderId: string;
  strategyId: number;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  title: string;
  content: string;
  status: Status;
}

export interface InquiryData {
  id: number;
  investorName: string;
  investorProfileUrl: string | null;
  traderName: string;
  traderProfileUrl: string | null;
  strategyName: string;
  investmentDate: string;
  title: string;
  status: Status;
  createdAt: string;
}

export interface InquiryDetailData {
  id: number;
  investorId: string;
  investorName: string;
  investorProfileUrl: string;
  traderId: string;
  traderName: string;
  traderProfileUrl: string;
  strategyId: number;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  title: string;
  content: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  replyContent: string;
  answerDate: string;
  replyCreatedAt: string;
  replyUpdatedAt: string;
}

export interface InquiryReplyDetail {
  id: number;
  investorId: string;
  investorName: string;
  investorProfileUrl: string;
  traderId: string;
  traderName: string;
  traderProfileUrl: string;
  strategyId: number;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  title: string;
  content: string;
  status: 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  replyContent: string;
  answerDate: string;
  replyCreatedAt: string;
  replyUpdatedAt?: string | null;
}

// 문의 등록 반환 값
export interface InquiryCreateResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  replyContent: string | null;
  answerDate: string | null;
  replyCreatedAt: string | null;
  replyUpdatedAt: string | null;
  investorId: string;
  traderId: string;
  strategyId: number;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  title: string;
  content: string;
  status: Status;
}

export interface InquiryUpdateResponse {
  id: number;
  investorId: string;
  investorName: string;
  traderId: string;
  traderName: string;
  strategyId: number;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  title: string;
  content: string;
  status: string;
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

export interface StrategyInfoProps
  extends Pick<InquiryDetailData, 'strategyName' | 'investmentAmount' | 'investmentDate'> {}

export interface InquiresInputProps extends Pick<InquiryDetailData, 'title' | 'content'> {}
