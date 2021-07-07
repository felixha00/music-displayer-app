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
import { RiUpload2Fill } from 'react-icons/ri';

interface Props {}

const ConvertPlaylistModal = (props: Props) => {
  const spotifyCSVRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spotifyCSV, setSpotifyCSV] = useState<File>();

  const handleSpotifyCSV = () => {
    spotifyCSVRef.current.click();
  };

  const handleCSVUpload = (e) => {
    setSpotifyCSV(e.currentTarget.files[0]);
  };

  return (
    <>
      <Button leftIcon={<RiUpload2Fill />} onClick={onOpen}>
        Convert Playlist
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Convert Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Music Files Directory</FormLabel>
                <Input id="musicDir" variant="filled" />
              </FormControl>

              <FormControl>
                <Input
                  type="file"
                  id="playlistPath"
                  ref={spotifyCSVRef}
                  style={{ display: 'none' }}
                  onChange={handleCSVUpload}
                />

                <FormLabel>Spotify Playlist Path</FormLabel>
                <Box p={2} bgColor="whiteAlpha.50">
                  <Badge fontSize="xs">{spotifyCSV?.name}</Badge>
                  <Text fontSize="xs">{spotifyCSV?.path}</Text>
                </Box>
                <ButtonGroup w="100%">
                  <Button mt={2} onClick={handleSpotifyCSV} colorScheme="blue">
                    Browse
                  </Button>
                </ButtonGroup>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">Cancel</Button>
            <Button colorScheme="blue" onClick={onClose}>
              Convert Playlist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConvertPlaylistModal;
