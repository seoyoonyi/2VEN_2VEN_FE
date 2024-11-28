import { useState } from 'react';

import { css } from '@emotion/react';

import defaultImage from '@/assets/images/default_avatar.png';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';
import SingleButtonModal from '@/components/common/SingleButtonModal';
import { useNicknameCheck } from '@/hooks/mutations/useNicknameCheck';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';
import { validateNickname } from '@/utils/validation';

interface PersonalDetailsResponse {
  status: string;
  message: string;
  data: {
    fileId: string;
    email: string;
    nickname: string;
    phoneNumber: string;
    introduction: string;
    marketingOptional: boolean;
  };
}

const mockPersonalDetails: PersonalDetailsResponse = {
  status: 'success',
  message: '상세 개인정보 조회에 성공하였습니다.',
  data: {
    fileId: '1234',
    email: 'test@test.com',
    nickname: '투자왕',
    phoneNumber: '01012345678',
    introduction: '저는 차세대 투자왕입니다!',
    marketingOptional: false,
  },
};

const ProfileManager = () => {
  const maxLength = 150;

  const { openModal } = useModalStore();
  const nicknameCheck = useNicknameCheck();
  const [userImage] = useState(null);
  const [nickname, setNickname] = useState(mockPersonalDetails.data.nickname);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [text, setText] = useState(mockPersonalDetails.data.introduction);
  const [singleChecked, setSingleChecked] = useState(mockPersonalDetails.data.marketingOptional);
  const [phoneNumber, setPhoneNumber] = useState(mockPersonalDetails.data.phoneNumber);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      setText(event.target.value);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (!e.target.value) {
      setNicknameMessage('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleNicknameCheck = async () => {
    const validation = validateNickname(nickname);
    if (!validation.isValid) {
      setNicknameMessage(validation.message);
      return;
    }

    try {
      const response = await nicknameCheck.mutateAsync(nickname);
      if (response.data.isDuplicate) {
        setNicknameMessage('이미 사용중인 닉네임입니다.');
      } else {
        setNicknameMessage('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      setNicknameMessage('닉네임 중복 확인에 실패했습니다.');
    }
  };

  const validateForm = () => {
    if (!nickname.trim()) {
      setNicknameMessage('닉네임을 입력해주세요.');
      return false;
    }
    if (!phoneNumber.trim()) {
      alert('휴대폰 번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    openModal({
      type: 'confirm',
      title: '회원정보 수정 완료',
      desc: '수정된 회원 정보는 저장 후 즉시 반영됩니다.',
      actionButton: '확인',
      onAction: () => {
        console.log('회원정보 수정 완료 확인');
      },
    });
  };

  return (
    <div css={myPageWrapperStyle}>
      <h2 css={myPageHeaderStyle}>프로필 관리</h2>
      <form onSubmit={handleProfileUpdate}>
        <div css={profileContainer}>
          <div css={leftContainer}>
            <div css={inputGroupStyle}>
              <label htmlFor='email' css={labelStyle}>
                이메일
              </label>
              <Input
                id='email'
                inputSize='md'
                value={mockPersonalDetails.data.email}
                isDisabled={true}
              />
            </div>
            <div css={inputGroupStyle}>
              <label htmlFor='nickname' css={labelStyle}>
                닉네임
              </label>
              <div css={inputItemStyle}>
                <Input
                  id='nickname'
                  inputSize='md'
                  placeholder='사용할 닉네임을 입력해주세요.'
                  showClearButton
                  value={nickname}
                  onChange={handleNicknameChange}
                  onBlur={() => {
                    if (!nickname.trim()) {
                      setNicknameMessage('닉네임을 입력해주세요.');
                    }
                  }}
                  status={
                    nicknameMessage
                      ? nicknameMessage.includes('사용 가능한 닉네임')
                        ? 'success'
                        : 'error'
                      : 'default'
                  }
                  width='100%'
                />
                <Button
                  variant='primary'
                  size='sm'
                  width={100}
                  onClick={handleNicknameCheck}
                  disabled={!nickname || nicknameCheck.isPending}
                >
                  중복확인
                </Button>
              </div>
              {nicknameMessage && (
                <p
                  css={[
                    messageStyle,
                    nicknameMessage.includes('사용 가능한 닉네임') && successMessageStyle,
                  ]}
                >
                  {nicknameMessage}
                </p>
              )}
            </div>
            <div css={inputGroupStyle}>
              <label htmlFor='phone' css={labelStyle}>
                휴대폰번호
              </label>
              <Input
                id='phone'
                inputSize='md'
                placeholder='010-0000-0000'
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
            </div>
            <div css={inputGroupStyle}>
              <label htmlFor='introduction' css={labelStyle}>
                소개
              </label>
              <textarea
                css={textareaStyle}
                placeholder='내용을 입력하세요'
                value={text}
                onChange={handleTextChange}
              />
              <div css={lengthStyle}>
                <span>{text.length}</span>/{maxLength}
              </div>
            </div>
            <Checkbox checked={singleChecked} onChange={setSingleChecked}>
              [선택] 정보성 마케팅 정보 알림에 수신 동의합니다
            </Checkbox>
          </div>
          <div css={rightContainer}>
            <Avatar src={userImage || defaultImage} alt='사용자' size='100%' />
            <div className='button-container'>
              <Button variant='secondaryGray'>사진업로드</Button>
              <Button variant='ghostGray'>사진삭제</Button>
            </div>
          </div>
        </div>
        <Button type='submit' size='lg' customStyle={editProfileButtonStyle}>
          회원정보 수정
        </Button>
      </form>
      <SingleButtonModal />
    </div>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  margin-bottom: 16px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
  margin-bottom: 24px;
  ${theme.textStyle.headings.h3}
`;

const profileContainer = css`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
`;

const leftContainer = css`
  width: 518px;
`;

const inputGroupStyle = css`
  width: 100%;
  margin-bottom: 16px;

  textarea {
    width: 100%;
  }
`;

const inputItemStyle = css`
  display: flex;
  gap: 12px;
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

const textareaStyle = css`
  height: 200px;
  margin-bottom: 8px;
  padding: 12px;
  resize: none;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  outline: none;
  transition: all 0.2s ease;
  ${theme.textStyle.body.body3}
  line-height: ${theme.typography.lineHeights.lg};

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }
`;

const lengthStyle = css`
  text-align: right;
  color: ${theme.colors.gray[400]};
  ${theme.textStyle.captions.caption2}

  span {
    color: ${theme.colors.main.primary};
  }
`;

const rightContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 304px;
  padding: 0 50px;

  div.button-container {
    width: 200px;

    button {
      width: 100%;

      & + & {
        margin-bottom: 12px;
      }
    }
  }
`;

const messageStyle = css`
  margin-top: 8px;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;

const successMessageStyle = css`
  color: ${theme.colors.main.primary};
`;

const editProfileButtonStyle = css`
  padding: 20px 32px;
`;

export default ProfileManager;
