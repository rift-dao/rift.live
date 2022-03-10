import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';

import envconfig from 'config/envconfig';

import Loot from 'contracts/Loot';
import Rift from 'contracts/Rift';
import manaAbi from 'contracts/Mana.json';

import Crystals from 'contracts/Crystals';
import { ADD_LOG, guidGenerator } from 'logs/logReducer';
import helpers from 'utils/helpers';
import { RiftStateContext } from './useRiftState';

const defaultCallbacks = {
  onConfirm: () => {},
  onError: () => {},
  onSuccess: () => {},
};

export const chainIdToName = {
  1: 'mainnet',
  3: 'ropsten',
};

const RiftStateProvider = ({ children }) => {
  const { account, active, chainId, library } = useWeb3React();
  const [bags, setBags] = useState([]);
  const [crystals, setCrystals] = useState([]);
  const [mana, setMana] = useState(0);
  const [riftLevel, setRiftLevel] = useState(3);
  const [riftBags, setRiftBags] = useState([]);
  const [riftBagsMap, setRiftBagsMap] = useState({});
  const [crystalsMap, setCrystalsMap] = useState({});
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const ref = useRef();

  const chain = chainIdToName[chainId] || 'ropsten';

  const isAttuned = useMemo(() => {
    return riftBags.length > 0;
  }, [riftBags.length]);

  const lootContract = useMemo(
    () =>
      new Loot(
        library,
        envconfig.getAddress('loot', chain),
        envconfig.getAddress('mLoot', chain),
        envconfig.getAddress('gLoot', chain),
      ),
    [chain, library],
  );

  const manaContract = useMemo(
    () => new Contract(envconfig.getAddress('mana', chain), manaAbi, library),
    [chain, library],
  );

  const riftContract = useMemo(
    () =>
      new Rift(
        library,
        envconfig.getAddress('rift', chain),
        envconfig.getAddress('riftData', chain),
      ),
    [chain, library],
  );

  const crystalsContract = useMemo(
    () =>
      new Crystals(
        library,
        envconfig.getAddress('crystals', chain),
        envconfig.getAddress('crystalsMetadata', chain),
      ),
    [chain, library],
  );

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      const promises = [
        lootContract.lootIdsInWallet(account, false),
        crystalsContract.crystalIdsInWallet(account),
        manaContract.balanceOf(account),
      ];
      const responses = await Promise.all(promises);

      if (responses[0]) {
        const newBags = [...new Set(responses[0])];

        const allRiftBagsPromises = newBags.map((bagId) =>
          riftContract.bag(bagId),
        );
        const allRiftBags = await Promise.all(allRiftBagsPromises);
        const newMap = {};
        const riftBagIds = [];
        allRiftBags.forEach((riftBag, index) => {
          if (riftBag.xp > 0) {
            riftBagIds.push(newBags[index]);
            newMap[newBags[index]] = { ...riftBag };
          }
        });

        setBags(newBags);
        setRiftBagsMap(newMap);
        setRiftBags(riftBagIds);
      }

      if (responses[1]) {
        setCrystals(responses[1]);
      }

      if (responses[2]) {
        setMana(responses[2].toNumber());
      }

      setFetching(false);
      setFetched(true);
    }

    if (active && !fetched && !fetching) {
      // TODO: investigate - RiftStateProvider is being unloaded and loaded
      // Web3ReactProvider?
      ref.current = setTimeout(fetchData, 500);
    }

    return () => {
      clearTimeout(ref.current);
    };
  }, [
    account,
    active,
    fetched,
    fetching,
    crystalsContract,
    lootContract,
    manaContract,
    riftContract,
  ]);

  const callContract = useCallback(
    async (
      { contract, dispatch, logData, method, callbacks = {} },
      ...args
    ) => {
      const id = guidGenerator();
      const { onConfirm, onError, onSuccess } = {
        ...defaultCallbacks,
        ...callbacks,
      };

      dispatch({
        type: ADD_LOG,
        status: 'initiated',
        data: {
          id,
          type: method,
          data: logData,
          message: `Waiting on approval for ${method}`,
          timestamp: new Date().getTime(),
        },
      });

      const tx = await contract[method](...args).catch((err) => {
        const status =
          err.message.indexOf('User denied') === -1 ? 'error' : 'canceled';
        dispatch({
          type: ADD_LOG,
          status,
          data: {
            id,
            type: method,
            data: logData,
            message: `Unable to complete ${method} transaction.`,
            timestamp: new Date().getTime(),
          },
        });

        // setTimeout(() => {
        //   dispatch({
        //     type: REMOVE_LOG,
        //     data: { id, data: logData },
        //   });
        // }, 3000);
        onError(err);
      });

      if (!tx) return;

      onConfirm(tx);

      dispatch({
        type: ADD_LOG,
        status: 'pending',
        data: {
          id,
          type: method,
          data: logData,
          message: `${method} transaction pending...`,
          timestamp: new Date().getTime(),
        },
      });

      const receipt = await tx.wait(1).catch((err) => {
        dispatch({
          type: ADD_LOG,
          status: 'error',
          data: {
            id,
            type: method,
            data: logData,
            message: `Unable to complete ${method} transaction.`,
            timestamp: new Date().getTime(),
          },
        });

        onError(err);
      });

      dispatch({
        type: ADD_LOG,
        status: 'complete',
        data: {
          id,
          type: method,
          data: logData,
          message: `${method} transaction succeeded!`,
          timestamp: new Date().getTime(),
        },
      });

      onSuccess(receipt);
    },
    [],
  );

  const refreshBag = async (bagId) => {
    const bag = await riftContract.bag(bagId);

    if (bag.level > 0) {
      if (riftBags.indexOf(bagId) === -1) {
        setRiftBags([...riftBags, bagId]);
      }

      setRiftBagsMap({
        ...riftBagsMap,
        [bagId]: { ...bag, xp: bag.xp },
      });
    }
  };

  const getBags = async () => {
    const bagIds = await lootContract.lootIdsInWallet(account, false);
    const newBags = [...new Set(bagIds)];

    const allRiftBagsPromises = newBags.map((bagId) => riftContract.bag(bagId));
    const allRiftBags = await Promise.all(allRiftBagsPromises);
    const newMap = {};
    const riftBagIds = [];
    allRiftBags.forEach((riftBag, index) => {
      if (riftBag.level > 0) {
        riftBagIds.push(newBags[index]);
        newMap[newBags[index]] = { ...riftBag };
      }
    });

    setBags(newBags);
    setRiftBagsMap(newMap);
    setRiftBags(riftBagIds);
  };

  const getCrystals = async () => {
    const crystalIds = await crystalsContract.crystalIdsInWallet(account);

    setCrystals(crystalIds);
    return crystalIds;
  };

  const getCrystalsData = async () => {
    const promises = [
      ...[...crystals].map((crystalId) => crystalsContract.crystal(crystalId)),
    ];

    const crystalData = await Promise.all(promises);

    const newMap = {};
    const now = new Date().getTime();
    crystalData.forEach((data, index) => {
      const lastClaim = parseInt(data.lastClaim, 10) * 1000;

      const chargeTime = helpers.dayDiff(now, lastClaim);
      const isCharged = chargeTime >= data.focus;

      newMap[crystals[index]] = {
        ...crystalData[index],
        chargeTime,
        isCharged,
      };
    });

    setCrystalsMap({ ...newMap });
  };

  const getMana = async () => {
    const response = await manaContract.balanceOf(account);
    setMana(response.toString());
  };

  const getRefocusMana = async (crystalId) => {
    const refocusMana = await crystalsContract.crystals.refocusMana(crystalId);
    const cMap = { ...crystalsMap };
    if (cMap[crystalId]) {
      cMap[crystalId].refocusMana = refocusMana;
      setCrystalsMap(cMap);
    }
    return refocusMana;
  };

  const getRiftInfo = async () => {
    const { level } = await riftContract.riftInfo();
    setRiftLevel(level);
  };

  const getSacrificeRewards = async (crystalId) => {
    let rewards = await riftContract.rift.growTheRiftRewards(
      envconfig.getAddress('crystals', chain),
      crystalId,
    );

    rewards = {
      mana: rewards.mana,
      xp: rewards.xp,
    };

    const cMap = { ...crystalsMap };
    if (cMap[crystalId]) {
      cMap[crystalId].sacrificeRewards = rewards;
      setCrystalsMap(cMap);
    }

    return rewards;
  };

  const handleClaimAll = async (dispatch, { tokenIds }, callbacks = {}) => {
    return callContract(
      {
        contract: crystalsContract,
        dispatch,
        method: 'multiClaimCrystalMana',
        logData: { tokenIds },
        callbacks,
      },
      tokenIds,
    );
  };

  const handleClaimMana = async (dispatch, { crystalId }, callbacks = {}) => {
    return callContract(
      {
        contract: crystalsContract,
        dispatch,
        method: 'claimCrystalMana',
        logData: { crystalId },
        callbacks,
      },
      crystalId,
    );
  };

  const handleBuyCharge = async (dispatch, { bagId }, callbacks = {}) => {
    return callContract(
      {
        contract: riftContract,
        dispatch,
        method: 'buyCharge',
        logData: { bagId },
        callbacks,
      },
      bagId,
    );
  };

  const handleFirstMint = async (
    dispatch,
    { account: txAccount, bagId },
    callbacks = {},
  ) => {
    return callContract(
      {
        contract: crystalsContract,
        dispatch,
        method: 'firstMint',
        logData: { bagId },
        callbacks,
      },
      txAccount,
      bagId,
    );
  };

  const handleRefocusAll = async (dispatch, { tokenIds }, callbacks = {}) => {
    return callContract(
      {
        contract: crystalsContract,
        dispatch,
        method: 'multiRefocusCrystal',
        logData: { tokenIds },
        callbacks,
      },
      tokenIds,
    );
  };

  const handleRefocusCrystal = async (
    dispatch,
    { crystalId },
    callbacks = {},
  ) => {
    return callContract(
      {
        contract: crystalsContract,
        dispatch,
        method: 'refocusCrystal',
        logData: { crystalId },
        callbacks,
      },
      crystalId,
    );
  };

  const handleMint = async (dispatch, { bagId }, callbacks = {}) => {
    return callContract(
      {
        contract: crystalsContract,
        dispatch,
        method: 'mint',
        logData: { bagId },
        callbacks,
      },
      bagId,
    );
  };

  const handleSacrificeCrystal = async (
    dispatch,
    { bagId, crystalId, mint },
    callbacks = {},
  ) => {
    return callContract(
      {
        contract: mint ? crystalsContract : riftContract,
        dispatch,
        method: mint ? 'sacrificeAndMint' : 'growTheRift',
        logData: { crystalId },
        callbacks,
      },
      mint ? crystalId : envconfig.getAddress('crystals', chain),
      mint ? bagId : crystalId,
      !mint && bagId,
    );
  };

  return (
    <RiftStateContext.Provider
      value={{
        account,
        bags,
        callContract,
        crystals,
        crystalsContract,
        crystalsMap,
        fetched,
        fetching,
        getBags,
        getCrystals,
        getCrystalsData,
        getMana,
        getRefocusMana,
        getRiftInfo,
        getSacrificeRewards,
        handleBuyCharge,
        handleClaimAll,
        handleClaimMana,
        handleFirstMint,
        handleRefocusAll,
        handleRefocusCrystal,
        handleMint,
        handleSacrificeCrystal,
        isAttuned,
        library,
        mana,
        manaContract,
        refreshBag,
        riftBags,
        riftBagsMap,
        riftContract,
        riftLevel,
        setMana,
      }}
    >
      {children}
    </RiftStateContext.Provider>
  );
};

export default RiftStateProvider;

RiftStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
