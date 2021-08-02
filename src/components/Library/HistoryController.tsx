import { HStack } from '@chakra-ui/react';
import React from 'react';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useHistory } from 'react-router';
interface Props {}

const HistoryController = (props: Props) => {
  const hist = useHistory();

  const handleBack = () => {
    hist.goBack();
  };

  const handleFwd = () => {
    hist.goForward();
  };
  console.log(hist);
  return (
    <ButtonGroup>
      <IconButton
        isRound
        onClick={handleBack}
        aria-label="go-back"
        icon={<RiArrowLeftSLine />}
      />
      <IconButton
        isRound
        aria-label="go-forward"
        onClick={handleFwd}
        icon={<RiArrowRightSLine />}
      />
    </ButtonGroup>
  );
};

export default HistoryController;
