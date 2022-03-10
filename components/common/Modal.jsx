import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';

import styled from 'styled-components';
import styles, { colors, fonts, gameFont } from 'utils/styles';
import { TextButton } from './Buttons';
import { H1 } from './Text';
import { Flex } from './Box';
import Icon from './Icon';

function Modal({
  children,
  displayClose,
  titleText,
  modalProps,
  variant,
  ...rest
}) {
  React.useEffect(() => {
    const $root = document.getElementById('__next');
    $root.classList.add('baboom');

    return () => {
      $root.classList.remove('baboom');
    };
  }, []);

  const isSmall = variant === 'small';

  return (
    <AriaModal
      px={5}
      getApplicationNode={() => document.getElementById('__next')}
      dialogClass
      dialogStyle={{
        alignSelf: 'flex-start',
        transition: 'all .23s',
        width: '100%',
        maxWidth: '50ch',
        margin: 'auto',
      }}
      titleText={titleText}
      {...rest}
    >
      <Flex
        flexDirection="column"
        borderRadius={styles.defaultStyles.borderRadius}
        fontFamily={fonts.mono}
        color={colors.secondary}
        p={4}
        position="absolute"
        left="50%"
        width="calc(100% - 16px)"
        maxWidth={isSmall ? ['calc(100% - 16px)', '470px'] : '960px'}
        style={{
          background: 'linear-gradient(to bottom, #bbbf, #ccce)',
          transform: 'translateX(-50%)',
        }}
        {...modalProps}
      >
        {displayClose && (
          <TextButton
            alignSelf="flex-end"
            primaryColor={colors.secondary}
            secondaryColor={colors.primaryActive}
            id="close"
            position="absolute"
            title="close"
            top="5px"
            right="0"
            onClick={rest.onExit}
          >
            <Icon fontSize="2em" icon="forbid" prefix="ic" />
          </TextButton>
        )}
        <Flex centered justifyContent="space-between" mb={4}>
          <StyledH1>{titleText}</StyledH1>
        </Flex>

        {children}
      </Flex>
    </AriaModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  displayClose: PropTypes.bool,
  modalProps: PropTypes.shape({}),
  titleText: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  displayClose: true,
  modalProps: {},
  variant: undefined,
};

export default Modal;

export const StyledH1 = styled(H1)`
  color: ${colors.secondary};
  ${gameFont}
  font-size: 32px;
  font-weight: 900;
  text-align: center;
  width: 100%;
`;
