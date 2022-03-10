import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useRiftState } from 'riftState';
import { colors } from 'utils/styles';

import Box, { Flex } from '../common/Box';
import Icon from '../common/Icon';
import Link from '../common/Link';
import UILabel from '../common/UILabel';
import { TextButton } from '../common/Buttons';
import { P } from '../common/Text';

function Locations() {
  const { bags, crystals } = useRiftState();

  const router = useRouter();

  const locationLinks = useMemo(
    () => [
      {
        path: '/bags',
        label: `Bags (${bags.length})`,
      },
      {
        path: '/crystals',
        label: `Crystals (${crystals.length})`,
      },
    ],
    [bags.length, crystals.length],
  );
  const getCursorTop = useMemo(() => {
    let linkIndex = 0;

    locationLinks.forEach((location, index) => {
      if (location.path === router.pathname) {
        linkIndex = index;
      }
    });

    const LINK_OFFSET = -3;
    const LINK_HEIGHT = 29;

    return LINK_OFFSET + linkIndex * LINK_HEIGHT;
  }, [locationLinks, router.pathname]);

  return (
    <Flex
      fadeIn={400}
      textAlign="left"
      position={['relative', 'absolute']}
      top={[0, '20px']}
      left={[0, '20px']}
      mt={[4, 0]}
      flexDirection="column"
      zIndex={2}
    >
      <UILabel label="Rift" seperator="" />

      <Flex flexDirection="column" alignItems="flex-start" position="relative">
        <Box
          color={colors.accentColor}
          position="absolute"
          left="-10px"
          style={{
            transform: `translateY(${getCursorTop}px)`,
            transition: 'all 0.13s linear',
          }}
        >
          <Icon fontSize="2em" icon="forward" prefix="ic" />
        </Box>
        <P
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '3px 0 0',
            lineHeight: '1.5em',
          }}
        >
          {locationLinks.map((location) => (
            <Link
              disabled={location.path === router.pathname}
              LinkElem={TextButton}
              key={location.path}
              href={location.path}
              primaryColor={
                location.path === router.pathname ? colors.accentColor : 'white'
              }
              style={{
                paddingLeft: '25px',
              }}
            >
              {location.label}
            </Link>
          ))}
        </P>
      </Flex>
    </Flex>
  );
}

Locations.propTypes = {};
Locations.defaultProps = {};

export default Locations;
