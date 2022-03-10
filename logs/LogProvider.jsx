import PropTypes from 'prop-types';
import { useReducer } from 'react';

// import { useRiftState } from 'riftState';

import { LogContext } from './useLogs';
import logReducer, { initialState } from './logReducer';

// const SAMPLE_MINT_LOG = {
//   id: 'id',
//   type: 'mint',
//   data: {
//     bagId: '1',
//     status: 'complete',
//   },
// };

// const SAMPLE_LOGS = [];

const LogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logReducer, initialState);

  return (
    <LogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogProvider;

LogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
