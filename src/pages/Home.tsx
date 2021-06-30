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
} from '@chakra-ui/react';

import { RiSettings2Line, RiSpotifyFill, RiGithubFill } from 'react-icons/ri';
import MusicPlayer from '../components/MusicPlayer';

interface Props {}

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
              >
                Sign Into Spotify
              </Button>
              <>
                <Input placeholder="Music Directory" variant="filled" />
              </>
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
  return (
    <Box className="home-main" height="100vh" padding={8}>
      <Flex flexDirection="column" height="100%">
        <Flex>
          <ButtonGroup>
            <IconButton
              aria-label="Github"
              variant="ghost"
              isRound
              size="lg"
              icon={<RiGithubFill />}
            />
          </ButtonGroup>
          <Spacer />
          <DrawerExample />
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
