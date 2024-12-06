import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';
import SingleButtonModal from '@/components/common/SingleButtonModal';
import Toast from '@/components/common/Toast';
import { useNicknameCheck } from '@/hooks/mutations/useNicknameCheck';
import {
  useDeleteProfileImage,
  useUploadProfileImage,
} from '@/hooks/mutations/useProfileImageMutations';
import { useUpdatePersonalDetails } from '@/hooks/mutations/useUpdatePersonalDetails';
import useFetchPersonalDetails from '@/hooks/queries/useFetchPersonalDetails';
import { useProfileImage } from '@/hooks/queries/useProfileImage';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { validateNickname } from '@/utils/validation';

interface PersonalDetails {
  profilePath: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  introduction: string;
  marketingOptional: boolean;
}

const ProfileManager = () => {
  const maxLength = 150;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuthStore();
  const { isToastVisible, showToast, hideToast, message, type } = useToastStore();
  const { openModal } = useModalStore();

  const { data: profileImageData } = useProfileImage(user?.memberId || '');
  const { data, isLoading, isError } = useFetchPersonalDetails();
  const { mutate: updatePersonalDetails } = useUpdatePersonalDetails();
  const { mutate: uploadImage } = useUploadProfileImage();
  const { mutate: deleteImage } = useDeleteProfileImage();
  const nicknameCheck = useNicknameCheck();

  const [profile, setProfile] = useState<PersonalDetails>({
    profilePath: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    introduction: '',
    marketingOptional: false,
  });
  const [nicknameMessage, setNicknameMessage] = useState('');

  useEffect(() => {
    if (data) {
      setProfile({
        profilePath: data.fileId || '',
        email: data.email || '',
        nickname: data.nickname || '',
        phoneNumber: data.phoneNumber || '',
        introduction: data.introduction || '',
        marketingOptional: data.marketingOptional || false,
      });
    }
  }, [data]);

  // Handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return showToast('선택된 파일이 없습니다.', 'error');

    const fileUrl = URL.createObjectURL(file);

    uploadImage(
      { fileUrl, fileItem: file },
      {
        onSuccess: () => showToast('프로필 사진이 업로드되었습니다.'),
        onError: () => showToast('프로필 사진 업로드에 실패했습니다.', 'error'),
      }
    );
  };

  const handleDeleteImage = () => {
    if (!profileImageData?.fileId) {
      return showToast('삭제할 사진이 없습니다.', 'error');
    }

    deleteImage(profileImageData.fileId, {
      onSuccess: () => showToast('프로필 사진이 삭제되었습니다.'),
      onError: () => showToast('프로필 사진 삭제에 실패했습니다.', 'error'),
    });
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleChange =
    (field: keyof PersonalDetails) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        event.target.type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : event.target.value;

      setProfile((prev) => ({ ...prev, [field]: value }));
    };

  const validateForm = () => {
    if (!profile.nickname.trim()) return alert('닉네임을 입력해주세요.');
    if (!profile.phoneNumber.trim()) return alert('휴대폰 번호를 입력해주세요.');
    return true;
  };

  const handleProfileUpdate = () => {
    if (!validateForm()) return;

    openModal({
      type: 'confirm',
      title: '회원정보 수정',
      desc: '회원정보를 수정하시겠습니까?',
      actionButton: '확인',
      onAction: () =>
        updatePersonalDetails(profile, {
          onSuccess: () => showToast('회원정보가 수정되었습니다.'),
          onError: () => showToast('회원정보 수정 중 오류가 발생했습니다.', 'error'),
        }),
    });
  };

  const handleNicknameCheck = async () => {
    const validation = validateNickname(profile.nickname);
    if (!validation.isValid) {
      setNicknameMessage(validation.message);
      return;
    }

    try {
      const response = await nicknameCheck.mutateAsync(profile.nickname);
      setNicknameMessage(
        response.data.isDuplicate ? '이미 사용중인 닉네임입니다.' : '사용 가능한 닉네임입니다.'
      );
    } catch {
      setNicknameMessage('닉네임 중복 확인에 실패했습니다.');
    }
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <div css={myPageWrapperStyle}>
      <h2 css={myPageHeaderStyle}>프로필 관리</h2>
      {data && (
        <form>
          <div css={profileContainer}>
            <div css={leftContainer}>
              <div css={inputGroupStyle}>
                <label htmlFor='email' css={labelStyle}>
                  이메일
                </label>
                <Input
                  id='email'
                  inputSize='md'
                  value={profile.email}
                  onChange={handleChange('email')}
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
                    value={profile.nickname}
                    onChange={handleChange('nickname')}
                    onBlur={() => {
                      if (!profile.nickname.trim()) {
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
                    disabled={!profile.nickname || nicknameCheck.isPending}
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
                  placeholder='01000000000'
                  value={profile.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                />
              </div>
              <div css={inputGroupStyle}>
                <label htmlFor='introduction' css={labelStyle}>
                  소개
                </label>
                <textarea
                  css={textareaStyle}
                  placeholder='내용을 입력하세요'
                  value={profile.introduction}
                  onChange={handleChange('introduction')}
                />
                <div css={lengthStyle}>
                  <span>{profile.introduction.length}</span>/{maxLength}
                </div>
              </div>
              <Checkbox
                checked={profile.marketingOptional}
                onChange={(checked) =>
                  setProfile((prev) => ({ ...prev, marketingOptional: checked }))
                }
              >
                [선택] 정보성 마케팅 정보 알림에 수신 동의합니다
              </Checkbox>
            </div>
            <div css={rightContainer}>
              <Avatar src={profileImageData?.fileUrl} alt='사용자' size='100%' />
              <div className='button-container'>
                <Button variant='secondaryGray' onClick={handleUploadClick}>
                  사진업로드
                </Button>
                <Button variant='ghostGray' onClick={handleDeleteImage}>
                  사진삭제
                </Button>
              </div>
              <input
                ref={fileInputRef}
                id='file-upload'
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <Button
            onClick={handleProfileUpdate}
            type='submit'
            size='lg'
            customStyle={editProfileButtonStyle}
          >
            회원정보 수정
          </Button>
        </form>
      )}
      <SingleButtonModal />
      <Toast message={message} type={type} onClose={hideToast} isVisible={isToastVisible} />
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
