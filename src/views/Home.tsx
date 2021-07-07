import React, { useEffect, useState } from 'react';
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
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  IconButton,
  Icon,
  Divider,
  Text,
  Image,
} from '@chakra-ui/react';

import {
  RiSettings2Line,
  RiSpotifyFill,
  RiGithubFill,
  RiInformationFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import { spotifyLoginURI } from '../config/spotify';
import store, { RootState } from '../app/store/store';
import SettingsForm from '../components/Settings/SettingsForm';
import {
  loadingSelector,
  loadingSetter,
  setNextSong,
  setQueue,
  setSong,
  shuffleQueue,
} from '../app/store/actions/playerActions';
import {
  findAllSongPathsFromDir,
  parseFiles,
  readAllandParse,
  parseFiles2,
  function2,
  parsePlaylist,
  scanDir,
  readLibrary,
} from '../utils/file';
import { ipcRenderer } from 'electron';
import Loading from './Loading';
import ActionTypes from '../app/store/actionTypes';
import { remote } from 'electron';
import logo from '../../assets/logo.svg';
import Particles from 'react-particles-js';
import { generateParticleJS } from '../utils/fn';
import LibraryDrawer from '../components/Library/LibraryDrawer';

// const appVersion = require('electron').remote.app.getVersion();
function SettingsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const openSpotifyAuthWindow = () => {};
  const handleParsePlaylist = () => {
    parsePlaylist();
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
      <Drawer
        isOpen={isOpen}
        placement="right"
        size="xs"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
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
              <Button onClick={readLib}>Read Library</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  // let player;
  // store.subscribe(() => {
  //   const { player } = store.getState();
  // });
  const [particleParams, setParticleParams] = useState('#ffffff');
  const [appLoading, setAppLoading] = useState(false);
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));

  useEffect(() => {
    setParticleParams(generateParticleJS(player.palette.vibrant));
  }, [player.palette]);

  useEffect(() => {
    loadingSetter('app', true);
    setQueue(settings.config.musicDir, 50);
    // findAllSongPathsFromDir(settings.config.musicDir);
  }, [settings.config.musicDir]);

  useEffect(() => {
    loadingSetter('song', true);
    setSong(player.queue[player.songIndex] || '');
    setNextSong(player.queue[player.songIndex + 1]);
  }, [player.queue, player.songIndex]);

  if (loadingSelector('app') || player.current === null) {
    return <Loading loading={loadingSelector('app')} />;
  }

  return (
    <>
      {settings.config.enableParticles && (
        <Particles
          style={{ position: 'absolute', zIndex: '0' }}
          params={particleParams}
        />
      )}
      <Box
        className="home-main"
        height="100vh"
        padding={16}
        _before={{ backgroundImage: player.current.image }}
      >
        <Flex flexDirection="column" height="100%">
          <Flex alignItems="center">
            {settings.config.enableInfo && (
              <>
                <ButtonGroup>
                  <IconButton
                    aria-label="Github"
                    variant="ghost"
                    isRound
                    size="lg"
                    icon={<RiInformationFill />}
                  />
                </ButtonGroup>
                {/* <Image width="150px" src={logo} /> */}
                <Text fontSize="xs">{`${remote.app.getName()} ${remote.app.getVersion()}`}</Text>
              </>
            )}

            <Spacer />
            <marquee>
              {' '}
              <Text size="md">pepega</Text>
            </marquee>

            <Spacer />
            <LibraryDrawer />
            <SettingsDrawer />
          </Flex>
          <Spacer />
          <Box>
            <MusicPlayer />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

// const mapStateToProps = (state) => ({
//   player: state.player,
// });

// const mapDispatchToProps = {};
ipcRenderer.on('show-toast', (evt, message) => {
  console.log(message); // Returns: {'SAVED': 'File Saved'}
});

export default Home;
