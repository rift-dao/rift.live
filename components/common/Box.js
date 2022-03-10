import styled, { css } from 'styled-components';
import {
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from 'styled-system';
import { fadeIn } from 'utils/animations';

const Base = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  border,
  space,
  color,
  grid,
  layout,
  position,
  shadow,
  flexbox,
  typography,
);

export const Span = styled.span(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    display: (p) => p.display || 'inline-block',
  },
  border,
  space,
  color,
  layout,
  position,
  shadow,
  flexbox,
  typography,
);

const Box = styled(Base)((p) => {
  let output = ``;

  if (p.fadeIn) {
    output = css`
      opacity: 0;
      animation: ${fadeIn} 0.65s ${p.fadeIn}ms linear 1;
      animation-fill-mode: forwards;
    `;
  }

  return output;
});

export const Flex = styled(Box)({
  display: (p) => (p.inline ? 'inline-flex' : 'flex'),
  boxSizing: 'border-box',
  alignItems: (p) => (p.centered ? 'center' : p.alignItems),
});

export default Box;
