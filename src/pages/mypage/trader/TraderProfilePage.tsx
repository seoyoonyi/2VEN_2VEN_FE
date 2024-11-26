import { useState } from 'react';

import { css } from '@emotion/react';

import defaultImage from '@/assets/images/default_avatar.png';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';
import { useNicknameCheck } from '@/hooks/mutations/useNicknameCheck';
import theme from '@/styles/theme';
import { validateNickname } from '@/utils/validation';

const TraderProfilePage = () => {
  const [userImage] = useState(
    // 'https://i.pinimg.com/736x/2b/4c/91/2b4c913711c4a8be893aa873b3b23193.jpg'
    null
  );
  const [nickname, setNickname] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const nicknameCheck = useNicknameCheck();
  const [text, setText] = useState('');
  const maxLength = 300;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      setText(event.target.value);
      console.log(event.target.value);
    }
  };

  // 단일 체크박스 상태
  const [singleChecked, setSingleChecked] = useState(false);

  // 그룹 체크박스 상태
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
    { label: '비활성화된 옵션', value: 'option4', disabled: true },
  ];

  // 커스텀 스타일 체크박스 상태
  const [customChecked, setCustomChecked] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (!e.target.value) {
      setNicknameMessage('');
    }
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

  const handleNicknameBlur = () => {
    if (nicknameMessage.includes('사용 가능')) {
      setNicknameMessage('');
    }
  };
  return (
    <div css={myPageWrapperStyle}>
      <div css={myPageHeaderStyle}>
        <div>
          <h2>프로필 관리</h2>
        </div>
      </div>
      <div css={profileContainer}>
        <div css={leftContainer}>
          <div css={inputGroupStyle}>
            <label htmlFor='email' css={labelStyle}>
              이메일
            </label>
            <Input id='email' inputSize='md' placeholder='1234@naver.com' />
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
                onBlur={handleNicknameBlur}
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
            <Input id='phone' inputSize='md' placeholder='01012345678' width='100%' />
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
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
  }
`;

const profileContainer = css`
  display: flex;
  gap: 40px;
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
  padding: 12px;
  margin-bottom: 8px;
  resize: none;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  ${theme.textStyle.body.body3}
  line-height: ${theme.typography.lineHeights.lg};
  outline: none;
  transition: all 0.2s ease;

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
  width: 300px;
  padding: 0 50px;

  div.button-container {
    // width: 200px;

    button {
      width: 100%;

      & + & {
        margin-bottom: 12px;
      }
    }
  }

  outline: 1px solid tomato;
`;

const messageStyle = css`
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;
const successMessageStyle = css`
  color: ${theme.colors.main.primary};
`;

export default TraderProfilePage;
