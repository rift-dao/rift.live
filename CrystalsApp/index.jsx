import { useEffect, useMemo, useState } from 'react';
// import PropTypes from 'prop-types';

import { useLogs } from 'logs';
import { useRiftState } from 'riftState';

import Box, { Flex } from 'components/common/Box';
import Container from 'components/common/Container';
import Icon from 'components/common/Icon';
import Link from 'components/common/Link';
import { H2 } from 'components/common/Text';
import { TextButton, UnderlineButton } from 'components/common/Buttons';

import { TermTooltip } from 'components/Tooltip';
import DisplayCrystals from './DisplayCrystals';
import CrystalDetail from './CrystalDetail';

function CrystalsApp() {
  const {
    crystals,
    crystalsMap,
    fetched,
    getCrystalsData,
    handleClaimAll,
    handleRefocusAll,
  } = useRiftState();
  const { dispatch } = useLogs();
  const [selectedCrystal, setSelectedCrystal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const maxPerPage = 6;

  const numOfPages = Math.ceil(crystals.length / maxPerPage);

  const { claimableCrystals, totalClaimableMana } = useMemo(() => {
    const claimable = [];
    const claimableMana = crystals.reduce((prev, current) => {
      const crystalId = typeof prev === 'string' ? prev : current;
      const crystal = crystalsMap[crystalId];
      const subtotal = prev + crystal?.claimableMana;

      if (subtotal > 0) {
        claimable.push(crystalId);
      }

      return subtotal;
    }, 0);
    return { claimableCrystals: claimable, totalClaimableMana: claimableMana };
  }, [crystals, crystalsMap]);

  const refocusCrystals = useMemo(
    () =>
      crystals.filter((crystalId) => {
        const crystal = crystalsMap[crystalId];
        return crystal?.isCharged && crystal?.focus < 10;
      }),
    [crystals, crystalsMap],
  );

  useEffect(() => {
    if (crystals.length > 0) {
      getCrystalsData();
    }
  }, [crystals.length, fetched]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!crystals.length) {
    return (
      <Container style={{ textAlign: 'center' }}>
        <H2 mb={4}>???? ??? ??? ????? ???? ?</H2>

        <Link LinkElem={UnderlineButton} href="/bags">
          ◣◥◤◢
        </Link>
      </Container>
    );
  }

  const onClaimAll = () => {
    const tokenIds = crystals.filter(
      (crystalId) => crystalsMap[crystalId].claimableMana > 0,
    );
    handleClaimAll(
      dispatch,
      { tokenIds },
      { onSuccess: () => getCrystalsData() },
    );
  };

  const onRefocusAll = () => {
    handleRefocusAll(
      dispatch,
      { tokenIds: refocusCrystals },
      { onSuccess: () => getCrystalsData() },
    );
  };

  return (
    <>
      <Flex
        flexDirection="column"
        pt={[0, '8em']}
        justifyContent={['flex-start', 'center']}
        width="100%"
      >
        {!selectedCrystal && crystals.length > 1 && (
          <Flex
            alignSelf="center"
            mb={3}
            width="100%"
            maxWidth="960px"
            justifyContent="space-between"
          >
            {totalClaimableMana > 0 && (
              <TermTooltip
                term="Claim All"
                definition={`Collect ${totalClaimableMana} $AMNA from Crystals: #${claimableCrystals.join(
                  ', #',
                )}`}
                id="tt-claimAll"
              >
                <TextButton onClick={() => onClaimAll()}>
                  Multi-Claim (x{claimableCrystals.length}):{' '}
                  {totalClaimableMana} $AMNA
                </TextButton>
              </TermTooltip>
            )}

            {refocusCrystals.length > 0 && (
              <TermTooltip
                term="Refocus All"
                definition={`Refocus ${
                  refocusCrystals.length
                } Crystals: #${refocusCrystals.join(', #')}`}
                id="tt-refocusAll"
              >
                <TextButton onClick={() => onRefocusAll()}>
                  Multi-Refocus (x{refocusCrystals.length}) Crystals
                </TextButton>
              </TermTooltip>
            )}
          </Flex>
        )}

        <Flex
          width="100%"
          maxWidth={['100%', '100%', '960px']}
          alignSelf="center"
          flexDirection="column"
          flexWrap={['wrap', 'nowrap']}
        >
          {!selectedCrystal && (
            <DisplayCrystals
              width="100%"
              gridGap="8px"
              crystals={crystals
                .slice(
                  (currentPage - 1) * maxPerPage,
                  (currentPage - 1) * maxPerPage + maxPerPage,
                )
                .map((id) => crystalsMap[id] || { id })}
              onClick={(crystalId) => setSelectedCrystal(crystalId)}
            />
          )}

          {selectedCrystal && (
            <>
              <CrystalDetail
                p={2}
                crystalId={selectedCrystal}
                onCancel={() => setSelectedCrystal('')}
              />
            </>
          )}
        </Flex>

        {numOfPages > 1 && !selectedCrystal && (
          <Flex
            mt={3}
            width="100%"
            maxWidth="960px"
            justifyContent="space-between"
            alignSelf="center"
          >
            <TextButton
              primaryColor="white"
              onClick={() =>
                setCurrentPage(
                  currentPage - 1 < 1 ? numOfPages : currentPage - 1,
                )
              }
            >
              <Icon fontSize={6} icon="rewind" prefix="ic" />
            </TextButton>
            <Box mt={2} fontSize={5}>
              {currentPage} / {numOfPages}
            </Box>
            <TextButton
              primaryColor="white"
              onClick={() =>
                setCurrentPage(
                  currentPage + 1 > numOfPages ? 1 : currentPage + 1,
                )
              }
            >
              <Icon fontSize={6} icon="forward" prefix="ic" />
            </TextButton>
          </Flex>
        )}
      </Flex>
    </>
  );
}

CrystalsApp.propTypes = {};
CrystalsApp.defaultProps = {};

export default CrystalsApp;
