import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from './common/Box';

function TextLevelUp({ ...rest }) {
  return (
    <Pre fontSize={['2.35vw', '2.35vw', '1em']} {...rest}>
      {`
██╗     ███████╗██╗   ██╗███████╗██╗       ██╗   ██╗██████╗ ██╗
██║     ██╔════╝██║   ██║██╔════╝██║       ██║   ██║██╔══██╗██║
██║     █████╗  ╚██╗ ██╔╝█████╗  ██║       ██║   ██║██████╔╝██║
██║     ██╔══╝   ╚████╔╝ ██╔══╝  ██║       ██║   ██║██╔═══╝ ╚═╝
███████╗███████╗  ╚██╔╝  ███████╗███████╗  ╚██████╔╝██║     ██╗
╚══════╝╚══════╝   ╚═╝   ╚══════╝╚══════╝   ╚═════╝ ╚═╝     ╚═╝`}
    </Pre>
  );
}

TextLevelUp.propTypes = {};
TextLevelUp.defaultProps = {};

export default TextLevelUp;

export const Pre = styled(Box).attrs({ as: 'pre' })`
  text-align: center;
  width: 100%;
`;
