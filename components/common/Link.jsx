import NextLink from 'next/link';
import PropTypes from 'prop-types';

function Link({ LinkElem, children, href, ...rest }) {
  return (
    <NextLink href={href}>
      <LinkElem as="a" href={href} {...rest}>
        {children}
      </LinkElem>
    </NextLink>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  LinkElem: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};

Link.defaultProps = {
  LinkElem: 'a',
};

export default Link;
