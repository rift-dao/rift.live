import { createContext, useContext } from 'react';

export const RiftStateContext = createContext();

const useRiftState = () => useContext(RiftStateContext);

export default useRiftState;
