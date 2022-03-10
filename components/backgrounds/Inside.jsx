import { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'components/common/Box';
import { setup } from 'lib/backgrounds/aurora';
import { fadeIn, hueRotate } from 'utils/animations';

function Inside() {
  const ref = useRef();
  useEffect(() => {
    const $elem = ref.current;
    if ($elem) {
      setup('#bg_container');
    }

    return () => {
      if ($elem) {
        $elem.replaceChildren([]);
      }
    };
  }, []);
  return (
    <>
      <Aurora id="bg_container" ref={ref} />
    </>
  );
}

Inside.propTypes = {};
Inside.defaultProps = {};

export default Inside;

export const Aurora = styled(Box)`
  opacity: 0;
  animation: ${fadeIn} 2s linear 1 forwards;
  animation-delay: 1.5s;

  canvas {
    animation: ${hueRotate('0deg', '25deg')} 60s linear infinite;
  }
`;
