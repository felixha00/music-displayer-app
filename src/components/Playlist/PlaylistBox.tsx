import {
  Box,
  AspectRatio,
  Image,
  Text,
  Stack,
  Spacer,
  Flex,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { WhiteIconAlbum } from '../../assets/ImageImports';
import { space } from '../../theme/theme';

interface Props {
  name: string;
  path: string;
  //onPlaylistClick: (path: string) => void;
}

const PlaylistBox = (props: Props) => {
  const { name, path } = props;

  // const handlePlaylistClick = () => {
  //   props.onPlaylistClick(path);
  // };

  return (
    <Stack
      spacing={0}
      // onClick={handlePlaylistClick}
      className="rounded"
      border="1px solid"
      borderColor="whiteAlpha.50"
      bg="whiteAlpha.50"
      boxShadow="xl"
      h="100%"
    >
      <AspectRatio ratio={1}>
        <Image
          className="rounded"
          src={WhiteIconAlbum}
          borderBottomRadius="0px"
        />
      </AspectRatio>
      <Spacer />
      <Box p={space}>
        <Text>{name}</Text>
      </Box>
    </Stack>
  );
};

export default PlaylistBox;
