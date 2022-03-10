import PropTypes from 'prop-types';

import helpers from 'utils/helpers';

import Text, { H2, P } from 'components/common/Text';
import { Span } from 'components/common/Box';
import { fonts } from 'utils/styles';
import 'components/common/Icon';

function FirstMint({ bagId }) {
  return (
    <>
      <H2 mt={2} mb={3} fontSize="1em">
        Cost
      </H2>
      <Text
        mb={3}
        fontFamily={fonts.mono}
        style={{ display: 'block', maxWidth: '100%', textTransform: 'none' }}
      >
        Eth is only required for minting your first Crystal from a bag. All
        future Crystals minted from the same bag will only cost $AMNA.
      </Text>

      <P style={{ display: 'flex' }}>
        <Span flex={1}>Eth:</Span>{' '}
        <Span>{0.0004 * helpers.lootMultiplier(bagId)}</Span>
      </P>

      <Text mt={2} mb={1} className="divider left">
        Rewards
      </Text>
      <P style={{ display: 'flex' }}>
        <Span flex={1}>Crystal:</Span> <Span>Atun 1</Span>
      </P>
      <P style={{ display: 'flex' }}>
        <Span flex={1}>$AMNA:</Span>{' '}
        <Span>{10 * helpers.lootMultiplier(bagId)}</Span>
      </P>
      <P style={{ display: 'flex' }}>
        <Span flex={1}>Bag XP:</Span> <Span>{15}</Span>
      </P>
    </>
  );
}

FirstMint.propTypes = {
  bagId: PropTypes.string.isRequired,
};

FirstMint.defaultProps = {};

export default FirstMint;
