import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { dialogBorder } from 'utils/styles';

import Box, { Flex } from 'components/common/Box';
import { TermTooltip } from 'components/Tooltip';

export const CoolBox = styled(Flex)`
  ${dialogBorder()}
`;

export const NotCoolBox = styled(Flex)`
  ${dialogBorder(true)}
`;

// const BIG = 6;
// const MED = 3;

export const Charge = ({ size, ...rest }) => {
  return (
    <StyledCharge size={size} {...rest}>
      ◈
    </StyledCharge>
  );
};

Charge.propTypes = {
  size: PropTypes.oneOf(['big', 'med', 'reg']),
};

Charge.defaultProps = {
  size: 'reg',
};

export const StyledCharge = styled(Box)`
  ${(p) => {
    if (p.size === 'big') {
      return css`
        color: white;
        text-shadow: 0 0 3px white, 0 0 10px white;
      `;
    }
    if (p.size === 'med') {
      return css`
        text-shadow: 0 0 0px white, 0 0 6px white;
      `;
    }
    return '';
  }}
  height: 1em;
  font-size: ${(p) => p.fontSize || '1em'};
  transition: all 0.13s;

  &:hover {
    /* cursor: default; */
    text-shadow: 0 0 2px white, 0 0 5px white;
  }

  ${(p) =>
    p.noHover
      ? `cursor: default; text-shadow: none; &:hover {
    text-shadow: none;
  }`
      : ''}
`;

let key = 0;
export const DisplayCharges = ({ charges }) => {
  // const {
  //   bigStack: charges10,
  //   normal: charges1,
  //   stack: charges5,
  // } = useMemo(() => {
  //   const bigStack = Math.floor(charges / BIG);
  //   const stack = Math.floor((charges - bigStack * BIG) / MED);
  //   const normal = charges - bigStack * BIG - stack * MED;

  //   return { bigStack, stack, normal };
  // }, [charges]);
  return (
    <>
      <Flex inline flexWrap="wrap" justifyContent="flex-end" fontSize="2em">
        {charges > 0 &&
          [...Array(charges)].map(() => (
            <TermTooltip
              clickable
              key={key++}
              id="tt-riftCharge"
              term="Rift Charge"
              definition="Concentrated energy from The Rift. Current uses: minting Crystals"
              url="https://the-rift.notion.site/Rift-Charges-Objects-990e4ef9ee9b426f92d9c3c82a3b36ce"
            >
              <Charge color="white" size="reg" />
            </TermTooltip>
          ))}
        {/* {charges10 > 0 &&
          [...Array(charges10)].map((index) => (
            <Charge size="big" title={`${BIG} Rift Charges`} key={index} />
          ))}
        {charges5 > 0 &&
          [...Array(charges5)].map((index) => (
            <Charge size="med" title={`${MED} Rift Charges`} key={index} />
          ))}
        {charges1 > 0 &&
          [...Array(charges1)].map((index) => (
            <Charge size="reg" title="Rift Charge" key={index} />
          ))} */}
      </Flex>
    </>
  );
};

DisplayCharges.propTypes = {
  charges: PropTypes.number.isRequired,
};
