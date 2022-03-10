import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import helpers from 'utils/helpers';
import { dialogBorder } from 'utils/styles';
import { customBlink, hover } from 'utils/animations';

import { Flex } from 'components/common/Box';
import { SolidButton, TextButton } from 'components/common/Buttons';
import { useState } from 'react';
import { H2 } from 'components/common/Text';
import { TermTooltip } from 'components/Tooltip';

let key = 0;
export default function DialogSelect({
  items,
  itemProps,
  onSelect,
  title,
  ...rest
}) {
  const maxPerPage = 8;
  const numOfPages = Math.ceil(items.length / maxPerPage);

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <DialogSelectContainer {...rest}>
      {title && (
        <H2 mb={3} textAlign="center">
          {title}
        </H2>
      )}
      {items
        .filter(
          (_, index) =>
            index < (currentPage + 1) * maxPerPage &&
            index >= currentPage * maxPerPage,
        )
        .map((item) =>
          item.props?.tooltip ? (
            <TermTooltip
              clickable
              key={key++}
              definition={item.props?.tooltip}
              term={helpers.capitalize(item.value)}
              url={item.props?.tooltipUrl}
              id={`tt-select-${item.value}`}
            >
              <DialogSelectItem
                onClick={() => onSelect(item.value)}
                {...itemProps}
                {...(item.props || {})}
              >
                {item.label}
              </DialogSelectItem>
            </TermTooltip>
          ) : (
            <DialogSelectItem
              key={key++}
              onClick={() => onSelect(item.value)}
              {...itemProps}
              {...(item.props || {})}
            >
              {item.label}
            </DialogSelectItem>
          ),
        )}

      {numOfPages > 1 && (
        <PaginateContainer
          mt={4}
          alignItems="center"
          justifyContent="space-between"
          pl={3}
        >
          {currentPage !== 0 && (
            <SolidButton
              mr="auto"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              back
            </SolidButton>
          )}

          {currentPage + 1 < numOfPages && (
            <SolidButton
              ml="auto"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              next
            </SolidButton>
          )}
        </PaginateContainer>
      )}
    </DialogSelectContainer>
  );
}

DialogSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  itemProps: PropTypes.shape({}),
  onSelect: PropTypes.func,
  title: PropTypes.string,
};

DialogSelect.defaultProps = {
  items: [],
  itemProps: {},
  onSelect: () => {},
  title: '',
};

export const PaginateContainer = styled(Flex)`
  ${SolidButton} {
    padding: 2px 8px;
  }
`;

export const DialogSelectContainer = styled(Flex)(() => ({
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const DialogSelectItem = styled(TextButton)`
  /* ${dialogBorder()} */
  text-align: ${(p) => p.textAlign || 'center'};
  font-weight: 900;
  letter-spacing: 0.075em;
  padding-left: 30px;
  justify-self: center;
  align-self: ${(p) => (p.alignSelf ? p.alignSelf : 'center')};
  margin-left: ${(p) =>
    typeof p.marginLeft !== 'undefined' ? p.marginLeft : '-15px'};

  && {
    border: none;
    outline: none;
  }

  &:not(:disabled)::before {
    content: '◈';
    margin-left: -30px;
    opacity: 0;
    position: absolute;

    ${(p) =>
      p.displayCursor
        ? css`
            opacity: 1;
            animation: ${hover} 6s ease-in-out infinite,
              ${customBlink({ min: 0.85 })} 3s linear infinite;
          `
        : ''}
  }

  &:not(:disabled):hover::before,
  &:not(:disabled):focus::before {
    animation: ${hover} 6s ease-in-out infinite,
      ${customBlink({ min: 0.85 })} 3s linear infinite;
  }
`;
