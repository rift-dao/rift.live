import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import riftBackground from 'lib/backgrounds/riftBackground';
import stars from 'lib/backgrounds/stars';

import Box from 'components/common/Box';

function Outside() {
  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        bottom="0"
        right="0"
        overflow="hidden"
        zIndex="1"
      >
        <Stars speed={650} />
        <Stars speed={1300} animX />
      </Box>

      <RiftBg />
    </>
  );
}

Outside.propTypes = {};
Outside.defaultProps = {};

export default Outside;

export const Stars = styled(Box)`
  ${(p) => stars(p.speed || 300, p.animX)};
  position: absolute;
  left: 0;
  top: 0;
`;

export const RiftBg = styled(Box)`
  ${riftBackground};
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
