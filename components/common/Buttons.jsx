import styled from 'styled-components';
import {
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  typography,
} from 'styled-system';
import { hueRotate } from 'utils/animations';
import styles, {
  boxShadow,
  colorBorderColor,
  colors,
  gameFont,
} from 'utils/styles';

export const ButtonBase = styled.button.attrs((p) => ({
  primaryColor: p.primaryColor || 'white' || colors.bgSecondary,
  secondaryColor: p.secondaryColor || colors.bg,
}))(
  {
    borderRadius: '1px 0 1px 0',
    background: 'none',
    border: 'none',
    ':hover:not(:disabled)': {
      cursor: 'pointer',
    },
  },
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  typography,
);

const getColor = (p, secondary = false) => {
  if (secondary) return !p.inverted ? p.secondaryColor : p.primaryColor;
  return !p.inverted ? p.primaryColor : p.secondaryColor;
};

export const PlainButton = styled(ButtonBase)`
  color: inherit;
  border: none;
  box-shadow: none;
  outline: none;
  font-size: inherit;
  background: inherit;
  cursor: pointer;
`;

export const UnderlineButton = styled(ButtonBase)`
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: ${styles.defaultStyles.borderRadius};

  ${gameFont}
  font-size: 1em;
  font-weight: 100;

  position: relative;
  padding: 7px 12px;
  margin-left: 2px;
  margin-right: 2px;

  transition: all 0.13s;
  color: ${(p) => p.color || getColor(p)};

  &:hover,
  &.active,
  &:focus {
    cursor: pointer;
    background-color: transparent;
    color: ${(p) => getColor(p, true)};
    border-color: black;
    outline: none;
  }

  &::before {
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${(p) => p.accentColor || getColor(p)};
    transition: height 0.23s;
    z-index: -1;
  }

  &:hover::before,
  &.active::before,
  &:focus::before {
    height: 100%;
    animation: ${hueRotate('0deg', '15deg')} 5s linear infinite;
  }
`;

export const OutlineButton = styled(ButtonBase)`
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: ${styles.defaultStyles.borderRadius};

  font-family: monospace;
  font-weight: 100;

  position: relative;
  padding: 7px 12px;

  transition: all 0.13s;
  color: ${(p) => p.color || getColor(p)};
  border: 1px solid ${getColor};

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    ${colorBorderColor(colors.accentColor)}
    cursor: pointer;
    background-color: transparent;
  }
`;

export const TextButton = styled(ButtonBase).attrs({
  secondaryColor: colors.accentColor,
})`
  color: ${(p) => p.color || getColor(p)};
  ${gameFont}
  font-size: ${(p) => p.fontSize || '20px'};

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    color: ${(p) => getColor(p, true)};
    animation: ${hueRotate('0deg', '15deg')} 5s linear infinite;
    outline: none;
  }

  &:disabled {
    cursor: default !important;
    opacity: 0.5;
  }
`;

export const TransparentButton = styled(TextButton)`
  border-color: transparent;
`;

export const SolidButton = styled(OutlineButton)`
  background: ${getColor};
  color: ${(p) => p.color || getColor(p, true)};
  ${gameFont}
  transition: all 0.13s;

  :disabled {
    opacity: 0.65;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    border-color: transparent;
    background: ${(p) => getColor(p, true)};
    color: ${(p) => p.color || getColor(p)};
    animation: ${hueRotate('0deg', '15deg')} 5s linear infinite;
    /* transform: scale(1.006); */
    /* ${boxShadow(1)} */
  }

  &:hover:disabled {
    cursor: default;
    border-color: transparent;
    background: ${getColor};
    color: ${(p) => p.color || getColor(p, true)};
  }
`;
