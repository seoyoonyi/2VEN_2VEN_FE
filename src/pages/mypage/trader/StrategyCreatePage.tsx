import { css } from '@emotion/react';

import PageHeader from '@/components/common/PageHeader';
import StrategyCreateForm from '@/components/page/strategy-create/StrategyCreateForm';
import theme from '@/styles/theme';

const desc =
  '등록한 전략은 3일간 매매 일지 입력을 완료한 후 관리자의 승인을 받게 되며,\n 이후 공개여부 설정에따라 전략 목록에 표시됩니다';

const StrategyCreatePage = () => (
  <>
    <PageHeader title='전략등록' desc={desc} />
    <div css={createContainerStyle}>
      <StrategyCreateForm />
    </div>
  </>
);

const createContainerStyle = css`
  max-width: ${theme.layout.width.content};
  width: 1000px;
  margin: 0 auto;
  padding: 60px 0;
`;

export default StrategyCreatePage;
