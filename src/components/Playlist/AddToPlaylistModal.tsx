import React from 'react';
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
import { readPlaylistDir } from '../../utils/playlists';
import PlaylistButton from './PlaylistButton';
interface Props {
  // open: boolean;
  // onClose: () => void;
  data: string;
  button: Record<string, unknown>;
}

const AddToPlaylistModal = (props: Props) => {
  const { data: songPath } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playlists, setPlaylists] = React.useState([]);

  React.useEffect(() => {
    readPlaylistDir((f) => {
      setPlaylists(f);
    });
  }, []);

  return (
    <>
      <Button {...props.button} onClick={onOpen}>
        Add to Playlist
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%">
              <Text>{songPath}</Text>
              {playlists.map((playlist) => {
                return (
                  <PlaylistButton
                    key={playlist}
                    playlistPath={playlist}
                    songPath={songPath}
                  />
                );
              })}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToPlaylistModal;
