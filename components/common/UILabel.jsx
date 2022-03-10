import React from 'react';
import PropTypes from 'prop-types';

import { fonts } from 'utils/styles';

import { Flex } from './Box';
import { P } from './Text';

// TODO: make better
function UILabel({
  children,
  label,
  labelProps,
  seperator,
  tooltip,
  valueProps,
  ...rest
}) {
  return (
    <>
      <Flex
        justifyContent="space-between"
        centered
        lineHeight="1.4em"
        fontFamily={fonts.retro}
        {...rest}
      >
        <P fontFamily="inherit" my={0} lineHeight="inherit" {...labelProps}>
          {label}
          {seperator}
        </P>
        {children && (
          <P
            fontFamily="inherit"
            my={0}
            flex={1}
            lineHeight="inherit"
            {...valueProps}
          >
            {children}
          </P>
        )}
      </Flex>
    </>
  );
}

UILabel.propTypes = {
  children: PropTypes.node,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  labelProps: PropTypes.shape({}),
  seperator: PropTypes.string,
  tooltip: PropTypes.node,
  valueProps: PropTypes.shape({ style: PropTypes.shape({}) }),
};

UILabel.defaultProps = {
  children: null,
  labelProps: {},
  seperator: ': ',
  tooltip: null,
  valueProps: {},
};

export default UILabel;
