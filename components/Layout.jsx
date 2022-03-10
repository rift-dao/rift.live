import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';

import Outside from './backgrounds/Outside';
import { Flex } from './common/Box';

function Layout({ children, showBackground }) {
  return (
    <>
      <Head>
        <title>◢◣◤◥</title>
        <meta name="description" content="Step into the Rift..." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com" />
        <link href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Press+Start+2P&family=Source+Sans+Pro:wght@200;300;700&display=swap"
          rel="stylesheet"
        />
        <link href="/afiado/style.css" />
      </Head>

      {showBackground && <Outside />}

      <Flex
        width="100%"
        minHeight={[0, '100vh']}
        position="relative"
        justifyContent="center"
        alignItems="center"
        zIndex="1"
        flexDirection="column"
      >
        {children}
      </Flex>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showBackground: PropTypes.bool,
};

Layout.defaultProps = {
  showBackground: true,
};

export default Layout;

export const Footer = styled.footer``;
