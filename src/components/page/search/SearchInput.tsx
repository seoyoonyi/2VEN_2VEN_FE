import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { css } from '@emotion/react';
import { FiSearch } from 'react-icons/fi';

import Input from '@/components/common/Input';
import theme from '@/styles/theme';

interface SearchInputProps {
  onSearchSubmit?: (value: string) => void;
}

const SearchInput = ({ onSearchSubmit, ...props }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchButtonClick = () => {
    if (onSearchSubmit) onSearchSubmit(searchValue);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleInputEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

  return (
    <div css={searchContainerStyles}>
      <button type='button' onClick={handleSearchButtonClick} css={searchIconStyles}>
        <FiSearch size={24} />
      </button>
      <Input
        placeholder='내용을 입력해주세요'
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleInputEnterPress}
        showClearButton
        customStyle={css`
          width: 300px;
          text-indent: 10px;
          padding-left: 36px;
        `}
        {...props}
      />
    </div>
  );
};

const searchContainerStyles = css`
  position: relative;
  display: inline-block;
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
