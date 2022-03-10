import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Web3ReactProvider } from '@web3-react/core';
import { providers } from 'ethers';

import animatedGradient from 'lib/backgrounds/animatedGradient';
import theme from 'theme';
import { LogProvider } from 'logs';
import { RiftStateProvider } from 'riftState';
import { colors, fonts } from 'utils/styles';
import { cycleColors, fadeIn } from 'utils/animations';
import helpers from 'utils/helpers';

import StaticUI from 'components/StaticUI';

import 'public/fonts/style.css';
import 'public/afiado/style.css';
// import 'public/social-logos/style.css';
import DisplayLogs from 'logs/DisplayLogs';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  /* reset - https://www.digitalocean.com/community/tutorials/css-minimal-css-reset */
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
  /* end reset */

  html,
  body {
    padding: 0;
    margin: 0;
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: ${colors.bg};
    color: #fffb;
    font-family: ${fonts.retro};
    font-size: 1.2em;
    overflow-x: hidden;

    ${animatedGradient};
  }

  #__next {
      padding-left: 15px;
      padding-right: 15px;
    transition: all .23s;

    @media screen and (min-width: 40em) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  #__next.baboom {
    filter: blur(2px);
    transition: all .23s;
  }

  .rainbow {
    animation: ${cycleColors()} 20s linear infinite;
    opacity: 1;
  }

  .hidden {
    opacity: 0;
    transition: opacity 0.23;
    cursor: default !important;
    pointer-events: none;
  }

  .visible {
    animation: ${fadeIn} 1s 1;
  }

  .__react_component_tooltip.__react_component_tooltip.__react_component_tooltip.__react_component_tooltip {
    background: black;
    border-image-slice: 3;
    border-image-width: 3;
    border-image-repeat: stretch;
    border-image-source: ${helpers.pixelBorderRounded('rgb(180,185,190)')};
    border-image-outset: 2;
    border-style: solid;
    border-width: 4px;
    border-color: #fff;
    color: rgb(180,185,190);
    padding: 1rem 1.5rem;
    margin: 4px;
    transition: none;
    opacity: 1;
    padding: 4px 8px;
    top: 0;
    text-align: left;
    margin: 4px 0;

    &::after {
      border-bottom-color: rgb(180,185,190);
    }

    &.place-bottom::after {
      top: -14px;
    }

    &.riftLevel_tooltip {
      left: 15px !important;
      top: 55px !important;
    }
  }
  
`;

function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const getLibrary = useCallback((provider) => {
    const library = new providers.Web3Provider(provider);
    console.log('provider', provider);
    library.pollingInterval = 120000;
    return library;
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <RiftStateProvider>
        <LogProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />

            {pathname && pathname !== '/' && <StaticUI />}
            {/* <DAppProvider config={config}> */}

            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
            {/* </DAppProvider> */}
          </ThemeProvider>
        </LogProvider>
      </RiftStateProvider>
    </Web3ReactProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;

export const StyledLogs = styled(DisplayLogs)``;
