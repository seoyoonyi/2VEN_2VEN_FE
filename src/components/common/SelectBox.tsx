import { useState } from 'react';

import { css } from '@emotion/react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import theme from '@/styles/theme';

type SelectType = 'sm' | 'md';

interface Option {
  label: string;
  value: string;
}

interface SelectBoxProps {
  options: Option[];
  type?: SelectType;
  onSelect?: (option: Option) => void;
  width?: string;
  disabled?: boolean;
}

const defaultOption = { label: '선택', value: '' };

const SelectBox = ({
  options,
  type = 'md',
  onSelect,
  width = '200px',
  disabled = false,
}: SelectBoxProps) => {
  const [selected, setSelected] = useState<Option>(defaultOption);

  const handleSelect = (option: Option) => {
    setSelected(option);
    if (onSelect) onSelect(option);
  };

  return (
    <div css={selectContainerStyle(width)}>
      <Listbox value={selected} onChange={handleSelect} disabled={disabled}>
        {({ open }) => (
          <>
            <ListboxButton css={selectButtonStyle(type, open, disabled, selected)}>
              <span css={textEllipsisStyle}>{selected.label}</span>
              {open ? (
                <FaChevronUp css={iconStyle(type)} />
              ) : (
                <FaChevronDown css={iconStyle(type)} />
              )}
            </ListboxButton>

            <ListboxOptions css={selectOptionsStyle(type)}>
              <div css={selectOptionsWrapperStyle}>
                {options.map((option) => (
                  <ListboxOption key={option.value} value={option} css={selectOptionStyle(type)}>
                    <span>{option.label}</span>
                  </ListboxOption>
                ))}
              </div>
            </ListboxOptions>
          </>
        )}
      </Listbox>
    </div>
  );
};

const selectContainerStyle = (width: string) => css`
  position: relative;
  width: ${width};
`;

const selectButtonStyle = (
  type: SelectType,
  open: boolean,
  disabled: boolean,
  selected: Option
) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${type === 'sm' ? theme.input.height.sm : theme.input.height.md};
  color: ${selected.value !== '' ? theme.colors.gray[700] : theme.colors.gray[500]};
  font-size: ${type === 'sm' ? theme.input.fontSize.sm : theme.input.fontSize.md};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.md};
  background-color: ${open ? theme.colors.gray[50] : theme.colors.main.white};
  border: 1px solid ${selected.value === '' ? theme.colors.gray[300] : theme.colors.gray[400]};
  padding: ${type === 'sm' ? '10px 7.5px' : '12px 16px'};
  opacity: ${disabled ? 0.4 : 1};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background-color: ${!disabled && !open ? theme.colors.gray[50] : ''};
  }

  &:focus {
    border-color: ${selected.value === '' ? theme.colors.gray[300] : theme.colors.gray[400]};
  }
`;

const textEllipsisStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const iconStyle = (type: SelectType) => css`
  width: ${type === 'sm' ? '8px' : '12px'};
  color: ${theme.colors.gray[400]};
`;

const selectOptionsStyle = (type: SelectType) => css`
  position: absolute;
  width: 100%;
  font-size: ${type === 'sm'
    ? theme.typography.fontSizes.caption
    : theme.typography.fontSizes.body};
  color: ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.md};
  background-color: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[300]};
  margin-top: 8px;
  z-index: 10;
  box-shadow: 0px 0px 6px 0px rgba(75, 85, 99, 0.1);
`;

const selectOptionsWrapperStyle = css`
  margin: 0 8px;
  max-height: 144px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    height: 40px;
    background-color: #d9d9d9;
  }
`;

const selectOptionStyle = (type: SelectType) => css`
  cursor: pointer;
  display: block;
  padding: ${type === 'sm' ? '10px 0' : '12px 8px'};
  &:hover {
    background-color: ${theme.colors.teal[50]};
    color: ${theme.colors.teal[600]};
  }
`;

export default SelectBox;
