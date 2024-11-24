import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import FileUpload from '@/components/page/strategy-create/form-content/FileUpload';
import ProductType from '@/components/page/strategy-create/form-content/ProductType';
import StrategyIntro from '@/components/page/strategy-create/form-content/StrategyIntro';
import StrategyName from '@/components/page/strategy-create/form-content/StrategyName';
import { investmentFunds, isPublic } from '@/constants/createOptions';
import { useSubmitStrategyCreate } from '@/hooks/mutations/useSubmitStrategyCreate';
import useFetchStrategyOptionData from '@/hooks/queries/useFetchStrategyOptionData';
import useCreateFormValidation from '@/hooks/useCreateFormValidation';
import useModalStore from '@/stores/modalStore';
import { useStrategyFormStore } from '@/stores/strategyFormStore';
import theme from '@/styles/theme';
import { StrategyPayload } from '@/types/strategy';

const StrategyCreateForm = () => {
  const {
    strategy,
    text,
    operation,
    cycle,
    fund,
    publicStatus,
    selectedProducts,
    setField,
    checkProduct,
  } = useStrategyFormStore();
  const { openModal } = useModalStore();
  const { strategyData, loading, error } = useFetchStrategyOptionData();
  const { mutate: submitStrategy, status } = useSubmitStrategyCreate();
  const isSubmitting = status === 'pending';

  const [file, setFile] = useState<File | null>(null);

  const formState = { strategy, text, operation, cycle, fund, publicStatus, selectedProducts };
  const isFormValid = useCreateFormValidation(formState);

  const handleFileSelect = (selectedFile: File) => {
    console.log(file);
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    const payload: StrategyPayload = {
      strategyTitle: strategy,
      tradingTypeId: Number(operation),
      tradingCycleId: Number(cycle),
      minInvestmentAmount: fund,
      strategyOverview: text,
      isPosted: publicStatus,
      investmentAssetClassesIdList: selectedProducts.map((v) => Number(v)),
    };

    try {
      await submitStrategy(payload);
    } catch (error) {
      console.error('등록 실패:', error);
    }
  };

  const onClickRegister = () => {
    openModal({
      type: 'confirm',
      title: '전략 등록',
      desc: '전략을 저장하시겠습니까?',
      onAction: async () => {
        await handleSubmit();
      },
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>{error}</p>;

  return (
    <form css={formContainerStyle} onSubmit={handleFormSubmit}>
      <StrategyName strategy={strategy} onStrategyChange={(value) => setField('strategy', value)} />

      <div css={selectContainerStyle}>
        <section css={flexAlignStyle}>
          <label htmlFor='operation' css={labelStyle}>
            운용방식
          </label>
          <Select
            id='operation'
            options={strategyData.operations}
            onChange={(option) => setField('operation', option.value)}
          />
        </section>

        <section css={flexAlignStyle}>
          <label htmlFor='cycle' css={labelStyle}>
            주기
          </label>
          <Select
            id='cycle'
            options={strategyData.cycles}
            onChange={(option) => setField('cycle', option.value)}
          />
        </section>
      </div>

      <section css={flexAlignStyle}>
        <label htmlFor='fund' css={labelStyle}>
          최소운용가능금액
        </label>
        <Select
          id='fund'
          options={investmentFunds}
          onChange={(option) => setField('fund', option.value)}
        />
      </section>

      <StrategyIntro
        text={text}
        onTextChange={(e) => setField('text', e.target.value)}
        maxLength={1000}
      />

      <ProductType
        products={strategyData.products}
        selectedProducts={selectedProducts}
        onProductChange={(productId) => checkProduct(productId)}
      />

      <section css={flexAlignStyle}>
        <label htmlFor='public-status' css={labelStyle}>
          공개여부
        </label>
        <Select
          id='public-status'
          options={isPublic}
          onChange={(option) => setField('publicStatus', option.value)}
        />
      </section>

      <FileUpload onFileSelect={handleFileSelect} />

      <div css={buttonContainerStyle}>
        <Button
          type='button'
          variant='primary'
          size='lg'
          width={326}
          disabled={!isFormValid || isSubmitting}
          onClick={onClickRegister}
        >
          저장하기
        </Button>
      </div>
      <Modal />
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
