import {
  VStack,
  Image,
  Box,
  AspectRatio,
  Heading,
  Spacer,
  Text,
  HStack,
  Grid,
  Progress,
  Icon,
  Container,
  CircularProgress,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { IconType } from 'react-icons';
import {
  RiHeadphoneLine,
  RiUserVoiceLine,
  RiAlbumLine,
  RiTimerLine,
  RiTimerFlashLine,
  RiCalendarEventFill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { usePalette } from 'react-palette';
import ReactAudioPlayer from 'react-audio-player';
import AudioSpectrum from 'react-audio-spectrum';
import { RootState } from '../app/store/store';
import { sToMMSS } from '../utils/time';
import {
  gotoNextSong,
  gotoPrevSong,
  loadingSelector,
  setPalette,
} from '../app/store/actions/playerActions';
import NextSongBadge from './Player/NextSongBadge';
import PlaybackControl from './Player/PlaybackControl';
import MoonLoader from 'react-spinners/MoonLoader';
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
  const [vol, setVol] = useState(player.vol);
  const [songLoading, setSongLoading] = useState(false);

  useEffect(() => {
    setSongLoading(loadingSelector('song'));
  }, [player.loading]);
  // useEffect(() => {
  //   if (player.queue.length > 0 && !player.loading) {
  //     setSong(player.queue[player.songIndex]);
  //     setNextSong(player.queue[player.songIndex + 1]);
  //   }
  // }, [player.queue, player.songIndex, player.loading]);

  useEffect(() => {
    const { title } = player.current;
    if (!loading && title !== undefined) {
      setPalette(data);
    }
  }, [loading, player.current.title, data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!songLoading && player.playing) {
        setTime(time + 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  const handleNext = () => {
    gotoNextSong();
  };

  const handlePrev = () => {
    gotoPrevSong();
  };

  const handleVolChange = (n) => {
    setVol(n);
  };

  // REACT-AUDIO-PLAYER

  const handleRAPEnded = () => {
    gotoNextSong();
  };

  const handleRAPListen = (t: number) => {
    // updateCurrentTime(t);
    setTime(t);
  };

  /**
   * Called when React Audio Player changes source file
   * @param e Event
   */
  const handleRAPAbort = (e) => {
    // updateCurrentTime(0);
    setTime(0);
  };

  const handleRAPReady = () => {
    console.log('h');
  };

  const handleAudioErr = () => {
    gotoNextSong();
  };
  if (songLoading) {
    return (
      <Box className="flex-absolute-box">
        <MoonLoader color={player.palette.lightVibrant} />
      </Box>
    );
  }

  return (
    <>
      <ReactAudioPlayer
        listenInterval={1000}
        id="audio-elem"
        src={`${player.queue[player.songIndex]}`}
        volume={vol}
        onEnded={handleRAPEnded}
        onListen={handleRAPListen}
        onAbort={handleRAPAbort}
        onError={handleAudioErr}
        autoPlay={player.playing}
        ref={playerRef}
        onCanPlayThrough={handleRAPReady}
      />
      <Grid gridTemplateColumns="min-content 1fr" gap={16}>
        <VStack spacing={8} alignSelf="flex-end">
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
                ? `linear(to-r, ${player.palette.vibrant},  ${player.palette.vibrant} )`
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
          {settings.config.enableSpectrum && playerRef.current ? (
            <Box
            // pb={4}
            // borderBottom={`2px solid ${player.palette.lightVibrant}`}
            >
              <AudioSpectrum
                className="audio-spectrum"
                id="audio-canvas"
                height={125}
                width={252}
                audioEle={playerRef.current.audioEl.current}
                capColor="transparent"
                capHeight={2}
                meterWidth={2}
                meterCount={256}
                meterColor={[
                  { stop: 0, color: player.palette.lightVibrant },
                  { stop: 0.5, color: player.palette.lightVibrant },
                  { stop: 1, color: player.palette.lightVibrant },
                ]}
                gap={8}
              />
            </Box>
          ) : (
            <div />
          )}
          <div />
          <Grid
            className="player-details-grid"
            templateColumns="100px 1fr"
            w="100%"
          >
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
