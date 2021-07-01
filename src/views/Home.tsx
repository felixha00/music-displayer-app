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
import { BrowserWindow } from 'electron';
import { Link } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer';
import { spotifyLoginURI } from '../config/spotify';
import store from '../app/store/store';

//console.log(store.getState());
// const authWindow = new BrowserWindow({
//   width: 800,
//   height: 600,
//   show: false,
//   'node-integration': false,
// });

// authWindow.loadURL(spotifyLoginURI);

interface Props {}

function SettingsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const onSave = () => {
    return null;
  };

  const openSpotifyAuthWindow = () => {};
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
            <VStack alignItems="flex-start" divider={<Divider />} spacing={8}>
              <Button
                isFullWidth
                leftIcon={<RiSpotifyFill />}
                colorScheme="green"
                onClick={openSpotifyAuthWindow}
              >
                Sign Into Spotify
              </Button>
              <VStack alignItems="flex-start" w="100%">
                <Text>Configure</Text>
                <Input placeholder="Music Directory" variant="filled" />
              </VStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="g" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export const Home = (props: Props) => {
  const { player } = store.getState();
  return (
    <Box
      className="home-main"
      height="100vh"
      padding={8}
      _before={{ backgroundImage: player.current['image'] }}
    >
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
          <Heading size="md">Showboat</Heading>
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

export default Home;
