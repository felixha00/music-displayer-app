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
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import {
  RiHeadphoneLine,
  RiUserVoiceLine,
  RiAlbumLine,
  RiTimerLine,
} from 'react-icons/ri';
import ActionTypes from '../app/store/actionTypes';
import store from '../app/store/store';
import { getMetadata } from '../utils/file';
import { msToMMSS } from '../utils/time';

interface IObjectKeys {
  [key: string]: string | number;
}

const sampleData: IObjectKeys = {
  title: 'BLEED-BLOOD',
  artist: 'かめるか',
  album: 'Blackmagik Blazing',
  length: 92888,
};

const musicDetailSchema = [
  { text: 'title', icon: RiHeadphoneLine },
  { text: 'artist', icon: RiUserVoiceLine },
  { text: 'album', icon: RiAlbumLine },
  { text: 'length', icon: RiTimerLine },
];

interface MusicDetailCellPropT {
  text: string;
  icon: IconType;
}

const MusicDetailCell = (props: MusicDetailCellPropT) => {
  const { text, icon } = props;
  return (
    <HStack alignItems="center" opacity={0.85} spacing={1}>
      <Icon as={icon} />
      <Text className="player-details-type">{text}</Text>
    </HStack>
  );
};

interface Props {}

const MusicPlayer = (props: Props) => {
  const { player } = store.getState();
  React.useEffect(() => {
    const getSong = async () => {
      const metadata = await getMetadata('');
      store.dispatch({ type: ActionTypes.PLAYER_SET_SONG, payload: metadata });
    };
    getSong();
  });

  return (
    <HStack spacing={16} alignItems="flex-start">
      <AspectRatio minW="100px" w="400px" ratio={1}>
        <Image className="rounded" src={player.current['image']} />
      </AspectRatio>
      <VStack alignItems="flex-start" flexGrow={1}>
        <VStack alignItems="flex-start" width="100%">
          <Progress
            className="rounded"
            value={4555 / 30000}
            width="100%"
            size="xs"
          />

          <Text fontSize="sm">0:25</Text>
        </VStack>
        <Grid
          className="player-details-grid"
          templateColumns="100px 1fr"
          w="100%"
        >
          {musicDetailSchema.map((detail) => {
            const { text, icon } = detail;
            let dataText = '';

            switch (text) {
              case 'length':
                dataText = msToMMSS(+player.current[text]);
                break;
              default:
                dataText = player.current[text];
                break;
            }
            return (
              <>
                <MusicDetailCell key={text} text={text} icon={icon} />
                {text === 'title' ? (
                  <Heading paddingTop={4} paddingBottom={4} size="4xl">
                    {dataText}
                  </Heading>
                ) : (
                  <Text opacity={0.85} fontSize="2xl">
                    {dataText}
                  </Text>
                )}
              </>
            );
          })}
        </Grid>
        <Spacer />
      </VStack>
    </HStack>
  );
};

export default MusicPlayer;
