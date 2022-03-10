import React from 'react';
import PropTypes from 'prop-types';

import FirstMint from 'RiftApp/FirstMint';
import xpTable from 'data/xpTable.json';
import helpers from 'utils/helpers';

import { Flex, Span } from 'components/common/Box';
import Text, { H2, P } from 'components/common/Text';
import { PlainButton } from 'components/common/Buttons';

import ProgressBar from 'components/ProgressBar';
import { fonts } from 'utils/styles';
import { DisplayCharges } from './components';

function DefaultView({ bagId, level, xp, charges, onChargeClick, ...rest }) {
  return (
    <>
      <Flex flexDirection="column" p={3} {...rest}>
        {level === 0 && (
          <Flex alignItems="flex-start">
            <Flex
              width="100%"
              flex={1}
              flexDirection="column"
              alignContent="flex-start"
            >
              <H2>{helpers.displayBag(bagId)}</H2>

              <P fontFamily={fonts.mono} mt={2} lineHeight="1.4em">
                This bag is not yet attuned...
              </P>

              <FirstMint bagId={bagId} />
            </Flex>
          </Flex>
        )}

        {level > 0 && (
          <>
            <Flex alignItems="flex-start" gridGap={5}>
              <Flex
                width="100%"
                flex={1}
                flexDirection="column"
                alignContent="flex-start"
              >
                <H2>{helpers.displayBag(bagId)}</H2>

                <ProgressBar
                  mt={3}
                  mb={2}
                  stop={xpTable[level] - xpTable[level - 1]}
                  currentValue={xp - xpTable[level - 1]}
                />

                <Text>
                  XP: {xp - xpTable[level - 1]} /{' '}
                  {xpTable[level] - xpTable[level - 1]}
                </Text>
              </Flex>

              <Flex centered flexDirection="column">
                <Span fontSize="3em">{level}</Span>
                <Span fontSize=".8em" textTransform="uppercase">
                  Level
                </Span>{' '}
              </Flex>
            </Flex>

            {charges > 0 && (
              <PlainButton alignSelf="flex-start" onClick={onChargeClick}>
                <DisplayCharges charges={charges} />
              </PlainButton>
            )}
          </>
        )}
      </Flex>
    </>
  );
}

DefaultView.propTypes = {
  bagId: PropTypes.string,
  charges: PropTypes.number,
  level: PropTypes.number,
  xp: PropTypes.number,
  onChargeClick: PropTypes.func,
};

DefaultView.defaultProps = {
  bagId: '#0000',
  charges: 0,
  level: 0,
  xp: 0,
  onChargeClick: null,
};

export default DefaultView;
