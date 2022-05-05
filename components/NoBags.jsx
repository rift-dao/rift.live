import React from 'react';
// import PropTypes from 'prop-types';

import Box from './common/Box';
import { TextButton } from './common/Buttons';
import { H2 } from './common/Text';

function NoCrystals() {
  return (
    <Box>
      <H2 fontSize="1.5em" mb={3}>
        You don&apos;t have any Loot Bags.
      </H2>

      <ul>
        <li style={{ marginBottom: '10px' }}>
          <TextButton as="a" href="https://www.lootproject.com/">
            Learn more about loot.
          </TextButton>
        </li>

        <li style={{ marginBottom: '10px' }}>
          <TextButton
            as="a"
            href="https://etherscan.io/address/0x1dfe7ca09e99d10835bf73044a23b73fc20623df#writeContract"
          >
            Mint mLoot
          </TextButton>
        </li>

        <li style={{ marginBottom: '10px' }}>
          <TextButton as="a" href="https://www.loot.exchange/">
            Buy Loot on Loot Exchange
          </TextButton>
        </li>

        <li style={{ marginBottom: '10px' }}>
          <TextButton as="a" href="https://opensea.io/collection/lootproject">
            Buy Loot on OpenSea
          </TextButton>
        </li>

        <li style={{ marginBottom: '10px' }}>
          <TextButton as="a" href="https://genesisproject.notion.site/">
            Summon Genesis Adventurer
          </TextButton>
        </li>

        <li>
          <TextButton
            as="a"
            href="https://opensea.io/collection/genesisadventurer"
          >
            Buy GA on OpenSea
          </TextButton>
        </li>
      </ul>
    </Box>
  );
}

NoCrystals.propTypes = {};
NoCrystals.defaultProps = {};

export default NoCrystals;
