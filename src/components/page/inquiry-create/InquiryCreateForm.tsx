/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import InquiryContent from '@/components/page/inquiry-create/inquiry-form-content/InquiryContent';
import InquiryStrategyInfo from '@/components/page/inquiry-create/inquiry-form-content/InquiryStrategyInfo';
import InquiryTitle from '@/components/page/inquiry-create/inquiry-form-content/InquiryTitle';
import { ROUTES } from '@/constants/routes';
// import theme from '@/styles/theme';

const InquiryCreateForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleInquiryListClick = () => {
    navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST);
  };

  return (
    // <form css={formContainerStyle} onSubmit={handleSubmit}>
    <form css={formContainerStyle}>
      <InquiryStrategyInfo />
      <InquiryTitle title={title} onTitleChange={(e) => setTitle(e.target.value)} />
      <InquiryContent />
      {/* 관련 전략명 */}
      {/* <div css={formRowStyle}>
      <div css={formGroupStyle}>
        <label htmlFor='strategyName' css={labelStyle}>
          관련 전략명
        </label>
        <input
          id='strategyName'
          type='text'
          placeholder='사람들이 살 때 많이 따라쓰는 전략'
          css={inputStyle}
        />
      </div>
    </div> */}

      {/* 투자계획금액, 투자계획시점 */}
      {/* <div css={formRowStyle}>
      <div css={formGroupStyle}>
        <label htmlFor='investmentAmount' css={labelStyle}>
          투자계획금액
        </label>
        <input id='investmentAmount' type='text' placeholder='200,000,000,000' css={inputStyle} />
      </div>
      <div css={formGroupStyle}>
        <label htmlFor='investmentDate' css={labelStyle}>
          투자계획시점
        </label>
        <input id='investmentDate' type='date' css={inputStyle} />
      </div>
    </div> */}

      {/* 문의 제목 */}
      {/* <div css={formGroupStyle}>
      <label htmlFor='inquiryTitle' css={labelStyle}>
        문의 제목
        <span css={titleLimitStyle}> (8/80)</span>
      </label>
      <input
        id='inquiryTitle'
        type='text'
        placeholder='나 문의의 첫사랑'
        css={[inputStyle, inquiryTitleStyle]}
      />
      <div css={errorStyle}>조금 더 구체적으로 적어주세요 (16자 이상)</div>
    </div> */}

      {/* 문의 내용 */}
      {/* <div css={formGroupStyle}>
      <label htmlFor='inquiryContent' css={labelStyle}>
        문의 내용
        <span css={contentLimitStyle}> (200/800)</span>
      </label>
      <textarea
        id='inquiryContent'
        placeholder='문의 내용을 입력하세요'
        css={[inputStyle, textareaStyle]}
      ></textarea>
    </div> */}

      {/* 버튼 */}
      <div css={buttonContainerStyle}>
        <Button variant='neutral' size='lg' width={200} onClick={() => console.log('작성 취소')}>
          작성취소
        </Button>
        <Button variant='primary' size='lg' width={200} onClick={handleInquiryListClick}>
          문의 남기기
        </Button>
      </div>
    </form>
  );
};

const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 900px;
  margin: 0 auto;
  // gap: 56px;
  outline: 1px solid red; /*아웃라인*/
`;

// const formRowStyle = css`
//   display: flex;
//   gap: 40px;
// `;

// const formGroupStyle = css`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   position: relative;
// `;

// const labelStyle = css`
//   font-size: ${theme.typography.fontSizes.caption};
//   color: ${theme.colors.main.black};
//   margin-bottom: 8px;
// `;

// const inputStyle = css`
//   padding: 12px;
//   height: ${theme.input.height.md};
//   font-size: ${theme.input.fontSize.md};
//   border: 1px solid ${theme.colors.gray[300]};
//   border-radius: 4px;
//   &:focus {
//     border-color: ${theme.colors.main.primary};
//     outline: none;
//     box-shadow: 0 0 0 2px ${theme.colors.teal[100]};
//   }
// `;

// const inquiryTitleStyle = css`
//   border: 1px solid ${theme.colors.main.alert};
// `;

// const errorStyle = css`
//   color: ${theme.colors.main.alert};
//   font-size: ${theme.typography.fontSizes.caption};
//   margin-top: 4px;
// `;

// const titleLimitStyle = css`
//   font-size: ${theme.typography.fontSizes.caption};
//   color: ${theme.colors.gray[500]};
//   margin-left: 8px;
// `;

// const contentLimitStyle = css`
//   font-size: ${theme.typography.fontSizes.caption};
//   color: ${theme.colors.gray[500]};
//   margin-left: 8px;
// `;

// const textareaStyle = css`
//   min-height: 150px;
//   resize: none;
// `;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

// const cancelButtonStyle = css`
//   flex: 1;
//   padding: 12px;
//   background-color: ${theme.colors.gray[300]};
//   color: ${theme.colors.main.black};
//   border: 1px solid ${theme.colors.gray[400]};
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background-color: ${theme.colors.gray[400]};
//   }
// `;

// const submitButtonStyle = css`
//   flex: 1;
//   padding: 12px;
//   background-color: ${theme.colors.main.primary};
//   color: ${theme.colors.main.white};
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background-color: ${theme.colors.teal[600]};
//   }
// `;

export default InquiryCreateForm;
