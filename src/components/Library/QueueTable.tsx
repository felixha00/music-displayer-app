import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { VStack, Box, Text, Button, Heading } from '@chakra-ui/react';
import { moveQueueIndex } from '../../app/store/actions/playerActions';
import { Grid, GridItem } from '@chakra-ui/react';
import QueueSongBox from './QueueSongBox';
import './queue-table.scss';
import path from 'path';
import GenerateCtxMenu from '../ContextMenus/GenerateCtxMenu';
import { songInQueueCtxMenu } from '../ContextMenus/ctxMenuSchemas';
interface Props {
  onClose: () => void;
}

const QueueTable = (props: Props) => {
  const { player } = useSelector((state: RootState) => ({
    player: state.player,
  }));

  const handlePickSong = (i: number) => {
    console.log(i);
    // const newSongIndex = player.songIndex + i;
    // moveQueueIndex(newSongIndex);
  };

  const handleItemClick = (type, data) => {
    console.log('a', type, data);
  };

  return (
    <div>
      <VStack
        fontSize="sm"
        className="queue-vstack"
        alignItems="flex-start"
        spacing={0}
        w="100%"
      >
        <Heading size="sm" mb={4}>
          Next Up:
        </Heading>
        {player.queue.slice(0, 50).map((song, i) => {
          return (
            <>
              <QueueSongBox
                key={song}
                i={i + 1}
                song={song}
                onPickSong={handlePickSong}
              />
              <GenerateCtxMenu
                data={i}
                id="queue"
                menuItems={songInQueueCtxMenu}
                onItemClick={handleItemClick}
              />
            </>
          );
        })}
      </VStack>
    </div>
  );
};

export default QueueTable;
