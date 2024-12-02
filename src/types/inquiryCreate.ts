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
