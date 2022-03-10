import styled from 'styled-components';
import { border, space, layout, color, flexbox } from 'styled-system';

import css from '@styled-system/css';

const Container = styled.div(
  css({
    maxWidth: '960px',
    margin: '0 auto',
    px: [3, 4],
    py: [1, 2],
  }),
  border,
  space,
  color,
  layout,
);

export const FlexContainer = styled(Container)(
  {
    display: 'flex',
  },
  flexbox,
);

export const WideContainer = styled(FlexContainer)`
  max-width: unset;
`;

export default Container;
