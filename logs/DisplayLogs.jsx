import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLogs } from 'logs';

import { colors, fonts } from 'utils/styles';

import Box, { Flex } from 'components/common/Box';
import Text from 'components/common/Text';

let key = 0;
function DisplayLogs({ maxLogs, ...rest }) {
  const { pile } = useLogs();

  // if (!pile || pile.length === 0) return null;

  return (
    <>
      {pile?.length > 0 && (
        <Flex flexDirection="column" p={3} borderRadius={2} {...rest}>
          {(maxLogs > 0 ? pile.slice(-1 * maxLogs) : pile).map((log) => (
            <DisplayLogItem key={key++} log={log} />
          ))}
        </Flex>
      )}
      {pile?.length === 0 && <Text>No transactions...</Text>}
    </>
  );
}

DisplayLogs.propTypes = {
  maxLogs: PropTypes.number,
};

DisplayLogs.defaultProps = {
  maxLogs: 0,
};

export default DisplayLogs;

const STATUS = {
  initiated: '⏰',
  pending: '🚀',
  complete: '✨',
  canceled: '🪂',
};

const COLORS = {
  complete: colors.accentColor,
};

/* eslint-disable react/prop-types */
export const DisplayLogItem = ({ log }) => {
  const logLine = useMemo(() => {
    switch (log.type) {
      case 'firstMint':
      case 'mint': {
        if (log.status === 'pending') {
          return log.type === 'firstMint'
            ? `Attuning bag #${log.data.bagId} to the Rift`
            : `Minting Crystal with bag #${log.data.bagId}`;
        }
        if (log.status === 'complete') {
          return log.type === 'firstMint'
            ? `Attuned bag #${log.data.bagId}`
            : `Minted Crystal with bag #${log.data.bagId}`;
        }
        if (log.status === 'canceled') {
          return `${log.type} canceled`;
        }
        return `Awaiting approval from wallet for ${log.type}`;
      }
      default: {
        if (log.status === 'pending') {
          return `${log.type} pending`;
        }
        if (log.status === 'complete') {
          return `${log.type} complete`;
        }
        if (log.status === 'canceled') {
          return `${log.type} canceled`;
        }
        if (log.status === 'error') {
          return `Error calling ${log.type}`;
        }
        return `Awaiting approval from wallet for ${log.type}`;
      }
    }
  }, [log]);

  return (
    <Flex
      color={COLORS[log.status] || colors.secondary}
      fontFamily={fonts.mono}
      alignItems="center"
      flexWrap={['wrap', 'nowrap']}
      mb={3}
    >
      <Box flexBasis="35px" mr={2}>
        {STATUS[log.status] || ''}
      </Box>
      <Box flexBasis="200px">
        {new Date(log.timestamp).toLocaleTimeString()}
      </Box>
      <Box
        flexBasis="calc(100% - 25px)"
        fontWeight={log.status === 'initiated' ? '900' : '400'}
      >
        {logLine}{' '}
        {/* {log.status === 'complete' && <TextButton>view</TextButton>} */}
      </Box>
    </Flex>
  );
};
