import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FirstMint from 'RiftApp/FirstMint';
import { useRiftState } from 'riftState';
import helpers from 'utils/helpers';

import Dialog from 'components/Dialog';
import DialogSelect from 'components/DialogSelect';
import DialogStack from 'components/DialogStack';
import { P } from 'components/common/Text';
import { TextButton } from 'components/common/Buttons';
import Box from 'components/common/Box';
import { CoolBox } from 'RiftApp/Bag/components';

const WELCOME_TEXT =
  'Welcome adventurer, you must have heard the Rift calling.... Are you ready to start your journey?';

// const RIFT_INTRO =
//   'You get the feeling that you should ';

/* eslint-disable */
const sectionProps = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func,
};
/* eslint-enable */
function Section1({ next }) {
  const actions = [
    {
      label: 'Yes',
      onSelect: () => {
        next();
      },
    },
    {
      label: 'No',
      onSelect: () => {
        window.location = 'https://www.lootproject.com/';
      },
    },
  ];
  return <Dialog messages={[{ message: WELCOME_TEXT, actions }]} />;
}

Section1.propTypes = sectionProps;

// eslint-disable-next-line react/prop-types
function Section2({ bags, next, setSelectedBag }) {
  // eslint-disable-next-line react/prop-types
  const loots = bags.map((bagId) => {
    return { label: helpers.displayBag(bagId), value: bagId };
  });

  return (
    <DialogSelect
      onSelect={(value) => {
        setSelectedBag(value);
        next();
      }}
      title="Select a Bag:"
      items={loots}
    />
  );
}

Section2.propTypes = sectionProps;

function Section3({ next: nextDialog, prev }) {
  const handleEnd = () => nextDialog();
  const handleNext = (_, { next }) => {
    next();
  };

  const text =
    "Ever since you first picked up that bag, you've felt drawn to this place. Now you see what's beckoning you, a chaotic rip in reality. You're struck with pure fear, and yet you cannot help but step towards it.";
  const sentences = text.split('. ').map((sentence) => `${sentence}.`);

  return (
    <>
      <TextButton onClick={() => prev()}>Back</TextButton>
      <Dialog
        messages={sentences.map((msg, i) => ({
          message: msg,
          actions: [
            {
              label: 'Next',
              onSelect: i === sentences.length - 1 ? handleEnd : handleNext,
            },
          ],
        }))}
      />
    </>
  );
}

Section3.propTypes = sectionProps;

function Section4({ next, prev, selectedBag: bagId }) {
  return (
    <>
      <Box maxWidth="400px" mx="auto" mb={1}>
        <TextButton onClick={() => prev()}>Back</TextButton>
      </Box>

      <CoolBox mb={4} mx="auto" maxWidth="400px" p={3} flexDirection="column">
        <FirstMint bagId={bagId} />
      </CoolBox>

      <DialogSelect
        onSelect={() => next()}
        items={[{ label: 'Enter the Rift', value: 'enter' }]}
      />
    </>
  );
}

Section4.propTypes = {
  ...sectionProps,
  selectedBag: PropTypes.string.isRequired,
};

function Section5({ prev, handleMint, confirmed, error }) {
  const text = 'Attuning Bag...';

  useEffect(() => {
    handleMint();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {error && <TextButton onClick={() => prev()}>Back</TextButton>}
      <Dialog
        messages={[{ message: text, actions: [] }]}
        options={{ endDelay: 100000000 }}
      />
      <P
        as="p"
        className="system"
        textAlign="right"
        color={error ? 'red' : undefined}
      >
        {error ||
          (confirmed
            ? 'Transaction pending'
            : 'Awaiting approval from wallet.')}
      </P>
    </>
  );
}

Section5.propTypes = {
  ...sectionProps,
  handleMint: PropTypes.func.isRequired,
};

const sections = [
  { id: 'section-1', message: Section1 },
  { id: 'section-2', message: Section2 },
  { id: 'section-3', message: Section3 },
  { id: 'section-4', message: Section4 },
  { id: 'section-5', message: Section5 },
];

/* eslint-disable-next-line */
export default function Intro({ onEnd }) {
  const [selectedBag, setSelectedBag] = useState('');
  const { account, bags, crystalsContract } = useRiftState();
  const [minting, setMinting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  const handleEnd = async () => {
    setError('');
    crystalsContract.crystals.on(
      crystalsContract.crystals.filters.Transfer(),
      () => {
        onEnd(selectedBag);
      },
    );

    setMinting(true);

    crystalsContract
      .firstMint(account, selectedBag)
      .then(() => {
        setError('');
        setConfirmed(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <DialogStack
      bags={bags}
      dialogs={sections}
      error={error}
      handleMint={handleEnd}
      minting={minting}
      confirmed={confirmed}
      selectedBag={selectedBag}
      setSelectedBag={setSelectedBag}
    />
  );
}
