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
import React, { useRef, useState } from 'react';
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
  RiTimerFlashLine,
  RiCalendarEventFill,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import useImageColor from 'use-image-color';
import { usePalette } from 'react-palette';
import ReactAudioPlayer from 'react-audio-player';
import ActionTypes from '../app/store/actionTypes';
import store, { RootState } from '../app/store/store';
import { sToMMSS } from '../utils/time';
import {
  setNextSong,
  setPalette,
  setSong,
  togglePlay,
} from '../app/store/actions/playerActions';
import Visualizer from './Visualizer/Visualizer';
import AudioSpectrum from 'react-audio-spectrum';
import NextSongBadge from './Player/NextSongBadge';
import PlaybackControl from './Player/PlaybackControl';

interface IObjectKeys {
  [key: string]: string | number;
}

const musicDetailSchema = [
  { text: 'title', icon: RiHeadphoneLine },
  { text: 'artist', icon: RiUserVoiceLine },
  { text: 'album', icon: RiAlbumLine },
  { text: 'length', icon: RiTimerLine },
  { text: 'bpm', icon: RiTimerFlashLine },
  { text: 'year', icon: RiCalendarEventFill },
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
      <Icon as={icon} color={textColor || 'white'} />
      <Text className="player-details-type">{text}</Text>
    </HStack>
  );
};

interface Props {}

const MusicPlayer = (props: Props) => {
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));

  const playerRef = useRef();
  const { data, loading, error } = usePalette(player.current.image);

  // STATES
  const [time, setTime] = useState(0);
  const [iter, setIter] = useState(0);
  const [vol, setVol] = useState(player.vol);

  React.useEffect(() => {
    setSong(player.queue[iter]);
    setNextSong(player.queue[iter + 1]);
  }, [player.queue, iter]);

  React.useEffect(() => {
    const { title } = player.current;
    if (!loading && title !== undefined) {
      setPalette(data);
    }
  }, [loading, player.current.title, data]);

  React.useEffect(() => {
    // const start = Date.now();
    // setInterval(function () {
    //   const delta = Date.now() - start; // milliseconds elapsed since start

    //   Math.floor(delta / 1000); // in seconds
    //   // alternatively just show wall clock time:

    // }, 1000); // update about every second
    const start = Date.now();
    const timer = setTimeout(() => {
      if (time >= player.current.length) {
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

  const handlePlayPause = () => {
    if (playerRef.current !== undefined) {
      if (player.playing) {
        playerRef.current.audioEl.current.pause();
      } else {
        playerRef.current.audioEl.current.play();
      }
      togglePlay();
    }
  };

  const handleNext = () => {
    setIter(iter + 1);
  };

  const handlePrev = () => {
    setIter(iter - 1);
  };

  const handleVolChange = (n) => {
    setVol(n);
  };

  // REACT-AUDIO-PLAYER

  const handleRAPEnded = () => {
    setIter(iter + 1);
  };

  const handleRAPListen = (t: number) => {
    setTime(t);
  };

  const handleRAPAbort = (e) => {
    setTime(0);
  };

  if (!player.queue) {
    return null;
  }

  return (
    <>
      <ReactAudioPlayer
        listenInterval={10000}
        id="audio-elem"
        src={`${player.queue[iter]}`}
        volume={vol}
        onEnded={handleRAPEnded}
        onListen={handleRAPListen}
        onAbort={handleRAPAbort}
        autoPlay={player.playing}
        ref={playerRef}
      />

      <Grid gridTemplateColumns="min-content 1fr" gap={16}>
        <VStack spacing={8} alignSelf="flex-end">
          <HStack alignSelf="flex-start" spacing={4}>
            {Object.keys(player.palette).map((key) => {
              return (
                <Box
                  key={player.palette[key]}
                  className="rounded"
                  w="10px"
                  h="10px"
                  bg={player.palette[key]}
                />
              );
            })}
          </HStack>
          <NextSongBadge />
          <AspectRatio minW="100px" w="500px" ratio={1}>
            <Image
              src={player.current.image}
              className="rounded"
              fallbackSrc={'https://via.placeholder.com/150'}
            />
          </AspectRatio>

          <Box
            className="player-control rounded"
            bgGradient={
              data
                ? `linear(to-r, ${player.palette.darkVibrant},  ${player.palette.vibrant} )`
                : 'black'
            }
            w="100%"
            padding={4}
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
                  <PlaybackControl
                    playerRef={playerRef}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onVolChange={handleVolChange}
                  />
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
            {settings.config.enableSpectrum ? (
              <AudioSpectrum
                className="audio-spectrum"
                id="audio-canvas"
                height={150}
                width={300}
                audioId="audio-elem"
                capColor="transparent"
                capHeight={2}
                meterWidth={2}
                meterCount={512}
                meterColor={[
                  { stop: 0, color: player.palette.lightVibrant },
                  { stop: 0.5, color: player.palette.lightVibrant },
                  { stop: 1, color: player.palette.lightVibrant },
                ]}
                gap={8}
              />
            ) : (
              <div />
            )}
            <div />

            {musicDetailSchema.map((detail) => {
              const { text, icon } = detail;
              let dataText = '';

              if (player.current[text] === undefined) return <></>;

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
                    <Heading paddingTop={8} paddingBottom={4} size="4xl">
                      {dataText}
                    </Heading>
                  ) : (
                    <Text
                      color={text === '' ? player.palette.vibrant : ''}
                      fontSize="2xl"
                    >
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
      {/* <pre>{JSON.stringify(player)}</pre> */}
    </>
  );
};

export default MusicPlayer;
