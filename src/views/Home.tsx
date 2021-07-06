import React from 'react';
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
} from '@chakra-ui/react';

import {
  RiSettings2Line,
  RiSpotifyFill,
  RiGithubFill,
  RiInformationFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import { spotifyLoginURI } from '../config/spotify';
import store, { RootState } from '../app/store/store';
import SettingsForm from '../components/Settings/SettingsForm';
import { setQueue, shuffleQueue } from '../app/store/actions/playerActions';
import { JSONtoPlaylist, parseCSV } from '../utils/exportifyUtils';
import {
  findAllSongPathsFromDir,
  parseFiles,
  readAllandParse,
  parseFiles2,
  function2,
  parsePlaylist,
} from '../utils/file';
import { ipcRenderer } from 'electron';
import Loading from './Loading';

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
    // await readAllandParse('D:\\Songs', '.mp3', h)
    //   .then((x) => {
    //     return Promise.all(h);
    //   })
    //   .then((g) => console.log(g));
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const Home = (props: Props) => {
  // let player;
  // store.subscribe(() => {
  //   const { player } = store.getState();
  // });
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));

  React.useEffect(() => {
    setQueue(settings.config.musicDir, 50);
    // findAllSongPathsFromDir(settings.config.musicDir);
  }, [settings.config.musicDir]);

  React.useEffect(() => {
    //JSONtoPlaylist();
  });

  return (
    <Box
      className="home-main"
      height="100vh"
      padding={16}
      _before={{ backgroundImage: player.current.image }}
    >
      <Loading loading={player.loading} />
      <Flex flexDirection="column" height="100%">
        <Flex alignItems="center">
          <ButtonGroup>
            <IconButton
              aria-label="Github"
              variant="ghost"
              isRound
              size="lg"
              icon={<RiInformationFill />}
            />
          </ButtonGroup>
          <Spacer />
          <marquee>
            {' '}
            <Text size="md">
              HEHEHE web dev OMEGALUL HEHEHE electron app OMEGA L Y L
            </Text>
          </marquee>

          <Spacer />
          <SettingsDrawer />
        </Flex>
        <Spacer />
        <Box>
          <MusicPlayer />
        </Box>
      </Flex>
    </Box>
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
