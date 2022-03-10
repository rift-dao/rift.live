import styled from 'styled-components';
import {
  border,
  color,
  flex,
  layout,
  shadow,
  space,
  typography,
} from 'styled-system';

import styles, { colors, fonts, gameFont } from 'utils/styles';

const Text = styled.span`
  ${border}
  ${space}
  ${color}
  ${typography}
  ${shadow}
  ${flex}
  ${layout}

  /* font-family: ${fonts.mono}; */

  &.divider.left {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    &::before,
    &::after {
      content: '';
      border-top: 1px solid ${colors.bgAlphaWhite};
      width: 100%;
      margin-left: 1em;
      margin-right: 1em;
    }

    &::before {
      width: 1em;
      margin-left: 0;
    }
  }

  .highlight,
  &.highlight {
    background: ${(p) => p.bg || colors.bgAlphaBlack};
    border-radius: ${styles.defaultStyles.borderRadius};
    display: inline;
    padding: ${(p) => p.padding || '5px'};
    left: 5px;
    position: relative;
    box-shadow: 5px 0 ${(p) => p.bg || colors.bgAlphaBlack},
      -5px 0 ${(p) => p.bg || colors.bgAlphaBlack};
  }
`;
// (
//   {
//     boxSizing: 'border-box',
//     margin: 0,
//   },
//   border,
//   space,
//   color,
//   layout,
//   typography,
// );

export default Text;

export const P = styled(Text).attrs({ as: 'p' })`
  /* font-family: ${(p) => (p.fontFamily ? p.fontFamily : fonts.mono)}; */
  line-height: ${(p) => p.lineHeight || p.style?.lineHeight || '1.69em'};

  &.system {
    font-family: ${(p) => (p.fontFamily ? p.fontFamily : fonts.sans)};
    font-weight: 300;
    font-size: 16px;
  }
`;

export const H1 = styled(Text).attrs({ as: 'h1' })`
  ${(p) => (p.fontFamily ? `font-family: ${p.fontFamily}` : gameFont)};

  &.truncate {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const H2 = styled(H1).attrs({ as: 'h2' })`
  font-size: ${(p) => p.fontSize || '1.2em'};
  letter-spacing: 0.035em;
`;

export const UL = styled(Text).attrs({ as: 'ul' })`
  list-style: disc;
  padding-left: 25px;

  li {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;
