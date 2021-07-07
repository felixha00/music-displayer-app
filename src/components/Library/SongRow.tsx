import React from 'react';
import { ISong } from '../../utils/types';
import { Box, Text } from '@chakra-ui/react';
interface Props {
  song: ISong;
}

const SongRow = (props: Props) => {
  const { song } = props;
  return (
    <Box>
      <Text>{song.title}</Text>
    </Box>
  );
};

export default SongRow;
