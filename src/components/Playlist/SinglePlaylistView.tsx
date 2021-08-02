import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RiPlayMiniFill } from 'react-icons/ri';
import { Heading, HStack, IconButton } from '@chakra-ui/react';
import { deletePlaylist, readPlaylist } from '../../utils/playlists';
import SongTable from '../Library/SongTable';
import { setQueue } from '../../app/store/actions/playerActions';
import { infoToast } from '../Toasts/generateToasts';

interface Props {}

const SinglePlaylistView = (props: Props) => {
  const history = useHistory();
  const { playlistPath } = useParams<Record<string, string>>();

  const [playlistSongs, setPlaylistSongs] = useState([]);

  useEffect(() => {
    readPlaylist(playlistPath, (d: Array<any>) => setPlaylistSongs(d));
  }, []);

  const handlePlayPlaylist = () => {
    setQueue(
      playlistSongs.map((song) => {
        return song.songPath;
      })
    );
  };

  const handleDeletePlaylist = () => {
    deletePlaylist(playlistPath, () => {
      infoToast(`Deleted ${playlistPath}`);
      // setPlaylistSongs(
      //   playlistSongs.filter((path) => {
      //     return path !== playlistPath;
      //   })
      // );
      history.goBack();
    });
  };

  const handleViewPlaylistInFolder = () => {};
  const menuItems = useMemo(
    () => [
      { text: 'Delete Playlist', onClick: handleDeletePlaylist },
      { text: 'View Playlist In Folder', onClick: handleViewPlaylistInFolder },
    ],

    []
  );
  return (
    <>
      <HStack mb={4}>
        <IconButton
          colorScheme="blue"
          isRound
          aria-label="Play Playlist"
          icon={<RiPlayMiniFill />}
          onClick={handlePlayPlaylist}
        />
        <Heading>{playlistPath}</Heading>
      </HStack>
      <SongTable
        menuItems={menuItems}
        songData={playlistSongs}
        songTableType="playlist"
      />
    </>
  );
};

export default SinglePlaylistView;
