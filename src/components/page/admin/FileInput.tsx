import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import theme from '@/styles/theme';

interface FileInputProps {
  title: string;
  file?: File | null;
  onFileChange: (file: File | null) => void;
}
const FileInput = ({ title, file, onFileChange }: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [typeName, setTypeName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(file || null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      onFileChange(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  useEffect(() => {
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  }, [file]);

  return (
    <div css={inputStyle}>
      <div css={titleStyle}>{title}</div>
      <Input
        css={showTitleStyle}
        placeholder='유형 이름을 입력하세요'
        value={typeName}
        onChange={(e) => setTypeName(e.target.value)}
      />
      <div css={titleStyle}>아이콘</div>
      {selectedFile && (
        <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} css={imageStyle} />
      )}
      <div css={inputAndButtonContainerStyle}>
        <input type='text' value={fileName || ''} readOnly css={inputStyleOverride} />
        <Button variant='secondary' size='sm' onClick={handleFileUpload} width={115}>
          찾아보기
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          accept='.jpg, .svg, .jpeg, .png'
          onChange={handleFileChange}
          css={fileInputStyle}
        />
      </div>
    </div>
  );
};

const inputStyle = css`
  display: flex;
  flex-direction: column;
`;

const titleStyle = css`
  color: ${theme.colors.main.primary};
  font-size: 18px;
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.sm};
  margin: 12px 0 6px 0;
`;

const imageStyle = css`
  align-self: flex-start;

  height: 40px;
  margin: 10px 0;
`;

const inputAndButtonContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const inputStyleOverride = css`
  width: 312px;
  padding: 5px;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  outline: none;
  transition: all 0.2s ease;
  font-family: 'Pretendard', sans-serif;
  line-height: 150%;
  height: ${theme.input.height.md};
  padding: ${theme.input.padding.md};
  font-size: ${theme.input.fontSize.md};
`;

const showTitleStyle = css`
  margin: 12px 0 10px 0;
`;

const fileInputStyle = css`
  display: none;
`;

export default FileInput;
