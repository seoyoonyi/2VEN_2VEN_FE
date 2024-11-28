import { css } from '@emotion/react';
import { MdOutlineNoAccounts } from 'react-icons/md';

import Button from '@/components/common/Button';
import PasswordChange from '@/components/page/mypage/PasswordChange';
import ProfileManager from '@/components/page/mypage/ProfileManager';

const InvestorProfilePage = () => (
  <div css={myPageWrapperStyle}>
    <ProfileManager />
    <PasswordChange />
    <Button variant='ghostGray' customStyle={logoutStyle} size='sm'>
      <MdOutlineNoAccounts size={16} />
      <span>회원 탈퇴</span>
    </Button>
  </div>
);

const myPageWrapperStyle = css`
  width: 955px;
  border-radius: 8px;
`;

const logoutStyle = css`
  width: auto;
  justify-content: flex-start;
  margin-top: 16px;
  padding: 8px 20px;
  gap: 4px;
`;

export default InvestorProfilePage;
