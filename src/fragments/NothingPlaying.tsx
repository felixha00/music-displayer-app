import { Box, VStack } from '@chakra-ui/layout';
import { Icon, Text, IconButton, Button, Tooltip } from '@chakra-ui/react';
import { ipcRenderer } from 'electron';
import React from 'react';
import { RiPlayListAddFill, RiAddFill } from 'react-icons/ri';

const NothingPlaying = () => {
  return (
    <Box className="flex-absolute-box" zIndex="1">
      <VStack spacing={8}>
        {/* <Icon boxSize={16} as={RiPlayListAddFill} />
        <Text textAlign="center">
          There&apos;s nothing in the queue. <br /> Pick something to play!
        </Text> */}
        {/* <Button
          onClick={() => ipcRenderer.send('pickSongFromDevice')}
          zIndex="1"
        >
          Pick Songs from your Device
        </Button> */}
        <Tooltip label="Pick Music">
          <IconButton
            isRound
            size="lg"
            w="100px"
            h="100px"
            fontSize="75px"
            aria-label="add"
            icon={<RiAddFill />}
            onClick={() => ipcRenderer.send('pickSongFromDevice')}
            zIndex="1"
          />
        </Tooltip>
      </VStack>
    </Box>
  );
};

export default NothingPlaying;
