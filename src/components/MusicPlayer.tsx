import {
  VStack,
  Image,
  Box,
  AspectRatio,
  Heading,
  Flex,
  Spacer,
  Text,
  HStack,
  Grid,
  Progress,
} from '@chakra-ui/react';
import React from 'react';
interface MusicDetailPropT {
  detail: string;
  detailData: string;
}

const MusicDetailRow = (props: MusicDetailPropT) => {
  const { detail, detailData } = props;
  return (
    <>
      <Text className="player-details-type">{detail}</Text>
      <Heading size="3xl">{detailData}</Heading>
    </>
  );
};

interface Props {}

const MusicPlayer = (props: Props) => {
  return (
    <HStack spacing={16}>
      <AspectRatio minW="100px" w="400px" ratio={1}>
        <Image
          className="rounded"
          src="https://f4.bcbits.com/img/a2312567325_10.jpg"
        />
      </AspectRatio>

      {/* <VStack alignItems="flex-start" spacing={-1} h="100%">
        <Heading size="3xl">B L A C K - R A Y </Heading>
        <Text fontSize="3xl">Song Artist</Text>
        <Text fontSize="3xl">Album Name</Text>
      </VStack> */}

      <VStack alignItems="flex-start" flexGrow={1}>
        <Grid
          className="player-details-grid"
          templateColumns="75px 1fr"
          w="100%"
        >
          <Text className="player-details-type">title</Text>
          <Heading
            size="3xl"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            B L A C K - R A Y
          </Heading>
          <Text className="player-details-type">artist</Text>
          <Text fontSize="2xl">Camellia</Text>
          <Text className="player-details-type">album</Text>
          <Text fontSize="2xl">Album Name</Text>
          <Text className="player-details-type">length</Text>
          <Text fontSize="2xl" text>
            3:24
          </Text>
          {/* <MusicDetailRow detail="title" detailData="BlackRay" /> */}
        </Grid>
        <Spacer />

        <VStack alignItems="flex-start" width="100%">
          <Progress className="rounded" value={50} width="25%" size="xs" />
          <Text>0:25</Text>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default MusicPlayer;
