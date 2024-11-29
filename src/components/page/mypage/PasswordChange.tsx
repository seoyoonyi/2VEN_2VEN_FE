import { useState } from 'react';

import { css } from '@emotion/react';
import { BiCheck } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import SingleButtonModal from '@/components/common/SingleButtonModal';
import { ROUTES } from '@/constants/routes';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';

const mockPasswordData = {
  oldPassword: 'oldpwd1234!',
  newPassword: 'newpwd1234!',
  confirmPassword: 'newpwd1234!',
};

const PasswordChange = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const [oldPassword, setOldPassword] = useState(mockPasswordData.oldPassword);
  const [newPassword, setNewPassword] = useState(mockPasswordData.newPassword);
  const [confirmPassword, setConfirmPassword] = useState(mockPasswordData.confirmPassword);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    openModal({
      type: 'confirm',
      title: '비밀번호 변경 완료',
      desc: '안전한 사용을 위해 다시 로그인해주세요.',
      actionButton: '로그인',
      onAction: () => navigate(ROUTES.AUTH.SIGNIN),
    });
  };

  return (
    <div css={myPageWrapperStyle}>
      <div css={myPageHeaderStyle}>
        <h2>비밀번호 변경</h2>
        <p>
          <BiCheck css={iconStyle} />
          비밀번호변경 후, 안전한 로그인을 위해 새 비밀번호로 다시 로그인해주세요
        </p>
      </div>
      <form>
        <div css={splitContainerStyle}>
          <div css={leftSectionStyle}>
            <div css={inputGroupStyle}>
              <label htmlFor='current-password' css={labelStyle}>
                현재 비밀번호
              </label>
              <Input
                id='current-password'
                type='password'
                inputSize='md'
                placeholder='영문 숫자를 포함한 8자 이상'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div css={inputGroupStyle}>
              <label htmlFor='new-password' css={labelStyle}>
                새로운 비밀번호
              </label>
              <Input
                id='new-password'
                type='password'
                inputSize='md'
                placeholder='영문, 숫자를 포함한 8자 이상'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div css={rightSectionStyle}>
            <div css={inputGroupStyle}>
              <label htmlFor='confirm-password' css={labelStyle}>
                비밀번호 확인
              </label>
              <Input
                id='confirm-password'
                type='password'
                inputSize='md'
                placeholder='영문, 숫자를 포함한 8자 이상'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button customStyle={passwordChangeButtonStyle} onClick={handlePasswordChange}>
          비밀번호 변경
        </Button>
      </form>
      <SingleButtonModal />
    </div>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
  margin-bottom: 24px;

  h2 {
    margin-bottom: 8px;
    ${theme.textStyle.headings.h3}
  }

  p {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.gray[400]};
  }
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
  color: ${theme.colors.main.primary};
`;

const splitContainerStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  width: 100%;
  margin-bottom: 40px;
`;

const leftSectionStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const rightSectionStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 16px;
`;

const inputGroupStyle = css`
  width: 100%;

  textarea {
    width: 100%;
  }
`;

const labelStyle = css`
  display: block;
  width: 109px;
  margin-bottom: 8px;
  text-align: left;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
`;

const passwordChangeButtonStyle = css`
  padding: 20px 32px;
`;

export default PasswordChange;
