import React from 'react';
import PropTypes from 'prop-types';

import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import styled, { css } from 'styled-components';
import styles, { colorBorderColor, colors } from 'utils/styles';
import { Flex } from './Box';
import { TextButton } from './Buttons';

function Dropdown({
  className,
  light,
  onChange,
  options,
  placeholder,
  selectedOption,
  stylePlain,
  value,
}) {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(
    options.length,
  );

  const handleClick = (option, index) => {
    setIsOpen(false);
    onChange(option, index);
  };

  return (
    <Container className={className}>
      <MockInput
        light={light}
        className={isOpen ? 'active' : ''}
        type="button"
        stylePlain={stylePlain}
        {...buttonProps}
      >
        {value && options.filter((option) => option.value === value)[0]?.label}
        {!value &&
          (selectedOption >= 0 ? options[selectedOption].label : placeholder)}
      </MockInput>

      <OptionsContainer
        flexDirection="column"
        className={isOpen ? 'visible' : ''}
        role="menu"
      >
        {options.map((option, index) => (
          <Option
            key={option.value.split(' ').join('_')}
            {...itemProps[1]}
            onClick={() => handleClick(option, index)}
          >
            {option.label || option.value}
          </Option>
        ))}
      </OptionsContainer>
    </Container>
  );
}

export const optionType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
});

Dropdown.propTypes = {
  className: PropTypes.string,
  light: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(optionType).isRequired,
  placeholder: PropTypes.string,
  selectedOption: PropTypes.number,
  stylePlain: PropTypes.bool,
  value: PropTypes.string,
};

Dropdown.defaultProps = {
  className: undefined,
  light: false,
  onChange: () => {},
  placeholder: 'Select',
  selectedOption: -1,
  stylePlain: false,
  value: '',
};

export default Dropdown;

export const MockInput = styled(TextButton)`
  background-color: transparent;
  border-radius: ${styles.defaultStyles.borderRadius};
  cursor: pointer;
  text-align: left;
  font-size: 1em;
  font-family: monospace;
  padding: 7px 20px 7px 10px;
  position: relative;

  ${(p) =>
    p.stylePlain
      ? ''
      : colorBorderColor(p.light ? colors.bg : colors.bgSecondary)}

  &:hover,
  &.active {
    ${(p) => (p.stylePlain ? '' : colorBorderColor(colors.primary))}
  }

  ${(p) =>
    p.stylePlain
      ? ''
      : `&::after {
    content: '◢';
    margin-left: auto;
    right: 3px;
    bottom: 0;
    position: absolute;
    font-size: 12px;
  }`}

  &.active::after {
    content: '◤';
  }

  ${(p) =>
    p.stylePlain
      ? css`
          padding: 0;
          color: unset;
          border: unset;

          &.active::after {
            display: none;
          }
        `
      : ''}
`;

export const Option = styled.button`
  border: none;
  background: none;
  flex: 1;
  font-size: 16px;
  text-align: left;
  text-transform: uppercase;
  padding: 5px 6px;
  font-family: monospace;

  &:hover {
    background: #0001;
    cursor: pointer;
  }
`;

export const OptionsContainer = styled(Flex)`
  background-color: ${colors.primary};
  box-shadow: 0 4px 3px 0 #000f;
  color: ${colors.bg};
  position: absolute;
  width: 100%;
  top: calc(100% + 1px); /* height + 1 */
  padding: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  z-index: ${styles.zIndex.overlay};
`;

export const Container = styled.div`
  position: relative;

  div[role='menu'] {
    visibility: hidden;
  }

  div[role='menu'].visible {
    visibility: visible;
  }
`;
