import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useWeb3React } from '@web3-react/core';

import { injectedConnector, walletConnectConnector } from 'config/connectors';
import {
  DialogSelectContainer,
  DialogSelectItem,
} from 'components/DialogSelect';

export default function Connect({ onConnect, ...rest }) {
  const { account, activate } = useWeb3React();

  const handleConnectMM = () => activate(injectedConnector);
  const handleConnectWC = () => activate(walletConnectConnector);

  useEffect(() => {
    if (account) {
      onConnect();
    }
  }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

  // GET: Loot/mLoot, Rift, Crystals, Mana
  // bags - ids[] (Loot/mLoot)
  // crystals - ids[] (Crystals)
  // riftBags - bags => Rift.riftBags(bagId) (Rift)
  // isAttuned - bool, any riftBags[bags.id].level > 0
  // mana - int (Mana)

  return (
    <DialogSelectContainer {...rest}>
      <DialogSelectItem mb={1} p={3} onClick={handleConnectMM}>
        MetaMask
      </DialogSelectItem>

      <DialogSelectItem p={3} onClick={handleConnectWC}>
        WalletConnect
      </DialogSelectItem>
    </DialogSelectContainer>
  );
}

Connect.propTypes = {
  onConnect: PropTypes.func,
};

Connect.defaultProps = {
  onConnect: () => {},
};
