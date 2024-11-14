import { useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import FileUpload from '@/components/page/strategy-create/form-content/FileUpload';
import ProductType from '@/components/page/strategy-create/form-content/ProductType';
import StrategyIntro from '@/components/page/strategy-create/form-content/StrategyIntro';
import StrategyName from '@/components/page/strategy-create/form-content/StrategyName';
import useCreateFormValidation from '@/hooks/useCreateFormValidation';
import theme from '@/styles/theme';

const operations = [
  { label: '자동', value: 'auto' },
  { label: '반자동(하이브리드)', value: 'hybrid' },
  { label: '수동(매뉴얼)', value: 'manual' },
];

const cycles = [
  { label: '데이', value: 'day' },
  { label: '포지션', value: 'position' },
];

const investmentFunds = [
  { label: '1만원 ~ 500만원', value: '1-500' },
  { label: '500만원 ~ 1000만원', value: '500-1000' },
  { label: '1000만원 ~ 2000만원', value: '1000-2000' },
  { label: '2000만원 ~ 5000만원', value: '2000-5000' },
  { label: '5000만원 ~ 1억', value: '5000-10000' },
  { label: '1억 ~ 2억', value: '10000-20000' },
  { label: '2억 ~ 3억', value: '20000-30000' },
  { label: '3억 ~ 4억', value: '30000-40000' },
  { label: '4억 ~ 5억', value: '40000-50000' },
  { label: '5억 ~ 10억', value: '50000-100000' },
  { label: '10억 이상', value: '100000+' },
];

const isPublic = [
  { label: '공개', value: 'public' },
  { label: '비공개', value: 'private' },
];

const products = [
  '국내주식',
  '국내지수 옵션',
  '국내 ETF',
  '국내지수 선물',
  '국내상품 선물',
  'F/X',
  '해외주식',
  '해외주식 옵션',
  '해외 ETF',
  '해외지수 선물',
  '해외상품 선물',
];

const StrategyCreateForm = () => {
  const [strategy, setStrategy] = useState('');
  const [text, setText] = useState('');
  const [operation, setOperation] = useState('');
  const [cycle, setCycle] = useState('');
  const [fund, setFund] = useState('');
  const [publicStatus, setPublicStatus] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const formState = { strategy, text, operation, cycle, fund, publicStatus, selectedProducts };
  const isFormValid = useCreateFormValidation(formState);

  const handleStrategyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStrategy(e.target.value);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const handleOperationSelect = (option: { value: string }) => setOperation(option.value);
  const handleCycleSelect = (option: { value: string }) => setCycle(option.value);
  const handleFundSelect = (option: { value: string }) => setFund(option.value);
  const handlePublicSelect = (option: { value: string }) => setPublicStatus(option.value);
  const handleFileSelect = (file: File) => setFile(file);

  const handleProductCheck = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((item) => item !== product) : [...prev, product]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('서버로 요청!');
    console.log(file);
    navigate('/strategies/1');
  };

  return (
    <form css={formContainerStyle} onSubmit={handleSubmit}>
      <StrategyName strategy={strategy} onStrategyChange={handleStrategyChange} />

      <div css={selectContainerStyle}>
        <section css={flexAlignStyle}>
          <label htmlFor='operation' css={labelStyle}>
            운용방식
          </label>
          <Select id='operation' options={operations} onChange={handleOperationSelect} />
        </section>

        <section css={flexAlignStyle}>
          <label htmlFor='cycle' css={labelStyle}>
            주기
          </label>
          <Select id='cycle' options={cycles} onChange={handleCycleSelect} />
        </section>
      </div>

      <section css={flexAlignStyle}>
        <label htmlFor='fund' css={labelStyle}>
          최소운용가능금액
        </label>
        <Select id='fund' options={investmentFunds} onChange={handleFundSelect} />
      </section>

      <StrategyIntro text={text} onTextChange={handleTextChange} maxLength={1000} />

      <ProductType
        products={products}
        selectedProducts={selectedProducts}
        onProductChange={handleProductCheck}
      />

      <section css={flexAlignStyle}>
        <label htmlFor='public-status' css={labelStyle}>
          공개여부
        </label>
        <Select id='public-status' options={isPublic} onChange={handlePublicSelect} />
      </section>

      <FileUpload onFileSelect={handleFileSelect} />

      <div css={buttonContainerStyle}>
        <Button type='submit' variant='primary' size='lg' width={326} disabled={!isFormValid}>
          저장하기
        </Button>
      </div>
    </form>
  );
};

const formContainerStyle = css`
  display: flex;
  width: 1000px;
  flex-direction: column;
  gap: 56px;
`;

const labelStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.lg};
`;

const selectContainerStyle = css`
  display: flex;
  gap: 40px;
`;

const flexStyle = css`
  display: flex;
  gap: 24px;
`;

const flexAlignStyle = css`
  ${flexStyle};
  align-items: center;
`;

const buttonContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default StrategyCreateForm;
