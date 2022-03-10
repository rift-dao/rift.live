import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { useRiftState } from 'riftState';
import { fadeIn } from 'utils/animations';

import Connect from 'components/Connect';
import Layout from 'components/Layout';

const RiftApp = dynamic(() => import('RiftApp'));

export default function Home() {
  const { account, fetched, getBags } = useRiftState();

  useEffect(() => {
    if (fetched && account) {
      getBags();
    }
  }, []);

  return (
    <Layout>
      {!account && <Connect />}
      {fetched && account && <RiftApp />}
    </Layout>
  );
}

export const StyledConnect = styled(Connect)`
  animation: ${fadeIn} 1s linear 1;
`;
