import {
  AspectRatio,
  Box,
  Grid,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ipcRenderer } from 'electron';
import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { ContextMenuTrigger } from 'react-contextmenu';
import { IconType } from 'react-icons';
import LazyLoad from 'react-lazyload';
import { usePalette } from 'react-palette';
import { useSelector } from 'react-redux';
import {
  gotoNextSong,
  gotoPrevSong,
  loadingSelector,
  setPalette,
} from '../app/store/actions/playerActions';
import { getCombinedQueue } from '../app/store/actions/queueActions';
import { RootState } from '../app/store/store';
import defaultImg from '../assets/default-playlist-img.png';
import NothingPlaying from '../fragments/NothingPlaying';
import { albumArtPlaying, CtxMenuTypes } from './ContextMenus/ctxMenuSchemas';
import GenerateCtxMenu from './ContextMenus/GenerateCtxMenu';
import MusicDetails from './Player/MusicDetails';
import NextSongBadge from './Player/NextSongBadge';
import PlaybackControl from './Player/PlaybackControl';
import AudioSpectrum from './Visualizer/CustomAudioSpectrum';
import { MotionBox } from './Wrappers/FramerComponents';

interface IObjectKeys {
  [key: string]: string | number;
}

interface MusicDetailCellPropT {
  text: string;
  icon: IconType | undefined;
  textColor: string | undefined;
}

const MusicDetailCell = (props: MusicDetailCellPropT) => {
  const { text, icon, textColor } = props;
  return (
    <HStack alignItems="center" spacing={1}>
      {icon && <Icon as={icon} color={textColor || 'white'} />}
      <Text className="player-details-type">{text}</Text>
    </HStack>
  );
};

const MusicPlayer = () => {
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));
  const { current } = player;
  const { title, songPath } = current || {};

  const playerRef = useRef<ReactAudioPlayer>(null);
  const { data, loading } = usePalette(player.current?.image || '');

  // STATES
  const [time, setTime] = useState(0);
  const [vol, setVol] = useState(player.vol);
  const [songLoading, setSongLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const handleItemClick = (type: string, itemData: string) => {
    switch (type) {
      case CtxMenuTypes.viewInFolder:
        console.log('viewInFolder');
        ipcRenderer.send('openSongInFolder', itemData);
        break;
      default:
        break;
    }

    // remote.shell.showItemInFolder(itemData);
    // console.log(type, itemData);
  };
  const renderCtxMenu = React.useCallback(() => {
    return (
      <GenerateCtxMenu
        id="songArt"
        menuItems={albumArtPlaying}
        onItemClick={handleItemClick}
        data={songPath}
      />
    );
  }, [songPath]);

  useEffect(() => {
    setSongLoading(loadingSelector('song'));
    return () => {
      setSongLoading(false);
    };
  }, [player.loading]);

  useEffect(() => {
    if (!loading) {
      setPalette(data);
    }
  }, [loading, data]);

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   if (!songLoading && player.playing && ready) {
    //     setTime(time + 1);
    //   }
    // }, 1000);
    // return () => clearTimeout(timer);
  });

  const handleNext = () => {
    gotoNextSong();
  };

  const handlePrev = () => {
    gotoPrevSong();
  };

  const handleVolChange = (n: number) => {
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
    setReady(true);
  };

  const handleAudioErr = () => {
    gotoNextSong();
  };

  if (
    !player.current ||
    (!player.current.songPath && getCombinedQueue().length === 0)
  ) {
    return <NothingPlaying />;
  }

  // if (songLoading) {
  //   return (
  //     <Box className="flex-absolute-box">
  //       <MoonLoader color={player.palette.lightVibrant} />
  //     </Box>
  //   );
  // }

  return (
    <>
      <Grid
        gridTemplateColumns={{ base: '1fr', md: '0.4fr 1fr' }}
        gap={{ base: 4, lg: 16 }}
      >
        <VStack spacing={8} alignSelf="flex-end">
          <NextSongBadge />
          <Box boxShadow="xl" className="rounded" w="100%">
            <ContextMenuTrigger id="songArt">
              <AspectRatio ratio={1}>
                <MotionBox
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="player-album-art"
                  key={`player-album-art-${player.current.title}-${player.current.artist}`}
                >
                  <Box
                    display="flex"
                    as={LazyLoad}
                    style={{
                      minWidth: '100%',
                      minHeight: '100%',
                    }}
                  >
                    <Image
                      style={{
                        minWidth: '100%',
                        objectFit: 'cover',
                      }}
                      bg={player.palette.vibrant}
                      src={player.current.image || defaultImg}
                      className="rounded"
                      borderBottomRadius={0}
                    />
                  </Box>
                </MotionBox>
              </AspectRatio>
            </ContextMenuTrigger>
            <Box
              className="player-control rounded"
              // bgGradient={
              //   data
              //     ? `linear(to-r, ${player.palette.vibrant},  ${player.palette.vibrant} )`
              //     : 'black'
              // }
              bgColor={`${player.palette.vibrant}D1`}
              backdropFilter="blur(8px)"
              w="100%"
              padding={4}
              borderTopRadius={0}
            >
              <VStack alignItems="flex-start" width="100%">
                <PlaybackControl
                  //ref={playerRef}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onVolChange={handleVolChange}
                />
              </VStack>
            </Box>
          </Box>
        </VStack>

        <VStack alignSelf="flex-end" alignItems="flex-start" flexGrow={1}>
          {settings.config.enableSpectrum ? (
            <Box
            // pb={4}
            // borderBottom={`2px solid ${player.palette.lightVibrant}`}
            >
              <AudioSpectrum
                config={settings.config}
                audioId="audio-player"
                className="audio-spectrum"
                id="audio-canvas"
                key={`${player.current.title}-spectrum`}
                height={125}
                width={252}
                // audioEle={playerRef.current.audioEl.current}
                capColor="transparent"
                capHeight={2}
                meterWidth={2}
                meterCount={1024}
                meterColor={player.palette.lightVibrant || 'white'}
                gap={8}
              />
            </Box>
          ) : (
            <div />
          )}
          <div />
          {player.current && <MusicDetails />}
          <Spacer />
        </VStack>
      </Grid>
      {renderCtxMenu()}

      {/* <pre>{JSON.stringify(player)}</pre> */}
    </>
  );
};

export default MusicPlayer;
