import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import { RiPlayFill, RiPauseFill } from 'react-icons/ri';
import { togglePlay } from '../../app/store/actions/playerActions';
interface Props {}

const CurrentlyPlayingFooter = (props: Props) => {
  const { player } = useSelector((state: RootState) => ({
    player: state.player,
  }));

  if (!player.current?.title || !player.current?.artist) {
    return <HStack minH="30px" spacing={4} />;
  }
  return (
    <HStack minH="30px" spacing={4}>
      <IconButton
        aria-label="play/pause"
        isRound
        icon={player.playing ? <RiPauseFill /> : <RiPlayFill />}
        onClick={togglePlay}
      />
      <Text>{`${player.current?.title} - ${player.current?.artist} `}</Text>
    </HStack>
  );
};

export default CurrentlyPlayingFooter;
