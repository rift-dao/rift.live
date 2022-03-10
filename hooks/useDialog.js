import { useCallback, useState } from 'react';

function useDialog(messages) {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [messageEnded, setMessageEnded] = useState(false);
  const [dialogEnded, setDialogEnded] = useState(false);

  const nextMessage = useCallback(() => {
    if (activeMessageIndex < messages.length - 1) {
      setActiveMessageIndex(activeMessageIndex + 1);
    } else {
      setDialogEnded(true);
    }
    setTimeout(() => {
      setMessageEnded(false);
    });
  }, [activeMessageIndex, messages.length]);

  const prevMessage = useCallback(() => {
    if (activeMessageIndex > 0) {
      setActiveMessageIndex(activeMessageIndex - 1);
    }
  }, [activeMessageIndex]);

  return {
    message: messages[activeMessageIndex].message,
    actions: messages[activeMessageIndex].actions || [],
    activeMessageIndex,
    setActiveMessageIndex,
    messageEnded,
    setMessageEnded,
    dialogEnded,
    setDialogEnded,
    nextMessage,
    prevMessage,
  };
}

export default useDialog;
