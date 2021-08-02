import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Text,
  Box,
  Badge,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { createPlaylist } from '../../utils/playlists';

interface Props {
  onConfirm: () => void;
}

const ConvertPlaylistModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playlistName, setPlaylistName] = useState('');

  const handleChange = (e) => {
    setPlaylistName(e.target.value);
  };
  const handleCreateNewPlaylist = () => {
    const fd = createPlaylist(playlistName);
    props.onConfirm();
    onClose();
  };

  return (
    <>
      <Button leftIcon={<RiAddFill />} onClick={onOpen}>
        Create Playlist
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Playlist Name</FormLabel>
                <Input
                  id="playlistName"
                  variant="filled"
                  value={playlistName}
                  onChange={handleChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreateNewPlaylist}>
              Create Playlist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConvertPlaylistModal;
