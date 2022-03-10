import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles, { colors } from 'utils/styles';

import Box from './common/Box';

function ProgressBar({ start, stop, currentValue, ...rest }) {
  return (
    <Bar
      color={colors.accentColor}
      height={2}
      width="100%"
      percentage={(currentValue / (stop - start)) * 100}
      {...rest}
    />
  );
}

ProgressBar.propTypes = {
  start: PropTypes.number,
  stop: PropTypes.number,
  currentValue: PropTypes.number,
};

ProgressBar.defaultProps = {
  start: 0,
  stop: 100,
  currentValue: 0,
};

export default ProgressBar;

export const Bar = styled(Box)`
  background-color: ${(p) => (p.light ? '#0004' : '#fff4')};
  height: 8px;
  width: 100%;
  position: relative;
  border-radius: ${styles.defaultStyles.borderRadius};
  overflow: hidden;

  &::after {
    content: '';
    background-color: ${(p) => p.color};
    border-radius: ${styles.defaultStyles.borderRadius};
    display: inline-block;
    height: 8px;
    width: ${(p) => `${p.percentage}%`};
    position: absolute;
    top: 0;
    left: 0;
  }
`;
