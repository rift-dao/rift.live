import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import helpers from 'utils/helpers';

import { Span } from 'components/common/Box';
import Text, { H2, P } from 'components/common/Text';

import { useRiftState } from 'riftState';
import { Charge } from './components';

function MintView({ bagId, level }) {
  const { crystalsContract } = useRiftState();
  const [mintXp, setMintXp] = React.useState(0);

  useEffect(() => {
    async function fetchData() {
      const xpReward = await crystalsContract.crystals.mintXP(bagId);
      setMintXp(xpReward.toNumber ? xpReward.toNumber() : xpReward);
    }

    if (bagId && crystalsContract.crystals?.mintXP) {
      fetchData();
    }
  }, [bagId, crystalsContract.crystals]);

  return (
    <>
      <H2
        mt={1}
        mb={3}
        style={{ display: 'flex', alignItems: 'center', gridGap: '10px' }}
      >
        Cost{' '}
        <Charge
          title="Rift Charge"
          noHover
          fontSize="1.5em"
          mt={-2}
          size="reg"
        />
      </H2>

      <P style={{ display: 'flex' }}>
        <Span flex={1}>From Bag:</Span> <Span>{helpers.displayBag(bagId)}</Span>
      </P>

      <P style={{ display: 'flex' }}>
        <Span flex={1}>$AMNA:</Span>{' '}
        <Span>{level * helpers.lootMultiplier(bagId)}</Span>
      </P>

      <Text mt={2} mb={1} className="divider left">
        Rewards
      </Text>
      <P style={{ display: 'flex' }}>
        <Span flex={1}>Crystal:</Span> <Span>Atun {level}</Span>
      </P>
      <P style={{ display: 'flex' }} mb={2}>
        <Span flex={1}>Bag XP:</Span> <Span>{level === 1 ? 0 : mintXp}</Span>
      </P>
    </>
  );
}

MintView.propTypes = {
  bagId: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

MintView.defaultProps = {};

export default MintView;
