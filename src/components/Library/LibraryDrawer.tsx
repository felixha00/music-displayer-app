import React, { useEffect } from 'react';
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
  HStack,
  Heading,
} from '@chakra-ui/react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
} from '@chakra-ui/react';
import QueueTable from './QueueTable';
import SongLibrary from './SongLibrary';
import { RiApps2Fill } from 'react-icons/ri';
import PlaylistsView from '../Playlist/PlaylistsView';
import './library-drawer.scss';
import CurrentlyPlayingFooter from './CurrentlyPlayingFooter';
import { HashRouter, Switch, Route, useHistory } from 'react-router-dom';
import SinglePlaylistView from '../Playlist/SinglePlaylistView';
import store from '../../app/store/store';
import ActionTypes from '../../app/store/actionTypes';
import HistoryController from './HistoryController';

interface Props {}

const LibraryDrawer = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const handleTabChange = (n: number) => {
    switch (n) {
      case 0:
        break;
      case 1:
        history.push('/library');
        break;
      case 2:
        history.push('/playlists');
        break;
      default:
        break;
    }
    // if (n === 2) {
    //   history.push('/playlists');
    // }
  };

  useEffect(() => {
    if (isOpen) {
      store.dispatch({
        type: ActionTypes.PLAYER_TOGGLE_MODAL,
      });
    }
    return () => {};
  }, [isOpen]);

  const handleOnClose = () => {
    onClose();
    store.dispatch({
      type: ActionTypes.PLAYER_TOGGLE_MODAL,
    });
  };
  useEffect(() => {
    return () => {
      history.push('/');
    };
  }, [history]);
  return (
    <>
      <Tooltip label="My Library">
        <IconButton
          aria-label="library"
          icon={<RiApps2Fill />}
          onClick={onOpen}
          size="lg"
          isRound
          variant="ghost"
        />
      </Tooltip>
      <Drawer
        motionPreset="scale"
        isOpen={isOpen}
        placement="bottom"
        size="full"
        onClose={handleOnClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>
            <HStack>
              <HistoryController />
              <Heading>My Library</Heading>
            </HStack>
          </DrawerHeader>

          <DrawerBody pt={0}>
            <Tabs
              textAlign="left"
              isLazy
              lazyBehavior="keepMounted"
              colorScheme="blue"
              mb={4}
              className="library-drawer"
              onChange={handleTabChange}
            >
              <TabList position="sticky" top="0" zIndex="1" bg="#141214">
                <Tab>Queue </Tab>
                <Tab>Library</Tab>

                <Tab>Playlists</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0} mt={4}>
                  <QueueTable onClose={onClose} />
                </TabPanel>
                <TabPanel p={0} mt={4}>
                  <Switch>
                    <Route exact path="/library" component={SongLibrary} />
                  </Switch>
                </TabPanel>

                <TabPanel p={0} mt={4} display="flex" flexDir="column">
                  <Switch>
                    <Route path="/playlists" component={PlaylistsView} />
                  </Switch>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter bg="whiteAlpha.50" justifyContent="flex-start">
            <CurrentlyPlayingFooter />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { LibraryDrawer, LibraryDrawer as default };
