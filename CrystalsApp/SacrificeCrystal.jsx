import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import BagDropdown from 'components/BagDropdown';
import { Flex, Span } from 'components/common/Box';
import Text, { P } from 'components/common/Text';
import { SolidButton, TextButton } from 'components/common/Buttons';

import { useLogs } from 'logs';

import { useRiftState } from 'riftState';

import xpMap from 'data/xpTable.json';

import { colors } from 'utils/styles';
import helpers from 'utils/helpers';

function SacrificeCrystal({ crystalId, mint, onCancel, ...rest }) {
  const {
    bags,
    crystalsMap,
    getCrystals,
    getSacrificeRewards,
    handleSacrificeCrystal,
    riftBagsMap,
  } = useRiftState();
  const { dispatch } = useLogs();

  const { sacrificeRewards } = useMemo(
    () => crystalsMap[crystalId],
    [crystalsMap, crystalId],
  );

  const bagList = useMemo(() => {
    if (!mint) return bags;

    return bags.filter((bagId) => {
      const bag = riftBagsMap[bagId] || { xp: 0, level: 1 };
      return (
        bag &&
        sacrificeRewards &&
        (bag.charges > 0 || bag.xp + sacrificeRewards.xp >= xpMap[bag.level])
      );
    });
  }, [bags, mint, riftBagsMap, sacrificeRewards]);

  const [selectedBag, setSelectedBag] = useState(0);

  useEffect(() => {
    if (typeof sacrificeRewards === 'undefined') {
      getSacrificeRewards(crystalId);
    }
  }, [crystalId, sacrificeRewards]);

  const onSacrifice = async () => {
    handleSacrificeCrystal(
      dispatch,
      { crystalId, bagId: bagList[selectedBag], mint },
      {
        onSuccess: () => getCrystals(),
      },
    );
  };
  return (
    <>
      <Flex mb={3} flexDirection="column" {...rest}>
        {bagList.length === 1 ? (
          <P>Powering up {helpers.displayBag(bagList[0])}</P>
        ) : (
          <>
            <P>Select bag to power up</P>
            {bagList.length > 0 && (
              <BagDropdown
                light={false}
                bags={bagList}
                onChange={setSelectedBag}
                defaultValue={0}
              />
            )}
          </>
        )}
      </Flex>

      <Text mt={2} mb={1} className="divider left">
        Rewards
      </Text>

      <P style={{ display: 'flex' }}>
        <Span flex={1}>Bag XP:</Span> <Span>{sacrificeRewards?.xp || '-'}</Span>
      </P>

      <P style={{ display: 'flex' }}>
        <Span flex={1}>$AMNA:</Span>{' '}
        <Span>{sacrificeRewards?.mana || '-'}</Span>
      </P>

      <Flex flexDirection="column" centered mt={2} mx={[-2]}>
        <SolidButton
          color={colors.primary}
          primaryColor={colors.destructive}
          secondaryColor={colors.destructiveActive}
          mx={[2]}
          inverted
          width="100%"
          style={{ alignSelf: 'stretch' }}
          fontSize={2}
          onClick={() => onSacrifice(selectedBag)}
        >
          Sacrifice (Burn) Crystal #{crystalId}
        </SolidButton>
        <TextButton mt={3} onClick={onCancel}>
          Cancel
        </TextButton>
      </Flex>
    </>
  );
}

SacrificeCrystal.propTypes = {
  crystalId: PropTypes.string.isRequired,
  mint: PropTypes.bool,
  onCancel: PropTypes.func,
};

SacrificeCrystal.defaultProps = {
  mint: false,
  onCancel: () => {},
};

export default SacrificeCrystal;
