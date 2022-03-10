import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useDialog from 'hooks/useDialog';

function DialogStack({ dialogs, onEnd, ...rest }) {
  const {
    activeMessageIndex,
    message: View,
    nextMessage: nextDialog,
    prevMessage: prevDialog,
    dialogEnded,
  } = useDialog(dialogs);

  useEffect(() => {
    if (dialogEnded) {
      onEnd();
    }
  }, [dialogEnded, onEnd]);

  return (
    // <h1>hi</h1>
    <View
      key={dialogs[activeMessageIndex].id}
      next={nextDialog}
      prev={prevDialog}
      {...rest}
    />
  );
}

DialogStack.propTypes = {
  dialogs: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired }),
  ).isRequired,
  onEnd: PropTypes.func,
};

DialogStack.defaultProps = {
  onEnd: () => {},
};

export default DialogStack;
