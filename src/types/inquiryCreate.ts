export type Status = 'COMPLETED' | 'PENDING';

// 문의등록
export interface InquiryCreateData {
  strategyId: number;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  title: string;
  content: string;
  status: string;
}

// 문의 등록 반환 값
export interface InquiryCreateResponce {
  id: number;
  investorId: string;
  investorName: string;
  investorProfileUrl: string | null;
  traderId: string;
  traderName: string;
  traderProfileUrl: string | null;
  strategyId: number;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  title: string;
  content: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  replyContent: string | null;
  answerDate: string | null;
  replyCreatedAt: string | null;
  replyUpdatedAt: string | null;
}

// 전략 폼 요청
