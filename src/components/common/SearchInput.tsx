import { css } from '@emotion/react';
import { FiSearch } from 'react-icons/fi';

import Input, { InputProps } from './Input';

import theme from '@/styles/theme';

interface SearchInputProps extends InputProps {
  onSearch?: () => void;
}

const SearchInput = ({ onSearch, ...props }: SearchInputProps) => {
  const handleSearch = () => {
    if (onSearch) onSearch();
  };

  return (
    <div css={searchContainerStyles}>
      <button type='button' onClick={handleSearch} css={searchIconStyles}>
        <FiSearch size={24} />
      </button>
      <Input
        placeholder='내용을 입력해주세요'
        {...props}
        showClearButton
        customStyle={css`
          width: 300px;
          text-indent: 10px;
          padding-left: 36px;
        `}
      />
    </div>
  );
};

const searchContainerStyles = css`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const searchIconStyles = css`
  z-index: 9;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${theme.colors.gray[500]};

  &:hover {
    color: ${theme.colors.gray[700]};
  }
`;

export default SearchInput;
