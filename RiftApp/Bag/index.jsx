import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import helpers from 'utils/helpers';

import { useRiftState } from 'riftState';
import { useLogs } from 'logs';

import Box from 'components/common/Box';
import DetailView from 'components/DetailView';
import { TextButton } from 'components/common/Buttons';

import DefaultView from './DefaultView';
import MintView from './MintView';

export const VIEWS = {
  DEFAULT: '',
  MINT: 'MINT',
  ATTUNE: 'ATTUNE',
};

function Bag({
  bagId,
  bagView,
  containerProps,
  imageMap,
  setBagView,
  ...rest
}) {
  const {
    account,
    getBags,
    getCrystals,
    handleBuyCharge,
    handleFirstMint,
    handleMint,
    mana,
    riftBagsMap,
  } = useRiftState();
  const [view, setView] = useState(bagView || VIEWS.DEFAULT);
  const { dispatch } = useLogs();

  const handleViewChange = useCallback(
    (newView) => {
      setBagView(newView);
      setView(newView);
    },
    [setBagView],
  );

  const onBuyCharge = useCallback(() => {
    handleBuyCharge(dispatch, { bagId }, { onSuccess: () => getBags() });
  }, [bagId, dispatch, handleBuyCharge]);

  const onFirstMint = useCallback(() => {
    handleFirstMint(
      dispatch,
      { account, bagId },
      {
        onSuccess: () => {
          getBags();
          getCrystals();
        },
      },
    );
  }, [account, bagId, dispatch, handleFirstMint]);

  const onMint = useCallback(() => {
    handleMint(
      dispatch,
      { bagId },
      {
        onSuccess: () => {
          getBags();
          getCrystals();
        },
      },
    );
  }, [bagId, dispatch, handleMint]);

  const { level, xp, charges, chargesUsed } = riftBagsMap[bagId] || {};

  const actions = useMemo(() => {
    const output = [];

    if (!level || level === 0 || (level === 1 && chargesUsed === 0)) {
      output.push({
        label: 'First Mint',
        props: {
          alignSelf: 'flex-start',
          marginLeft: 0,
          onClick: () => onFirstMint(),
        },
        value: 'mint',
      });
    } else if (charges > 0 && view === VIEWS.MINT) {
      output.push({
        label: `Mint Crystal (${level * helpers.lootMultiplier(bagId)} $AMNA)`,
        props: {
          tooltip: ' ',
          tooltipUrl:
            'https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#14daa6117d3d49eba05766e72a0ba377',
          alignSelf: 'flex-start',
          disabled: mana < level * helpers.lootMultiplier(bagId),
          marginLeft: 0,
          onClick: () => onMint(),
        },
        value: 'mint',
      });
    }

    const daysSinceLastPurchase = helpers.dayDiff(
      new Date().getTime(),
      riftBagsMap[bagId]?.lastChargePurchased * 1000,
    );

    if (daysSinceLastPurchase > 0) {
      output.push({
        label: `Buy Charge (${level * helpers.lootMultiplier(bagId)} $AMNA)`,
        props: {
          tooltip: 'Can be purchased for $AMNA once a day.',
          alignSelf: 'flex-start',
          disabled: mana < level * helpers.lootMultiplier(bagId),
          marginLeft: 0,
          onClick: () => onBuyCharge(),
        },
        value: 'Buy Charge',
      });
    }
    return output;
  }, [
    bagId,
    charges,
    chargesUsed,
    level,
    mana,
    onBuyCharge,
    onFirstMint,
    onMint,
    riftBagsMap,
    view,
  ]);

  return (
    <>
      <DetailView
        actions={actions}
        primaryView={
          <>
            {view === VIEWS.DEFAULT && (
              <DefaultView
                bagId={bagId}
                charges={charges}
                level={level}
                xp={xp}
                onChargeClick={() => handleViewChange(VIEWS.MINT)}
                {...rest}
              />
            )}
            {view === VIEWS.MINT && (
              <>
                <MintView
                  bagId={bagId}
                  level={level || 0}
                  onCancel={() => handleViewChange(VIEWS.DEFAULT)}
                  {...rest}
                />
              </>
            )}
          </>
        }
        secondaryView={
          <>
            <Box as="img" width="100%" src={imageMap[bagId]} />
          </>
        }
        {...containerProps}
      >
        {view === VIEWS.MINT && (
          <TextButton
            alignSelf="flex-start"
            onClick={() => handleViewChange(VIEWS.DEFAULT)}
            style={{ position: 'absolute', transform: 'translateY(-30px)' }}
          >
            Back
          </TextButton>
        )}
      </DetailView>
    </>
  );
}

Bag.propTypes = {
  bagId: PropTypes.string.isRequired,
  bagView: PropTypes.oneOf(Object.keys(VIEWS).map((key) => VIEWS[key])),
  containerProps: PropTypes.shape({}),
  imageMap: PropTypes.shape({}),
  setBagView: PropTypes.func,
};

Bag.defaultProps = {
  bagView: VIEWS.DEFAULT,
  containerProps: {},
  imageMap: {},
  setBagView: () => {},
};

export default Bag;
