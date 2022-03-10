import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import helpers from 'utils/helpers';

import { useLogs } from 'logs';
import { useRiftState } from 'riftState';

import Box from 'components/common/Box';
import { TextButton } from 'components/common/Buttons';

import DetailView from 'components/DetailView';
import Crystal from './Crystal';
import SacrificeCrystal from './SacrificeCrystal';

function CrystalDetail({ crystalId, onCancel, ...rest }) {
  const {
    crystalsMap,
    getCrystalsData,
    getRefocusMana,
    handleClaimMana,
    handleRefocusCrystal,
    riftLevel,
  } = useRiftState();
  const [view, setView] = useState('default');
  const { dispatch } = useLogs();

  const { isCharged, claimableMana, refocusMana } = useMemo(
    () => crystalsMap[crystalId] || {},
    [crystalsMap, crystalId],
  );

  const onLevel = useCallback(async () => {
    handleRefocusCrystal(
      dispatch,
      { crystalId },
      { onSuccess: () => getCrystalsData() },
    );
  }, [crystalId, dispatch]);

  const onClaimMana = useCallback(async () => {
    handleClaimMana(
      dispatch,
      { crystalId },
      { onSuccess: () => getCrystalsData() },
    );
  }, [crystalId, dispatch]);

  useEffect(() => {
    if (typeof refocusMana === 'undefined') {
      getRefocusMana(crystalId);
    }
  }, [crystalId, refocusMana]);

  const actions = useMemo(() => {
    const output = [];

    if (claimableMana > 0) {
      output.push({
        label: `Claim Mana (+ ${claimableMana} $AMNA)`,
        props: {
          tooltip: `$AMNA can be claimed once a day. Claim can be called a number of times equal to the Rift's level (${riftLevel}). Refocusing unlocks more claims.`,
          tooltipUrl:
            'https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#207a749068e741289ae36724b3af8099',
          alignSelf: 'flex-start',
          marginLeft: 0,
          onClick: () => onClaimMana(),
        },
        value: 'claim',
      });
    }

    if (isCharged) {
      output.push({
        label: `Refocus (+ ${refocusMana || 0} $AMNA)`,
        props: {
          tooltip:
            'Increase focus of your Crystal by 1 and reset mana claims. Refocusing auto-claims any excess $AMNA',
          tooltipUrl:
            'https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#9792244bb88c4c4bbd24185e3958e5b6',
          alignSelf: 'flex-start',
          marginLeft: 0,
          onClick: () => onLevel(),
        },
        value: 'refocus',
      });

      output.push({
        label: 'Sacrifice',
        props: {
          tooltip: 'Burn Crystal for bag XP, $AMNA, and Karma',
          tooltipUrl:
            'https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#f7cb0552b2db427b9de888625bc33e3f',
          alignSelf: 'flex-start',
          marginLeft: 0,
          onClick: () => setView('sacrifice'),
        },
        value: 'sacrifice',
      });

      output.push({
        label: 'Sacrifice and Mint (saves gas!)',
        props: {
          tooltip: 'Burn Crystal and mint a new one, using 1 Rift Charge',
          tooltipUrl:
            'https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#f7cb0552b2db427b9de888625bc33e3f',
          alignSelf: 'flex-start',
          marginLeft: 0,
          onClick: () => setView('sacrificeMint'),
        },
        value: 'sacrificeMint',
      });
    }

    return output;
  }, [claimableMana, isCharged, onClaimMana, onLevel, refocusMana]);

  return (
    <DetailView
      actions={actions}
      actionView={
        view === 'sacrifice' || view === 'sacrificeMint' ? (
          <SacrificeCrystal
            mt={3}
            crystalId={crystalId}
            mint={view === 'sacrificeMint'}
            onCancel={() => setView('default')}
          />
        ) : null
      }
      primaryView={
        <>
          <Crystal crystal={crystalsMap[crystalId]} displayFull />
        </>
      }
      secondaryView={
        <>
          <Box
            as="img"
            width="100%"
            src={helpers.imageFromTokenUri(crystalsMap[crystalId]?.token)}
          />
        </>
      }
      {...rest}
    >
      <TextButton
        alignSelf="flex-start"
        onClick={() => onCancel()}
        style={{ position: 'absolute', transform: 'translateY(-30px)' }}
      >
        Back
      </TextButton>
    </DetailView>
  );
}

CrystalDetail.propTypes = {
  crystalId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CrystalDetail.defaultProps = {};

export default CrystalDetail;
