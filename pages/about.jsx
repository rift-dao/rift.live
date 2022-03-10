import Layout from 'components/Layout';
import { Flex } from 'components/common/Box';
import { H2, P } from 'components/common/Text';
import { UnderlineButton } from 'components/common/Buttons';
import Link from 'components/common/Link';

function About() {
  return (
    <Layout>
      <Flex
        width="100vw"
        height="100vh"
        position={['relative']}
        justifyContent={['flex-start']}
        alignItems="center"
        zIndex="1"
        flexDirection="column"
        overflowX="hidden"
      >
        {/* {!active && <Connect />} */}
        {/* {active && <Intro bags={bags} />} */}
        {/* <Dashboard /> */}
        {/* <ComingSoon /> */}
        <Flex flexDirection="column" maxWidth="960px" px={[3, 0]} py={[3, 4]}>
          <H2>About The Rift</H2>
          <P>
            Venture into the Rift with your Loot Bag and start growing its
            power. The more you interact with the Rift, the more powerful your
            Loot Bag becomes. All power increases are fully transferable with
            the bag.
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
            charges to mint Crystals. Once minted Crystals can (once a day)
            claim an amount of Mana equal to its Spin.
          </P>

          <P mt={3}>
            Each Crystal can only generate an amount of Mana equal to its
            Resonance every level. Refocusing a Crystal will level it up,
            increasing its Spin and Resonance and unlocking more claimable Mana.
          </P>

          <P mt={3}>
            Decide between Refocusing your Crystal often to quickly increase its
            Mana production or maximizing your total Mana yield.
          </P>

          <H2 mt={[4]}>About Mana</H2>
          <P>
            Generated daily from Crystals. Use it to mint Crystals and to gain
            Rift Charges.
          </P>

          <UnderlineButton mt={3} alignSelf="flex-end" as={Link} href="/">
            Back
          </UnderlineButton>
        </Flex>
      </Flex>
    </Layout>
  );
}

About.propTypes = {};
About.defaultProps = {};

export default About;
