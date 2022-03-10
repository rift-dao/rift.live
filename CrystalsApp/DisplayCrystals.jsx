import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from 'theme';

import Box, { Flex } from 'components/common/Box';

import { Bar } from 'components/ProgressBar';
import Crystal from './Crystal';

function DisplayCrystals({ crystals, onClick, ...rest }) {
  return (
    <>
      <Flex flexWrap="wrap" flex={1} mx={[-1, -2]} {...rest}>
        {crystals.map((crystal) => {
          return (
            <Button
              key={crystal.id}
              onClick={(e) => onClick(crystal.id, e)}
              mx={[1, 2]}
              my={2}
              width={['calc(100% - 8px)', 'calc(50% - 20px)']}
              crystalColor={crystal.color}
            >
              <Crystal crystal={crystal} />
            </Button>
          );
        })}
      </Flex>
    </>
  );
}

DisplayCrystals.propTypes = {
  crystals: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClick: PropTypes.func,
};

DisplayCrystals.defaultProps = {
  onClick: () => {},
};

export default DisplayCrystals;

export const Button = styled(Box).attrs({ as: 'button' })`
  background: none;
  border: 1px solid transparent;
  border-radius: ${styles.defaultStyles.borderRadius};
  text-align: unset;
  color: unset;
  font-family: unset;
  padding: 0;
  font-size: unset;
  cursor: pointer;

  &:hover {
    /* text-shadow: 1px 1px 2px #fffa; */
    border: 1px solid ${(p) => p.crystalColor};
    box-shadow: inset 0 0 2px 0 ${(p) => p.crystalColor},
      0 0 3px ${(p) => p.crystalColor};

    .cc {
      /* text-shadow: 1px 1px 2px ${(p) => p.crystalColor}; */
    }

    ${Bar}::after {
      box-shadow: 0 0 3px ${(p) => p.crystalColor};
    }
  }
`;
