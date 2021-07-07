import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Container,
  IconButton,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import QueueTable from './QueueTable';
import SongLibrary from './SongLibrary';
import { RiApps2Fill } from 'react-icons/ri';

interface Props {}

const LibraryDrawer = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="library"
        icon={<RiApps2Fill />}
        onClick={onOpen}
        size="lg"
        isRound
        variant="ghost"
      />
      <Drawer isOpen={isOpen} placement="bottom" size="full" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Container maxW="container.lg">
            <DrawerHeader>My Library</DrawerHeader>

            <DrawerBody>
              <Tabs
                textAlign="left"
                isLazy
                lazyBehavior="keepMounted"
                colorScheme="blue"
                mb={4}
              >
                <TabList>
                  <Tab>Song Library</Tab>

                  <Tab>Queue </Tab>
                  <Tab>Playlists</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <SongLibrary />
                  </TabPanel>
                  <TabPanel>
                    <QueueTable onClose={onClose} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
          </Container>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LibraryDrawer;
