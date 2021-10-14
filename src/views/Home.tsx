import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Box,
  Flex,
  Heading,
  useDisclosure,
  Spacer,
  VStack,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
  Icon,
  Text,
  SlideFade,
} from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
import {
  RiSettings2Line,
  RiSpotifyFill,
  RiInformationFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import store, { RootState } from '../app/store/store';
import SettingsForm from '../components/Settings/SettingsForm';
import { loadingSelector } from '../app/store/actions/playerActions';
import { function2, parsePlaylist, scanDir, readLibrary } from '../utils/file';
import Loading from './Loading';
import ActionTypes from '../app/store/actionTypes';

import { generateParticleJS } from '../utils/fn';
import LibraryDrawer from '../components/Library/LibraryDrawer';
import InfoDrawer from '../components/Drawers/InfoDrawer';
import { convertPathsToPlaylist } from '../utils/playlists';
import ExtraGIFDisplayer from '../components/ExtraGIFDisplayer';
import {
  MotionBox,
  MotionHeading,
} from '../components/Wrappers/FramerComponents';
import SongMarquee from '../components/Main/SongMarquee';
import SongBackgroundText from '../components/Main/SongBackgroundText';

// const appVersion = require('electron').remote.app.getVersion();
function SettingsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const openSpotifyAuthWindow = () => {};
  const handleParsePlaylist = () => {
    parsePlaylist().then((h) => {
      console.log(h);
    });
  };

  const x = () => {
    parsePlaylist().then((h) => {
      convertPathsToPlaylist(h);
    });
  };
  const handleJSONToPlaylist = async () => {
    let h = [];
    let metadatas = [];
    await function2().then(() => console.log('a'));
  };

  const handleGlobRead = () => {
    scanDir('D:/Songs');
  };

  const readLib = () => {
    readLibrary();
  };

  return (
    <>
      <IconButton
        aria-label="Open Settings"
        icon={<RiSettings2Line />}
        variant="ghost"
        size="lg"
        isRound
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex alignItems="center">
              <Icon as={RiSettings2Line} />
              &nbsp;Settings
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack alignItems="flex-start" spacing={8}>
              <Button
                isFullWidth
                leftIcon={<RiSpotifyFill />}
                colorScheme="green"
                onClick={openSpotifyAuthWindow}
              >
                Sign Into Spotify
              </Button>
              <SettingsForm />
              <Button onClick={handleJSONToPlaylist}>Convert Playlist</Button>
              <Button onClick={handleParsePlaylist}>Parse Playlist</Button>
              <Button onClick={handleGlobRead}>GlobRead</Button>
              <Button onClick={x}>Convert files to new playlist</Button>
              <Button onClick={readLib}>Read Library</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

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
        <ExtraGIFDisplayer
          height="50%"
          // key={player.current?.title}
          copies={1}
        />
        <Flex
          padding={{ base: 4, md: 8, lg: 16 }}
          flexDirection="column"
          height="100%"
        >
          <Flex alignItems="center" zIndex="99">
            {settings.config.enableInfo && (
              <>
                <ButtonGroup>
                  <InfoDrawer />
                </ButtonGroup>
              </>
            )}

            <Spacer />
            <LibraryDrawer />
            <SettingsDrawer />
          </Flex>
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
