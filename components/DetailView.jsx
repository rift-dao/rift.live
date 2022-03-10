import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from './common/Box';
import { CoolBox } from '../RiftApp/Bag/components';
import DialogSelect from './DialogSelect';

// eslint-disable-next-line react/prop-types
function DetailView({
  actions,
  actionView,
  children,
  primaryView,
  secondaryView,
  ...rest
}) {
  return (
    <>
      <Flex
        gridGap={4}
        justifyContent="center"
        width="100%"
        maxWidth="960px"
        mt={4}
        flexWrap={['wrap', 'wrap', 'nowrap']}
        {...rest}
      >
        <Flex
          alignSelf="flex-start"
          flex={1}
          flexDirection="column"
          flexBasis={['100%', '100%', 'unset']}
          width={['100%', '100%', 'auto']}
        >
          {children}
          <CoolBox flex={1} py={2} px={3} flexDirection="column" zIndex={1}>
            {primaryView}
          </CoolBox>

          {actionView ||
            (actions.length > 0 && (
              <DialogSelect
                mt={[2, 3]}
                maxWidth="100%"
                items={actions}
                itemProps={{
                  fontSize: ['1em', '1.2em'],
                  textAlign: 'left',
                }}
              />
            ))}
        </Flex>

        <Flex
          flexBreak={[true, true, false]}
          flexDirection="column"
          flexBasis={['100%', '367px', '367px']}
          flexShrink={0}
        >
          {secondaryView}
        </Flex>
      </Flex>
    </>
  );
}

DetailView.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  actionView: PropTypes.func,
  children: PropTypes.node,
  primaryView: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  secondaryView: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
};

DetailView.defaultProps = {
  actions: [],
  actionView: null,
  children: null,
};

export default DetailView;
