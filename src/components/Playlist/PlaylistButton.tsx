import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { RiAddFill } from 'react-icons/ri';
import { addToPlaylist, readPlaylist } from '../../utils/playlists';
import { infoToast } from '../Toasts/generateToasts';
import _ from 'lodash';

interface Props {
  songPath: string;
  playlistPath: string;
}

const PlaylistButton = (props: Props) => {
  const { songPath, playlistPath } = props;
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    readPlaylist(playlistPath, (playlistSongs) => {
      if (_.find(playlistSongs, { songPath })) {
        setAdded(true);
      }
    });
  }, []);

  const handleAddToPlaylist = () => {
    addToPlaylist(songPath, playlistPath, () => {
      setAdded(true);
      infoToast('Added to Playlist');
    });
  };

  return (
    <Button
      p={6}
      w="100%"
      justifyContent="left"
      colorScheme={added ? 'blue' : 'gray'}
      leftIcon={<RiAddFill />}
      onClick={handleAddToPlaylist}
    >
      {playlistPath}
    </Button>
  );
};

export default PlaylistButton;
