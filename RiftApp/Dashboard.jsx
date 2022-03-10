import { useMemo, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import { fadeIn } from 'utils/animations';
import { colors, dialogBorder } from 'utils/styles';

import { useRiftState } from 'riftState';

import { Flex } from 'components/common/Box';
import Bag, { VIEWS } from 'RiftApp/Bag';
import { TextButton, UnderlineButton } from 'components/common/Buttons';
import Icon from 'components/common/Icon';
import useLootImages from 'hooks/useLootImages';
import TextField from 'components/common/TextField';
import Dropdown from 'components/common/Dropdown';
import helpers, { BAG_TYPES } from 'utils/helpers';
import { P } from 'components/common/Text';
import Tooltip from 'components/Tooltip';

function Dashboard() {
  const { bags, riftBags, riftBagsMap } = useRiftState();
  const { imageMap } = useLootImages(bags);
  const [selectedBagIndex, setSelectedBagIndex] = useState(0);
  const [bagView, setBagView] = useState(VIEWS.DEFAULT);
  const [searchFilter, setSearchFilter] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewDisplay, setViewDisplay] = useState('attuned');

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const filteredBags = useMemo(() => {
    let filtered = bags.filter((bag) =>
      viewDisplay === 'attuned'
        ? riftBagsMap[bag]?.level > 0
        : !riftBagsMap[bag] || riftBagsMap[bag].level === 0,
    );
    const searchIds = searchFilter.split(',').map((val) => val.trim());

    searchIds.forEach((id, index) => {
      if (!id) {
        searchIds.splice(index, 1);
      }
    });

    if (searchIds.length > 0) {
      filtered = bags.filter((id) => searchIds.indexOf(id) !== -1);
    }

    if (filter !== 'all') {
      filtered = filtered.filter((id) => helpers.getBagType(id) === filter);
    }

    setSelectedBagIndex(0);
    return filtered;
  }, [bags, filter, riftBagsMap, searchFilter, viewDisplay]);

  const handleFilterChange = (option) => {
    setSelectedBagIndex(0);
    setFilter(option.value);
  };

  const resetFilters = () => {
    setFilter('all');
    setSearchFilter('');
  };

  return (
    <Container
      width="100%"
      minHeight="100vh"
      flexDirection="column"
      justifyContent={['flex-start', 'center']}
      alignItems="center"
      pt={[0, '8em']}
    >
      {bagView === VIEWS.DEFAULT &&
        bags.length !== riftBags.length &&
        bags.length > 1 && (
          <Flex
            flexDirection="row"
            width="100%"
            maxWidth="960px"
            justifyContent="center"
            px={[3, 0]}
            mt={[4, 0]}
            mb={4}
          >
            <UnderlineButton
              className={viewDisplay === 'attuned' ? 'active' : ''}
              accentColor={
                viewDisplay === 'attuned' ? 'white' : colors.interactiveDefault
              }
              primaryColor={colors.interactiveDefault}
              onClick={() => setViewDisplay('attuned')}
            >
              Attuned
            </UnderlineButton>

            <UnderlineButton
              className={viewDisplay === 'unattuned' ? 'active' : ''}
              accentColor={
                viewDisplay === 'unattuned'
                  ? 'white'
                  : colors.interactiveDefault
              }
              primaryColor={colors.interactiveDefault}
              onClick={() => setViewDisplay('unattuned')}
            >
              Unattuned
            </UnderlineButton>
          </Flex>
        )}

      {bagView === VIEWS.DEFAULT && bags.length > 1 && (
        <Flex
          flexDirection={['column-reverse', 'row']}
          width="100%"
          maxWidth="960px"
          justifyContent="space-between"
        >
          <Flex centered flexDirection="row-reverse">
            <TextField
              p={2}
              id="search-bags"
              name="search-bags"
              placeholder="123,456"
              value={searchFilter}
              onChange={handleSearchChange}
            />

            <Tooltip id="tt-searchBags" content="Search by Token ID">
              <Icon
                as="label"
                fontSize="2em"
                icon="search"
                prefix="ic"
                htmlFor="search-bags"
                mr={3}
              />
            </Tooltip>
          </Flex>

          <Flex
            flexDirection={['column', 'row']}
            alignItems={['flex-start', 'center']}
            mb={[2, 0]}
          >
            {(searchFilter !== '' || filter !== 'all') && (
              <TextButton mr={3} onClick={resetFilters}>
                clear
              </TextButton>
            )}

            <Dropdown
              value={filter}
              onChange={handleFilterChange}
              options={[
                {
                  label: 'All Bags',
                  value: 'all',
                },
                {
                  label: 'Loot Bags',
                  value: BAG_TYPES.LOOT,
                },
                {
                  label: 'MLoot Bags',
                  value: BAG_TYPES.MLOOT,
                },
                {
                  label: 'GLoot Bags',
                  value: BAG_TYPES.GLOOT,
                },
              ]}
            />
          </Flex>
        </Flex>
      )}

      {filteredBags.length > 0 ? (
        <Bag
          bagId={filteredBags[selectedBagIndex]}
          bagView={bagView}
          imageMap={imageMap}
          setBagView={setBagView}
        />
      ) : (
        <P my={6}>Unable to find loot matching the current filter(s)</P>
      )}

      {bagView === VIEWS.DEFAULT && bags.length > 1 && (
        <Flex
          mt={3}
          width="100%"
          maxWidth="960px"
          justifyContent={
            (searchFilter !== '' || filter !== 'all') &&
            filteredBags.length <= 1
              ? 'center'
              : 'space-between'
          }
        >
          {filteredBags.length > 1 && (
            <TextButton
              onClick={() =>
                setSelectedBagIndex(
                  selectedBagIndex - 1 < 0
                    ? filteredBags.length - 1
                    : selectedBagIndex - 1,
                )
              }
            >
              <Icon fontSize={6} icon="rewind" prefix="ic" />
            </TextButton>
          )}

          <Flex centered flexDirection="column" mt={2} fontSize={5}>
            {filteredBags.length > 1 &&
              `${selectedBagIndex + 1} / ${filteredBags.length}`}
          </Flex>

          {filteredBags.length > 1 && (
            <TextButton
              onClick={() =>
                setSelectedBagIndex(
                  selectedBagIndex + 1 >= filteredBags.length
                    ? 0
                    : selectedBagIndex + 1,
                )
              }
            >
              <Icon fontSize={6} icon="forward" prefix="ic" />
            </TextButton>
          )}
        </Flex>
      )}
    </Container>
  );
}

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;

export const Container = styled(Flex)`
  animation: ${fadeIn} 1s linear 1;
`;

export const Sidebar = styled(Flex)`
  ${dialogBorder()}
`;
