import { useState } from 'react';

import { useRiftState } from 'riftState';
import { colors, fonts } from 'utils/styles';
import { useLogs } from 'logs';

import Box, { Flex } from '../common/Box';
import Icon from '../common/Icon';
import Modal from '../common/Modal';
import { TextButton } from '../common/Buttons';
import { P } from '../common/Text';

import AboutRift from '../AboutRift';
import DisplayError from '../DisplayError';
import DisplayLogs from '../../logs/DisplayLogs';
import Tooltip from '../Tooltip';

function HelpBar() {
  const { fetched, isAttuned } = useRiftState();
  const { active, dispatch, pile } = useLogs();
  const [modal, setModal] = useState('');
  const [lastPileDepth, setLastPileDepth] = useState(pile.length);

  const closeLogModal = () => {
    setLastPileDepth(pile.length);
    setModal('');
  };

  const openLogModal = () => {
    setLastPileDepth(pile.length);
    setModal('logs');
  };

  return (
    <>
      <Flex
        fadeIn={500}
        textAlign="right"
        alignItems="center"
        justifyContent={['flex-end']}
        position={['relative', 'absolute']}
        mt={['-80px', 2]}
        mb={4}
        top={[0, '75px']}
        right={[0, '20px']}
        zIndex={2}
      >
        {fetched && isAttuned && (
          <Tooltip id="tt-txLog" content="Transaction log">
            <TextButton
              primaryColor="white"
              fontSize="42px"
              alignSelf="flex-end"
              onClick={openLogModal}
              mt="5px"
            >
              <Icon icon="time" prefix="ic" />
              {pile.length !== lastPileDepth && (
                <Box
                  bg={colors.accentColor}
                  borderRadius={6}
                  width={10}
                  height={10}
                  position="absolute"
                  right="3px"
                  top="2px"
                />
              )}
            </TextButton>
          </Tooltip>
        )}

        <Tooltip id="tt-info" content="Info">
          <TextButton
            primaryColor="white"
            fontFamily={fonts.mono}
            fontSize="2.5em"
            alignSelf="flex-end"
            onClick={() => setModal('help')}
          >
            ?
          </TextButton>
        </Tooltip>
      </Flex>

      {modal === 'help' && (
        <Modal
          id="help"
          onExit={() => setModal('')}
          titleText="About The Rift"
          modalProps={{ p: 4 }}
        >
          <AboutRift />
        </Modal>
      )}

      {modal === 'logs' && (
        <Modal
          id="logs"
          onExit={closeLogModal}
          titleText="Transaction Log"
          modalProps={{ p: 4 }}
        >
          <DisplayLogs />
        </Modal>
      )}

      {active?.id && (
        <Modal
          variant="small"
          titleText={`transaction ${active.status}`}
          onExit={() => dispatch({ type: 'resetActive' })}
        >
          <P>{active.message}</P>
          {active.status === 'error' && (
            <DisplayError error={active.data.message} />
          )}
        </Modal>
      )}
    </>
  );
}

HelpBar.propTypes = {};
HelpBar.defaultProps = {};

export default HelpBar;
