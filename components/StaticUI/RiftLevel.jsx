import { useRef } from 'react';

import { useRiftState } from 'riftState';

import Box, { Flex } from 'components/common/Box';
import UILabel from 'components/common/UILabel';
import Tooltip from 'components/Tooltip';

function RiftLevel() {
  const { riftLevel } = useRiftState();
  const ref = useRef();

  return (
    <Flex
      ref={ref}
      textAlign="left"
      position={['relative', 'absolute']}
      top="20px"
      left={[0, '20px']}
      flexDirection="column"
      zIndex={9}
    >
      <Tooltip
        container={ref.current}
        id="tt-riftLevel"
        className="riftLevel_tooltip"
        offset={{ bottom: 5 }}
        content={
          <Box maxWidth="200px">
            Determines the number of times $AMNA can be claimed from a Crystal.
            Affects Rift Objects in various ways.
          </Box>
        }
      >
        <UILabel
          fontSize="1em"
          fadeIn={200}
          label="Rift Level"
          labelProps={{ textAlign: 'right', marginRight: '15px' }}
        >
          {riftLevel}
        </UILabel>
      </Tooltip>
    </Flex>
  );
}

RiftLevel.propTypes = {};

RiftLevel.defaultProps = {};

export default RiftLevel;
