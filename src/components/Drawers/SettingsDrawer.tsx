import React from 'react';
import { RiSettings2Line, RiSpotifyFill } from 'react-icons/ri';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import SettingsForm from '../Settings/SettingsForm';

const SettingsDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openSpotifyAuthWindow = () => {};
  // const handleParsePlaylist = () => {
  //   parsePlaylist().then((h) => {
  //     console.log(h);
  //   });
  // };

  // const x = () => {
  //   parsePlaylist().then((h) => {
  //     convertPathsToPlaylist(h);
  //   });
  // };
  // const handleJSONToPlaylist = async () => {
  //   let h = [];
  //   let metadatas = [];
  //   await function2().then(() => console.log('a'));
  // };

  // const handleGlobRead = () => {
  //   scanDir('D:/Songs');
  // };

  // const readLib = () => {
  //   readLibrary();
  // };

  return (
    <>
      <Tooltip label="Settings">
        <IconButton
          aria-label="Open Settings"
          icon={<RiSettings2Line />}
          variant="ghost"
          size="lg"
          isRound
          onClick={onOpen}
        />
      </Tooltip>
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
              {/* <Button onClick={handleJSONToPlaylist}>Convert Playlist</Button>
              <Button onClick={handleParsePlaylist}>Parse Playlist</Button>
              <Button onClick={handleGlobRead}>GlobRead</Button>
              <Button onClick={x}>Convert files to new playlist</Button>
              <Button onClick={readLib}>Read Library</Button> */}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export { SettingsDrawer, SettingsDrawer as default };
