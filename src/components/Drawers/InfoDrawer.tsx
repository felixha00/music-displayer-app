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
  Text,
} from '@chakra-ui/react';

import { RiInformationFill } from 'react-icons/ri';
import { remote } from 'electron';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
interface Props {}

const InfoDrawer = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));

  return (
    <>
      <IconButton
        aria-label="library"
        icon={<RiInformationFill />}
        onClick={onOpen}
        size="lg"
        isRound
        variant="ghost"
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Info</DrawerHeader>

          <DrawerBody>
            <pre style={{ overflow: 'hidden' }}>
              {JSON.stringify(player, null, 2)}
            </pre>
            <Text fontSize="xs">{`${remote.app.getName()} ${remote.app.getVersion()}`}</Text>
          </DrawerBody>

          <DrawerFooter bg="whiteAlpha.50" justifyContent="flex-start">
            <Text fontSize="xs">MIT © Felix Ha 2021</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InfoDrawer;
