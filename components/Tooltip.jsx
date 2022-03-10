import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ReactTooltip from 'react-tooltip';
import { fonts } from 'utils/styles';
import { Flex } from './common/Box';
import Text from './common/Text';
import { TextButton } from './common/Buttons';

function Tooltip({
  children,
  container,
  content,
  labelProps,
  id,
  wrapLabel,
  ...rest
}) {
  const props = {
    role: 'tooltip',
    id,
    place: 'bottom',
    effect: 'solid',
    offset: { bottom: 10 },
  };
  return (
    <>
      {wrapLabel ? (
        <span
          style={{ alignSelf: 'flex-start' }}
          tabIndex={0}
          data-tip
          data-for={id}
          role="button"
          aria-describedby={id}
          {...labelProps}
        >
          {children}
        </span>
      ) : (
        children
      )}

      {container &&
        ReactDOM.createPortal(
          <ReactTooltip {...props} {...rest}>
            {content}
          </ReactTooltip>,
          container,
        )}

      {!container && (
        <ReactTooltip {...props} {...rest}>
          {content}
        </ReactTooltip>
      )}
    </>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.any, // eslint-disable-line
  content: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  labelProps: PropTypes.shape({}),
  wrapLabel: PropTypes.bool,
};

Tooltip.defaultProps = {
  container: null,
  labelProps: {},
  wrapLabel: true,
};

export default Tooltip;

// eslint-disable-next-line react/prop-types
export const TermTooltip = ({ term, definition, url, ...rest }) => {
  return (
    <Tooltip
      delayShow={url?.length > 0 ? 250 : 150}
      delayHide={url?.length > 0 ? 250 : 150}
      clickable={url?.length > 0}
      content={
        <Flex
          fontSize="1.2em"
          textAlign="left"
          maxWidth="230px"
          flexDirection="column"
        >
          <Text fontFamily={fonts.mono}>
            <strong>{term}</strong> - {definition}
          </Text>

          {url && (
            <TextButton
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="1em"
              href={url}
            >
              read more
            </TextButton>
          )}
        </Flex>
      }
      {...rest}
    />
  );
};

TermTooltip.propTypes = {
  url: PropTypes.string,
};

TermTooltip.defaultProps = {
  url: '',
};
