import Layout from 'components/Layout';
import TextLevelUp from 'components/TextLevelUp';
import Box, { Flex } from 'components/common/Box';
import { H1, P, UL } from 'components/common/Text';
import styled from 'styled-components';
import { colors } from 'utils/styles';
import { OutlineButton, UnderlineButton } from 'components/common/Buttons';
import Link from 'components/common/Link';

function Home() {
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
        px={[2, 3, 3, 0]}
        overflowX="hidden"
      >
        <Flex mt={4} mr={4} alignSelf={['center', 'flex-end', 'flex-end']}>
          <Link LinkElem={UnderlineButton} href="/bags">
            Manage Bags
          </Link>

          <Link LinkElem={UnderlineButton} href="/crystals">
            Manage Crystals
          </Link>
        </Flex>

        <Flex flexDirection="column" width="100%" maxWidth="960px" py={[3, 4]}>
          <H1 fontSize={['2em', '3em', '4em']} mt={6} textAlign="center">
            Welcome to the Rift!
          </H1>

          <Flex mt={7} mb={4} justifyContent="center">
            <TextLevelUp />
          </Flex>

          <Flex alignItems="center" justifyContent="space-between" gridGap={2}>
            <P flex={4} textAlign="center">
              The Rift is XP and Leveling infrastructure for Loot
            </P>
          </Flex>

          <Flex mt={4} mb={7} justifyContent="center">
            <OutlineButton
              as="a"
              href="https://the-rift.notion.site/the-rift/The-Rift-a91c0515607d43fab0d2559cb5fae471"
            >
              Whitepaper
            </OutlineButton>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            my={4}
            gridGap={4}
            flexDirection={['column-reverse', 'row']}
          >
            <Box flex={5}>
              <img alt="Loot Bag XP Interface" src="/images/LootBag.png" />
            </Box>

            <P flex={4} textAlign="center">
              Performing actions throughout the Lootverse will give your bag XP
              and Level it up.
            </P>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={7}
            gridGap={2}
          >
            <P flex={1} textAlign="center">
              <OutlineButton
                as="a"
                href="https://the-rift.notion.site/Ways-to-Earn-XP-9b304cd87e7a49db99903de9ee682635"
              >
                Earn XP
              </OutlineButton>
            </P>
          </Flex>

          <Flex centered gridGap={4} flexDirection={['column', 'row']}>
            <Box maxWidth="40ch" flex={2}>
              <P>
                As your bag levels up, it&apos;ll be able to perform more
                powerful actions. Stuff like:
              </P>

              <UL mt={4}>
                <li>Dynamic minting based on bag level</li>
                <li>Be more effective in dungeon raids</li>
                <li>Craft more powerful weapons or items</li>
              </UL>
            </Box>

            <P flex={1} textAlign="center">
              <OutlineButton
                as="a"
                href="https://www.notion.so/the-rift/The-Rift-a91c0515607d43fab0d2559cb5fae471"
              >
                Learn More
              </OutlineButton>
            </P>
          </Flex>

          <Box height="100vh">
            <H1 as="h2" mt={7} mb={4} textAlign="center">
              Mana Crystals
            </H1>

            <Flex mt={4} mb={7} justifyContent="center" gridGap={3}>
              <OutlineButton
                as="a"
                href="https://the-rift.notion.site/Mana-Crystals-Quickstart-c2e22b7cef7a4333af61f9fd2663ddca"
              >
                Quick Start
              </OutlineButton>
              <OutlineButton
                as="a"
                href="https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345"
              >
                Full Guide
              </OutlineButton>
            </Flex>

            <Flex
              centered
              gridGap={4}
              flexDirection={['column', 'column', 'row']}
            >
              <Box flex={1}>
                <P textAlign="center" margin="auto">
                  Mana Crystals are a fully on-chain game and Loot project.
                  They’re the first project to award your bag XP and use your
                  bag’s level!
                </P>
              </Box>

              <Box flex={1} textAlign="center">
                <img
                  alt="Crystal NFT"
                  src="/images/crystal2.svg"
                  width="300"
                  height="300"
                />
              </Box>
            </Flex>

            <P mt={6}>
              Gain XP for minting and sacrificing Crystals. As your bag levels
              up, it will be able to mint more powerful Crystals.
            </P>

            <P mt={4}>
              Crystals generate Mana every day. Mana is an inflationary
              Proof-of-Participation token. Mana will be used by other projects
              to gain XP allocations.
            </P>

            <P mt={4}>
              You can delay claiming Mana, and instead refocus your Crystal to
              increase its power. The more powerful your Crystal is, the more
              Mana and XP it generates.
            </P>

            <Box p={5}>
              <img alt="Crystal Anatomy" src="/images/crystal_anatomy.png" />
            </Box>

            <P margin="20px auto" textAlign="center">
              <OutlineButton
                as="a"
                href="https://the-rift.notion.site/Mana-Crystals-1e4a28cd61514ff0acd3504fba7af345#9b842cdf14ab447f83a276f46ab0860b"
              >
                View Full Guide
              </OutlineButton>
            </P>

            <br />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
}

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

export const A = styled.a`
  color: white;
  text-decoration: underline;

  &:hover {
    color: ${colors.accentColor};
  }
`;
