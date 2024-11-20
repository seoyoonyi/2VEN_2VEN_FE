import { useState } from 'react';

import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { FIND_EMAIL_TEXT } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useEmailFinder } from '@/hooks/mutations/useEmailFinder';
import theme from '@/styles/theme';
import { isValidPhoneNumber } from '@/utils/validation';
const FindEmailPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const emailFinder = useEmailFinder();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);

    if (!value) {
      setErrorMessage(''); // 전화번호 입력값이 없을 때 에러메시지 초기화
      return;
    }
    if (!isValidPhoneNumber(value)) {
      setErrorMessage(FIND_EMAIL_TEXT.error.phone.invalid);
    } else {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit clicked', phone);
    if (!isValidPhoneNumber(phone)) {
      return;
    }

    try {
      const response = await emailFinder.mutateAsync(phone);
      if (response.status === 'success') {
        navigate(ROUTES.AUTH.FIND.EMAIL_SUCCESS, { state: { email: response.data.email } });
      }
    } catch (error) {
      setErrorMessage(FIND_EMAIL_TEXT.error.phone.notFound);
    }
  };

  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>이메일 찾기</h3>
      <form css={formStyle} onSubmit={handleSubmit}>
        <div>
          <Input
            type='tel'
            inputSize='lg'
            placeholder={FIND_EMAIL_TEXT.input.phone.placeholder}
            showClearButton
            value={phone}
            onChange={handlePhoneChange}
            status={errorMessage ? 'error' : 'default'}
          />
        </div>
        <Button
          type='submit'
          width={400}
          css={buttonStyle}
          disabled={!phone || !!errorMessage || emailFinder.isPending}
        >
          {FIND_EMAIL_TEXT.button.submit}
        </Button>
      </form>
      {errorMessage && <p css={messageStyle}>{errorMessage}</p>}
      <ul css={findPassLinkStyle}>
        <li>{FIND_EMAIL_TEXT.links.findPasswordText}</li>
        <li>
          <Link to={ROUTES.AUTH.FIND.PASSWORD}>{FIND_EMAIL_TEXT.links.findPassword}</Link>
        </li>
      </ul>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  padding: 160px 0 240px;
  margin: 0 auto;
`;
const pageHeadingStyle = css`
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 32px;
`;
const formStyle = css`
  flex-direction: column;
  input {
    width: 400px;
  }
`;
const buttonStyle = css`
  margin-top: 24px;
`;
const findPassLinkStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 32px;

  li {
    position: relative;
    color: ${theme.colors.gray[900]};
    font-size: ${theme.typography.fontSizes.body};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.medium};
    padding: 0 17px;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      height: 16px;
      transform: translateY(-50%);
      background-color: ${theme.colors.gray[300]};
    }
    &:last-child {
      font-weight: ${theme.typography.fontWeight.bold};
    }
    &:last-child::after {
      display: none;
    }
  }
`;
const messageStyle = css`
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;
export default FindEmailPage;
