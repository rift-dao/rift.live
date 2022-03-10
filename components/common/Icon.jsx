import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from './Text';

function Icon({ className, icon, prefix, ...rest }) {
  const classPrefix = prefix ? `${prefix} ${prefix}-` : '';

  let parsedIcon = icon;

  if (icon.indexOf('dir-') === 0) {
    parsedIcon = `ascend ${icon}`;
  }

  return (
    <StyledIcon
      as="i"
      className={`${className} ${classPrefix + parsedIcon}`.trim()}
      {...rest}
    />
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  prefix: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  prefix: '',
};

export default Icon;

export const StyledIcon = styled(Text)`
  &.dir-right {
    transform: translateX(-0.15em) rotate(-45deg) scale(0.73);
  }

  &.dir-down {
    transform: translateY(-0.15em) rotate(45deg) scale(0.73);
  }

  &.dir-left {
    transform: translateX(0.15em) rotate(135deg) scale(0.73);
  }

  &.dir-up {
    transform: translateY(0.15em) rotate(225deg) scale(0.73);
  }
`;
