import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import ExtraGIFDisplayer from '../components/ExtraGIFDisplayer';
import Navigation from '../components/Main/Navigation';
import SongBackgroundText from '../components/Main/SongBackgroundText';
import SongMarquee from '../components/Main/SongMarquee';
import MusicPlayer from '../components/MusicPlayer';
import SettingsForm from '../components/Settings/SettingsForm';
import { MotionBox } from '../components/Wrappers/FramerComponents';
import { function2, parsePlaylist, readLibrary, scanDir } from '../utils/file';
import { generateParticleJS } from '../utils/fn';
import { convertPathsToPlaylist } from '../utils/playlists';

const Home = () => {
  const [particleParams, setParticleParams] = useState('#ffffff');
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));
  const { current, queue, priorityQueue } = player;
  const { title, artist, album } = current || {};
  const [compressedBg, setCompressedBg] = useState('');

  //  useEffect(() => {
  //    imageCompression.
  //  },[])
  useEffect(() => {
    setParticleParams(generateParticleJS(player.palette.vibrant || '#ffffff'));
  }, [player.palette]);

  useEffect(() => {
    // if (player.current === null) {
    //   loadingSetter('song', true);
    //   // setSong(_.head(player.queue));
    //   gotoNextSong();
    // }
    // setSong(player.songIndex);
    // setNextSong(player.songIndex + 1);
  }, []);

  // useEffect(() => {
  //   setSong(player.songIndex);
  // }, [player.queue]);
  // const renderExtraGIFDisplayer = useCallback(() => {
  //   return <ExtraGIFDisplayer key={} copies={1} scale />;
  // }, []);

  return (
    <>
      {player.current && (
        <Box
          className="album-art-bg"
          id="album-art-bg"
          key={player.current?.songPath}
          bgImage={player.current?.image}
        />
      )}

      <MotionBox
        h="100%"
        display="flex"
        flexDir="column"
        borderBottom={`4px solid ${player.palette.vibrant}`}
        key={player.current?.id}
      >
        <SongBackgroundText />
        <ExtraGIFDisplayer height="50%" copies={1} />
        <Flex
          padding={{ base: 4, md: 8, lg: 16 }}
          flexDirection="column"
          height="100%"
        >
          <Navigation />
          <Spacer />
          <Box>
            <MusicPlayer />
          </Box>
        </Flex>
        <SongMarquee />
      </MotionBox>
    </>
  );
};

// ipcRenderer.on('show-toast', (evt, message) => {
//   console.log(message); // Returns: {'SAVED': 'File Saved'}
// });

export default Home;
