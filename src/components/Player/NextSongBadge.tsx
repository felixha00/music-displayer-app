import {
  AspectRatio,
  Badge,
  Box,
  CircularProgress,
  HStack,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { usePalette } from 'react-palette';
import { useSelector } from 'react-redux';
import {
  combineQueues,
  setNextSong,
} from '../../app/store/actions/playerActions';
import { RootState } from '../../app/store/store';
import { usePrevious } from '../../utils/hooks';
import './next-song-badge.scss';

const NextSongBadge = () => {
  const { next, queue, priorityQueue, enableShowNext } = useSelector(
    (state: RootState) => ({
      next: state.player.next,
      queue: state.player.queue,
      priorityQueue: state.player.priorityQueue,
      enableShowNext: state.settings.config.enableShowNext,
    })
  );

  useEffect(() => {
    const q = [...priorityQueue, ...queue];
    // Check if next song is not set, if it isnt, set it

    if (q[0]) {
      setNextSong(q[0]);
    }
    setNextSong();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priorityQueue[0], queue[0]]);
  const { data } = usePalette(next?.image || '');

  if (!enableShowNext) {
    return null;
  }
  return (
    <Box
      w="100%"
      className="player-next-song-badge rounded"
      bg="blackAlpha.400"
      backdropFilter="blur(5px)"
      boxShadow="xl"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      <HStack justifyContent="flex-end" alignItems="flex-start" p={2}>
        <Badge
          size="md"
          w="50px"
          bg="transparent"
          color={!next ? 'white' : data.lightVibrant}
        >
          Next <span className="player-next-song-badge-arrow">-&gt;</span>
        </Badge>
        <Spacer />

        {next ? (
          <Box display="flex" alignItems="center">
            <Text textAlign="right" fontSize="xs" ml={2}>
              <span style={{ fontWeight: 'bold' }}>{next?.title}</span> by{' '}
              {next?.artist}, on{' '}
              <span
                style={{ color: `${data.lightVibrant}`, fontWeight: 'bold' }}
              >
                {next?.album}
              </span>
            </Text>
          </Box>
        ) : (
          <CircularProgress isIndeterminate size={4} color="white" />
        )}
      </HStack>
    </Box>
  );
};

export default NextSongBadge;
