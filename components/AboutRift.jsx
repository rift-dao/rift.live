import React from 'react';

import { Flex } from './common/Box';
import { TextButton } from './common/Buttons';
import { H2, P } from './common/Text';

function AboutRift() {
  return (
    <>
      <P>
        Venture into the Rift with your Loot Bag and start growing its power.
        The more you interact with the Rift, the more powerful your Loot Bag
        becomes. All power increases are fully transferable with the bag.
      </P>

      <P mt={3}>
        Leveling your bag gains you Rift Charges. Use those Rift Charges to
        create new Rift Items, starting with Crystals.
      </P>

      <P mt={3}>
        Use your Rift Charges carefully. The higher your bag level, the more
        powerful Crystal it will create.
      </P>

      <H2 mt={[4]}>About Crystals</H2>
      <P>
        The first of many items to come from the power of the rift. Use rift
        charges to mint Crystals. Once minted Crystals can (once a day) claim an
        amount of Mana equal to its Spin.
      </P>

      <P mt={3}>
        Each Crystal can only generate an amount of Mana equal to its Resonance
        every level. Refocusing a Crystal will level it up, increasing its Spin
        and Resonance and unlocking more claimable Mana.
      </P>

      <P mt={3}>
        Decide between Refocusing your Crystal often to quickly increase its
        Mana production or maximizing your total Mana yield.
      </P>

      <H2 mt={[4]}>About Mana</H2>
      <P>
        Generated daily from Crystals. Use it to mint Crystals and to gain Rift
        Charges.
      </P>

      <Flex justifyContent="center" gridGap={4}>
        <TextButton
          as="a"
          primaryColor="white"
          href="https://discord.gg/vm9gkkFTHc"
        >
          Discord
        </TextButton>

        <TextButton
          as="a"
          primaryColor="white"
          href="https://twitter.com/TheRiftDAO"
        >
          Twitter
        </TextButton>

        <TextButton
          as="a"
          primaryColor="white"
          href="https://the-rift.notion.site/the-rift/The-Rift-a91c0515607d43fab0d2559cb5fae471"
        >
          Notion
        </TextButton>
      </Flex>
    </>
  );
}

AboutRift.propTypes = {};
AboutRift.defaultProps = {};

export default AboutRift;
