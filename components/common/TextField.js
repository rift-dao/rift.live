import styled from 'styled-components';
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
import { colors, fonts } from 'utils/styles';

const Base = styled.input(
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

export default styled(Base)((p) => ({
  background: p.background || 'transparent',
  border: p.border || 'none',
  borderBottom: p.borderBottom || `1px solid ${colors.interactiveDefault}`,
  color: p.color || colors.interactiveDefault,
  fontSize: p.fontSize || '1.5em',
  fontFamily: p.fontFamily || fonts.mono,
  type: 'text',
  '&:active,&:focus': {
    background: '#fff2',
    color: 'white',
    borderColor: 'white',
  },
  '&:active,&:focus + .ic': {
    color: 'white',
  },
}));
