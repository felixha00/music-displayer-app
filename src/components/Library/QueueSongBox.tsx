import { Grid, Button, Box } from '@chakra-ui/react';
import React, { useCallback } from 'react';

interface Props {
  i: number;
  song: string;
  onPickSong: (i: number) => void;
}

const QueueSongBox = (props: Props) => {
  const { i, song } = props;

  const handlePickSong = useCallback(() => {
    props.onPickSong(i);
  }, [i, props]);

  return (
    <Grid
      alignItems="center"
      templateColumns="25px 1fr"
      _hover={{ bg: 'whiteAlpha.100', cursor: 'pointer' }}
      onClick={handlePickSong}
      p={2}
      pr={4}
      pl={4}
    >
      <Box color="whiteAlpha.500">{i}</Box>
      <Button
        size="sm"
        textOverflow="ellipsis"
        overflow="hidden"
        className="queue-next-song-btn"
        fontWeight="normal"
        variant="unstyled"
        whiteSpace="nowrap"
        aria-label={song}
      >
        {song}
      </Button>
    </Grid>
  );
};

export default QueueSongBox;
