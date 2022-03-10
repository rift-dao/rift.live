import styled from 'styled-components';

import stars from 'lib/backgrounds/stars';

import Box from 'components/common/Box';

const Stars = styled(Box)`
  ${(p) => stars(p.speed || 300, p.animX)};
  position: absolute;
  left: 0;
  top: 0;
`;

export default Stars;
