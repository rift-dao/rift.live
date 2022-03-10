import { useEffect, useState } from 'react';

import { useRiftState } from 'riftState';

import Box, { Flex } from 'components/common/Box';
import Inside from 'components/backgrounds/Inside';
import NoBags from 'components/NoBags';
import Outside from 'components/backgrounds/Outside';

import Dashboard from './Dashboard';
import Intro from './Intro';

export const VIEWS = {
  SETUP: 'SETUP',
  GETLOOT: 'GETLOOT',
  INTRO: 'INTRO',
  DASHBOARD: 'DASHBOARD',
};
function RiftApp() {
  const { bags, crystals, fetched, getCrystals, isAttuned, refreshBag } =
    useRiftState();
  const [view, setView] = useState(VIEWS.SETUP);

  useEffect(() => {
    if (fetched) {
      let loadView = VIEWS.INTRO;

      if (isAttuned) {
        loadView = VIEWS.DASHBOARD;
      } else if (!bags.length) {
        loadView = VIEWS.GETLOOT;
      }

      setView(loadView);
    }
  }, [bags.length, crystals.length, fetched, isAttuned]);

  const handleIntroEnd = (bagId) => {
    refreshBag(bagId);
    getCrystals();
  };

  // console.log('bags', bags);
  // 0: initial load
  // 1: prereq -> cannot play (more info links + crystals if in wallet)
  // 2: intro quest -> first quest walkthough
  // 3: attuned -> game dashboard
  // const [appState, setAppState] = React.useState(0);

  // Rift State
  // GET: Loot/mLoot, Rift, Crystals, Mana
  // bags - ids[] (Loot/mLoot)
  // crystals - ids[] (Crystals)
  // riftBags - bags => Rift.riftBags(bagId) (Rift)
  // isAttuned - bool, any riftBags[bags.id].level > 0
  // mana - int (Mana)

  // States:
  // Prereq (!bags && !isAttuned && !crystals)
  // Intro Quest (bags && !isAttuned && !crystals)
  // Attuned (isAttuned)
  // OnlyCrystals (!isAttuned && crystals)

  return (
    <>
      <Outside />
      {view === VIEWS.DASHBOARD && <Inside />}
      <Flex
        width="100%"
        minHeight="100vh"
        position="relative"
        justifyContent="center"
        alignItems="center"
        zIndex="1"
        flexDirection="column"
      >
        {fetched && view === VIEWS.INTRO && (
          <Box width={['calc(100% - 20px)', 'calc(100% - 20px)', '960px']}>
            <Intro onEnd={handleIntroEnd} />
          </Box>
        )}
        {fetched && view === VIEWS.DASHBOARD && <Dashboard />}
        {fetched && view === VIEWS.GETLOOT && (
          <Box>
            <NoBags />
          </Box>
        )}
      </Flex>
    </>
  );
}

RiftApp.propTypes = {};
RiftApp.defaultProps = {};

export default RiftApp;
