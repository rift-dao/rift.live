import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

import useDialog from 'hooks/useDialog';
import { UnderlineButton } from 'components/common/Buttons';

import { dialogBorder, fonts } from 'utils/styles';
import { fadeIn } from 'utils/animations';
import Box, { Flex } from '../common/Box';

const defaultOptions = {
  endDelay: 500,
  speed: 35,
};

const Dialog = ({ forceEnd, messages, onDialogEnd, options, ...rest }) => {
  const {
    activeMessageIndex,
    message,
    actions,
    dialogEnded,
    messageEnded,
    nextMessage,
    prevMessage,
    setDialogEnded,
    setMessageEnded,
  } = useDialog(messages);

  useEffect(() => {
    if (dialogEnded) {
      onDialogEnd();
    }
  }, [dialogEnded, onDialogEnd]);

  const settings = { ...defaultOptions, ...options };

  useEffect(() => {
    if (forceEnd === true) {
      setMessageEnded(true);
      setDialogEnded(true);
    }
  }, [forceEnd]);

  const handleSkip = () => {
    setMessageEnded(true);
  };

  return (
    <Container padding={[3, 4]} m={[0]} zIndex="1" {...rest}>
      <Box
        fontFamily={fonts.retro}
        fontSize={[4]}
        tabindex="0"
        aria-pressed="false"
        onKeyDown={(event) => {
          if (
            event.key === ' ' ||
            event.key === 'Enter' ||
            event.key === 'Spacebar'
          ) {
            event.preventDefault();
            handleSkip();
          }
        }}
        onClick={handleSkip}
      >
        {messageEnded && <span>{message}</span>}
        {!messageEnded && (
          <Typewriter
            style={{ fontFamily: fonts.retro }}
            key={activeMessageIndex}
            options={{
              pauseFor: 10000000000,
              delay: settings.speed,
              cursor: '◈',
              loop: false,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(message)
                .callFunction(() => {
                  setTimeout(() => {
                    setMessageEnded(true);
                    if (messages.length === 1) {
                      setDialogEnded(true);
                    }
                  }, settings.endDelay);
                })
                .start();
            }}
          />
        )}
        {messageEnded && actions.length > 0 && (
          <DialogActions
            mt={3}
            ml="auto"
            actions={actions}
            next={(props) => {
              nextMessage(props);
              setMessageEnded(false);
            }}
            prev={prevMessage}
          />
        )}
      </Box>
    </Container>
  );
};

export default Dialog;

Dialog.propTypes = {
  forceEnd: PropTypes.bool,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          onSelect: PropTypes.func,
        }),
      ),
    }),
  ).isRequired,
  onDialogEnd: PropTypes.func,
  options: PropTypes.shape({}),
};

Dialog.defaultProps = {
  forceEnd: false,
  onDialogEnd: () => {},
  options: {},
};

export const Container = styled(Box)`
  ${(p) => dialogBorder(p.purple)}
  position: relative;
  animation: ${fadeIn} 0.5s linear 1;
`;

export function DialogActions({ actions, next, prev, ...rest }) {
  return (
    <Flex as="form" flexDirection="row-reverse" fontSize={[2, 3]} {...rest}>
      {actions.map((action, index) => (
        <UnderlineButton
          autoFocus={index === 0}
          key={action.label}
          onClick={() => action.onSelect(action.label, { next, prev })}
          type="button"
        >
          {action.label}
        </UnderlineButton>
      ))}
    </Flex>
  );
}

DialogActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onSelect: PropTypes.func.isRequired,
    }),
  ).isRequired,
  next: PropTypes.func,
  prev: PropTypes.func,
};

DialogActions.defaultProps = {
  next: () => {},
  prev: () => {},
};
