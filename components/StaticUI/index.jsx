import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useRiftState } from 'riftState';

import WalletDisplay from './WalletDisplay';
import Locations from './Locations';
import HelpBar from './HelpBar';

function StaticUI({ children }) {
  const { active, fetched, getMana, getRiftInfo, isAttuned } = useRiftState();

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        getMana();
      }, 10000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [active, getMana]);

  useEffect(() => {
    if (fetched && isAttuned) {
      getRiftInfo();
    }
  }, [fetched, isAttuned]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {fetched && isAttuned && (
        <>
          <WalletDisplay />

          <Locations />
        </>
      )}

      <HelpBar />

      {children}
    </>
  );
}

StaticUI.propTypes = {
  children: PropTypes.node,
};

StaticUI.defaultProps = {
  children: null,
};

export default StaticUI;
