import React, { useEffect, useState } from 'react';
import { readLibrary } from '../../utils/file';
import { VStack } from '@chakra-ui/react';
import SongRow from './SongRow';
import SongTable from './SongTable';
interface Props {}

const SongLibrary = (props: Props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    readLibrary((data) => setSongs(data));
  }, []);

  return (
    <div>
      <SongTable songData={songs.slice(1, 100)} />
      {/* {songs.slice(1, 50).map((song) => {
        return <SongRow key={song.title} song={song} />;
      })} */}
    </div>
  );
};

export default SongLibrary;
