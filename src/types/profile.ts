export interface ProfileUrlResponse {
  fileUrl: string;
  message: string;
  category: string;
  displayName: string;
}

export interface SidebarProfileResponse {
  status: string;
  message: string;
  data: {
    nickname: string;
    memberType: 'TRADER' | 'INVESTOR';
    introduction: string;
    fileId: string;
  };
}

export interface UpdatePersonalDetailsPayload {
  nickname: string;
  phoneNumber: string;
  introduction: string;
  marketingOptional: boolean;
}
