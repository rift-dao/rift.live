import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Connect from 'components/Connect';
import Layout from 'components/Layout';

import { useRiftState } from 'riftState';
import { fadeIn } from 'utils/animations';

import { useEffect } from 'react';

const CrystalsApp = dynamic(() => import('CrystalsApp'));

export default function Crystals() {
  const { account, fetched, getCrystals } = useRiftState();

  useEffect(() => {
    if (fetched && account) {
      getCrystals();
    }
  }, []);

  return (
    <Layout>
      {!account && <StyledConnect />}
      {fetched && account && <CrystalsApp />}
    </Layout>
  );
}

export const StyledConnect = styled(Connect)`
  animation: ${fadeIn} 1s linear 1;
`;
