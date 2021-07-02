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

function SettingsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const onSave = () => {
    return onClose();
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
                <SettingsForm onSave={onSave} />
              </VStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="g" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSave}>
              Save
            </Button>
          </DrawerFooter>
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
  const { player } = useSelector((state: RootState) => ({
    player: state.player,
  }));
  return (
    <Box
      className="home-main"
      height="100vh"
      padding={16}
      _before={{ backgroundImage: player.current.image }}
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
          <marquee>
            {' '}
            <Text size="md">HEHEHE web dev OMEGA L Y L</Text>
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

export default Home;
