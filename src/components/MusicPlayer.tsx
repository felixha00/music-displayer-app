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
  Button,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import {
  RiHeadphoneLine,
  RiUserVoiceLine,
  RiAlbumLine,
  RiTimerLine,
  RiSkipForwardMiniFill,
  RiSkipBackMiniFill,
  RiPauseMiniFill,
  RiPlayMiniFill,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import ActionTypes from '../app/store/actionTypes';
import store, { RootState } from '../app/store/store';
import { getMetadata } from '../utils/file';
import { msToMMSS, sToMMSS } from '../utils/time';
import { setPalette, setSong } from '../app/store/actions/playerActions';
import useImageColor from 'use-image-color';
import { PaletteColors, usePalette } from 'react-palette';
import ReactAudioPlayer from 'react-audio-player';
import Visualizer from './Visualizer/Visualizer';
import AudioSpectrum from 'react-audio-spectrum';
interface IObjectKeys {
  [key: string]: string | number;
}

// const sampleData: IObjectKeys = {
//   title: 'BLEED-BLOOD',
//   artist: 'かめるか',
//   album: 'Blackmagik Blazing',
//   length: 92888,
// };

const sampleQueue = [
  'La Grand Bleu - KIEN.mp3',
  '高音質Ringed Genesis - EdelritterArcaea.mp3',
  'goreshit - semantic compositions on death and its meaning - 01 the nature of dying.mp3',
  't+pazolite feat. ななひら - Party in the HOLLOWood (HOLLOWeen Sitchaka Metchaka Remix).mp3',
  'S3RL-Addict-DJKurara-Remix-81421751.mp3',
  'OUTERHEAVEN.mp3',
  '01 Crystal Gravity.mp3',
  `【BOFXVI】Angel's Salad【BGA】.mp3`,
  `【SDVX】 Diceros Bicornis － ЯeviveR 【NOFX】.mp3`,
  `(音源) [SDVX] †_OLPHEUX_† [NOFX].mp3`,
  `deleteafterlul.mp3`,
];

const musicDetailSchema = [
  { text: 'title', icon: RiHeadphoneLine },
  { text: 'artist', icon: RiUserVoiceLine },
  { text: 'album', icon: RiAlbumLine },
  { text: 'length', icon: RiTimerLine },
];

interface MusicDetailCellPropT {
  text: string;
  icon: IconType;
  textColor: string | undefined;
}

const MusicDetailCell = (props: MusicDetailCellPropT) => {
  const { text, icon, textColor } = props;
  return (
    <HStack alignItems="center" spacing={1}>
      <Icon as={icon} color={textColor ? textColor : 'white'} />
      <Text className="player-details-type">{text}</Text>
    </HStack>
  );
};

interface Props {}

const MusicPlayer = (props: Props) => {
  const dispatch = useDispatch();

  const [time, setTime] = React.useState(0);
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));

  // const { colors } = useImageColor(player.current.image, {
  //   cors: true,
  //   colors: 5,
  // });

  const { data, loading, error } = usePalette(player.current.image);
  const [iter, setIter] = React.useState(0);

  React.useEffect(() => {
    setSong(sampleQueue[iter]);
  }, [iter]);

  React.useEffect(() => {
    setPalette(data);
  }, [data]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (time >= player.current.length) {
        setIter(iter + 1);
        setTime(0);
      } else {
        setTime(time + 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  React.useEffect(() => {
    setTime(0);
  }, [iter]);
  // store.subscribe(() => {
  //   const { player } = store.getState();
  //   setPlayerState(player);
  // });

  const renderAudioWithSpectrum = React.useCallback(() => {
    if (!data) {
      return null;
    }
    return (
      <>
        <ReactAudioPlayer
          id="audio-elem"
          src={`D:/Songs/${sampleQueue[iter]}`}
          volume={0.2}
          autoPlay
        />
        <AudioSpectrum
          id="audio-canvas"
          height={150}
          width={300}
          audioId="audio-elem"
          capColor={'transparent'}
          capHeight={2}
          meterWidth={2}
          meterCount={512}
          meterColor={[
            { stop: 0, color: data.lightVibrant },
            { stop: 0.5, color: data.lightVibrant },
            { stop: 1, color: data.lightVibrant },
          ]}
          gap={8}
        />
      </>
    );
  }, [data]);
  const handlePlayPause = () => {};

  const handleNext = () => {
    setIter(iter + 1);
  };

  const handlePrev = () => {
    setIter(iter - 1);
  };

  return (
    <>
      <Grid gridTemplateColumns="min-content 1fr" gap={8}>
        <VStack spacing={8}>
          <AspectRatio minW="100px" w="400px" ratio={1}>
            <Image
              src={player.current.image}
              className="rounded"
              fallbackSrc={'https://via.placeholder.com/150'}
            />
          </AspectRatio>

          <Box
            className="player-control"
            bg={data ? player.palette.darkVibrant : 'black'}
            w="100%"
            padding={4}
            className="rounded"
          >
            <VStack alignItems="flex-start" width="100%">
              <Progress
                isAnimated
                className="rounded"
                value={(time / player.current.length) * 100}
                width="100%"
                size="xs"
                colorScheme="whiteAlpha"
              />
              <Text fontSize="sm">Elapsed: {sToMMSS(time)}</Text>
              {settings.config.enableControls && (
                <>
                  <ButtonGroup>
                    <IconButton
                      variant="ghost"
                      isRound
                      as={RiSkipBackMiniFill}
                      onClick={handlePrev}
                    />
                    <IconButton
                      isRound
                      color={player.palette.lightVibrant}
                      onClick={handlePlayPause}
                      as={RiPauseMiniFill}
                    />
                    <IconButton
                      isRound
                      variant="ghost"
                      as={RiSkipForwardMiniFill}
                      onClick={handleNext}
                    />
                  </ButtonGroup>
                </>
              )}
            </VStack>
          </Box>
        </VStack>

        <VStack alignSelf="flex-end" alignItems="flex-start" flexGrow={1}>
          <Grid
            className="player-details-grid"
            templateColumns="100px 1fr"
            w="100%"
          >
            <div />
            {renderAudioWithSpectrum()}
            {musicDetailSchema.map((detail) => {
              const { text, icon } = detail;
              let dataText = '';

              switch (text) {
                case 'length':
                  dataText = sToMMSS(+player.current[text]);
                  break;
                default:
                  dataText = player.current[text];
                  break;
              }
              return (
                <>
                  <MusicDetailCell
                    textColor={player.palette.lightVibrant}
                    key={text}
                    text={text}
                    icon={icon}
                  />
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
      </Grid>
    </>
  );
};

export default MusicPlayer;
