import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { VStack, Box, Text, Button, Heading } from '@chakra-ui/react';
import { setSongIndex } from '../../app/store/actions/playerActions';
import { Grid, GridItem } from '@chakra-ui/react';
import QueueSongBox from './QueueSongBox';
import './queue-table.scss';
interface Props {
  onClose: () => void;
}

const QueueTable = (props: Props) => {
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
  }));

  const handlePickSong = (i: number) => {
    const newSongIndex = player.songIndex + i;
    setSongIndex(newSongIndex);
    props.onClose();
  };

  return (
    <div>
      <VStack
        fontSize="sm"
        className="queue-vstack"
        alignItems="flex-start"
        spacing={0}
      >
        {player.queue
          .slice(player.songIndex, player.songIndex + 50)
          .map((song, i) => {
            if (i === 0) {
              return (
                <VStack spacing={4} mb={4} alignItems="flex-start">
                  <Heading size="sm">Now Playing: </Heading>
                  <Box key={i} bg="blackAlpha.300" p={4}>
                    <Text>{song}</Text>
                  </Box>
                  <Heading size="sm">Next Up: </Heading>
                </VStack>
              );
            }

            return (
              <>
                <QueueSongBox
                  key={song}
                  i={i}
                  song={song}
                  onPickSong={handlePickSong}
                />
              </>
            );
          })}
      </VStack>
    </div>
  );
};

export default QueueTable;
