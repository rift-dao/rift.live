import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from 'theme';

import Text from 'components/common/Text';
import Box, { Flex } from 'components/common/Box';
import ProgressBar from 'components/ProgressBar';
import { colors, fonts, gameFont } from 'utils/styles';
import Tooltip, { TermTooltip } from 'components/Tooltip';
import { useRiftState } from 'riftState';

function Crystal({ crystal, displayFull, light }) {
  const { riftLevel } = useRiftState();
  if (!crystal || !crystal.id) {
    return <h2>loading</h2>;
  }

  return (
    <StyledCrystal
      light={light}
      borderRadius={styles.defaultStyles.borderRadius}
      crystalColor={crystal.color}
      // border={`1px groove ${crystal.color}`}
      // borderTop={`6px groove ${crystal.color}`}
      // boxShadow="5px 5px 10px 0 firebrick"
      p={2}
      my={2}
    >
      <Flex justifyContent="space-between" centered>
        <Flex flexDirection="column" flex={1} mr={[3]}>
          <Text className="cc" color={crystal.color} fontSize="1.2em">
            {crystal.name}
          </Text>

          {displayFull && (
            <>
              <Text fontFamily={fonts.mono} mt={2}>
                ID: {crystal.id}
              </Text>

              <Text fontFamily={fonts.mono}>
                <TermTooltip
                  id="tt-attunement"
                  offset={{ bottom: 0 }}
                  term="Attunement"
                  definition="Level of bag when minting Crystal. Higher attunement Crystals yield more $AMNA."
                  url="https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#b62738e02cf04d04b060fc81bc063a3c"
                >
                  Attunement: {crystal?.attunement}
                </TermTooltip>
              </Text>

              <Text fontFamily={fonts.mono}>
                <TermTooltip
                  id="tt-focus"
                  offset={{ bottom: 0 }}
                  term="Focus"
                  definition="Level of Crystal, max Crystal focus is 10. Crystals with higher focus yield more $AMNA."
                  url="https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#b62738e02cf04d04b060fc81bc063a3c"
                >
                  Focus: {crystal?.focus}
                </TermTooltip>
              </Text>

              <Text fontFamily={fonts.mono}>
                <TermTooltip
                  id="tt-resonance"
                  offset={{ bottom: 0 }}
                  term="Resonance"
                  definition="Amount of $AMNA a Crystal generates in one day. Increases with higher focus and attunement levels."
                  url="https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#89be92216be64bf0ab1502ca930a8356"
                >
                  Resonance: {crystal?.resonance}
                </TermTooltip>
              </Text>

              <Text fontFamily={fonts.mono} mb={2}>
                <TermTooltip
                  id="tt-spin"
                  offset={{ bottom: 0 }}
                  term="Spin"
                  definition="How much $AMNA can be stored in a Crystal. Increases with higher focus and attunement levels."
                  url="https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#b62738e02cf04d04b060fc81bc063a3c"
                >
                  Spin: {crystal?.spin}
                </TermTooltip>
              </Text>
            </>
          )}

          <Flex flexDirection="column" alignContent="flex-start">
            <ProgressBar
              title={`${crystal?.chargeTime} day(s) charged`}
              light={light}
              color={crystal.color}
              my={1}
              stop={crystal?.focus}
              currentValue={crystal?.chargeTime}
            />

            <Text mt={2}>
              Claimable Mana: {crystal?.claimableMana} of {crystal?.spin}
            </Text>
          </Flex>
        </Flex>

        {displayFull && (
          <Tooltip
            labelProps={{ style: { alignSelf: 'center' } }}
            content={`$AMNA can be claimed once a day. Claim can be called a number of times equal to the Rift's level (${riftLevel}). Refocusing unlocks more claims.`}
          >
            <Flex centered flexDirection="column" alignContent="center">
              <Text fontSize={5}>{riftLevel - (crystal?.lvlClaims || 0)}</Text>
              <Text textAlign="center" lineHeight="0.95em" mt={2}>
                claims
                <br />
                left
              </Text>
            </Flex>
          </Tooltip>
        )}
      </Flex>
    </StyledCrystal>
  );
}

Crystal.propTypes = {
  crystal: PropTypes.shape({
    attunement: PropTypes.number,
    focus: PropTypes.number,
    lvlClaims: PropTypes.number,
    levelManaProduced: PropTypes.number,
    lastClaim: PropTypes.string,
    chargeTime: PropTypes.number,
    claimableMana: PropTypes.number,
    color: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string,
    spin: PropTypes.number,
    resonance: PropTypes.number,
    data: PropTypes.shape({
      manaProduced: PropTypes.number,
      level: PropTypes.number,
    }),
  }).isRequired,
  displayFull: PropTypes.bool,
  light: PropTypes.bool,
};

Crystal.defaultProps = {
  displayFull: false,
  light: false,
};

export default Crystal;

export const StyledCrystal = styled(Box)`
  position: relative;
  color: ${(p) => (p.light ? colors.secondary : 'inherit')};
  ${gameFont}
  &::after {
    content: '';
    width: 180px;
    height: 65px;
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
