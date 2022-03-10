import React from 'react';
import PropTypes from 'prop-types';

import styles from '../utils/styles';

import Text from './common/Text';
import { TextButton } from './common/Buttons';
import { Flex } from './common/Box';

function DisplayError({ error, onClear, ...rest }) {
  return (
    <Flex
      bg="warning"
      color="white"
      centered
      p={2}
      borderRadius={styles.defaultStyles.borderRadius}
      {...rest}
    >
      {typeof error === 'string' ? <Text>{error}</Text> : error}
      {onClear && (
        <TextButton
          primaryColor="black"
          secondaryColor="white"
          ml="auto"
          onClick={onClear}
        >
          clear
        </TextButton>
      )}
    </Flex>
  );
}

DisplayError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClear: PropTypes.func,
};

DisplayError.defaultProps = {
  onClear: null,
};

export default DisplayError;
