export interface UserTypeData {
  heading: string;
  description: string;
  src: string;
  alt: string;
}
export interface UserTypeText {
  investor: UserTypeData;
  trader: UserTypeData;
}

export interface TermsState {
  privacyRequired: boolean;
  roleRequired: boolean;
  marketingOptional: boolean;
  promotionOptional: boolean;
}
