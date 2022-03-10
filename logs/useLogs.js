import { createContext, useContext } from 'react';

export const LogContext = createContext();

export default () => useContext(LogContext);
