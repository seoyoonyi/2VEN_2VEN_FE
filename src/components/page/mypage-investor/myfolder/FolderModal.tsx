import { useState } from 'react';

import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import theme from '@/styles/theme';

const folder = [
  { label: '기본 폴더', value: '1' },
  { label: '나의 전략 폴더', value: '2' },
  { label: '크리스마스때 삭제할 폴더', value: '3' },
  { label: '그냥 그냥 폴더', value: '4' },
];

const FolderModal = ({
  isMove = false,
  onChangeFolderName,
}: {
  isMove?: boolean;
  onChangeFolderName?: (folderName: string) => void;
}) => {
  const [folderName, setFolderName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
    onChangeFolderName?.(e.target.value);
  };

  return (
    <div css={contentWrpperStyle}>
      {isMove ? (
        <>
          <label htmlFor='move-folder'>이동할 폴더</label>
          <Select id='move-folder' options={folder} onChange={() => {}} width='100%' />
        </>
      ) : (
        <>
          <label htmlFor='add-folder'>폴더명 입력</label>
          <Input
            id='add-folder'
            placeholder='폴더명을 입력해주세요'
            value={folderName}
            onChange={handleInputChange}
          />
        </>
      )}
    </div>
  );
};

const contentWrpperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
  padding: 0 12px;

  label {
    ${theme.buttons.label.lg};
    color: ${theme.colors.main.primary};
  }
`;

export default FolderModal;
