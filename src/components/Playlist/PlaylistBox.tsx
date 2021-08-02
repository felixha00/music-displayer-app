import { Box, AspectRatio, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { WhiteIconAlbum } from '../../assets/ImageImports';

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
    <Box
      // onClick={handlePlaylistClick}
      className="rounded"
      border="1px solid"
      borderColor="whiteAlpha.50"
      bg="whiteAlpha.50"
      boxShadow="xl"
    >
      <AspectRatio ratio={1}>
        <Image
          className="rounded"
          src={WhiteIconAlbum}
          borderBottomRadius="0px"
        />
      </AspectRatio>
      <Box p={4}>
        <Text>{name}</Text>
      </Box>
    </Box>
  );
};

export default PlaylistBox;
