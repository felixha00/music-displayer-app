import { Grid, Button, Box, IconButton, ButtonGroup } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import path from 'path';
import GenerateCtxMenu from '../ContextMenus/GenerateCtxMenu';
import { ContextMenuTrigger } from 'react-contextmenu';
import { RiCloseFill, RiOrderPlayFill } from 'react-icons/ri';
interface Props {
  i: number;
  song: string;
  onPickSong: (i: number) => void;
}

const QueueSongBox = (props: Props) => {
  const { i, song } = props;

  const handlePickSong = useCallback(() => {
    props.onPickSong(i - 1);
  }, [i, props]);

  const handleCtxCollect = (data) => {
    console.log(data.props);
  };

  return (
    <ContextMenuTrigger id="queue" collect={handleCtxCollect} props={i}>
      <Grid
        alignItems="center"
        templateColumns=" minmax(min-content, min-content) 25px 1fr"
        _hover={{ bg: 'whiteAlpha.100', cursor: 'pointer' }}
        onClick={handlePickSong}
        gap={4}
        p={2}
      >
        <ButtonGroup spacing={0}>
          <IconButton
            aria-label="Reorder Song In Queue"
            icon={<RiOrderPlayFill />}
            variant="ghost"
            isRound
          />
          <IconButton
            aria-label="Remove Song from Queue"
            icon={<RiCloseFill />}
            variant="ghost"
            fontSize="18px"
            isRound
          />
        </ButtonGroup>

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
          {path.basename(song)}
        </Button>
      </Grid>
    </ContextMenuTrigger>
  );
};

export default QueueSongBox;
