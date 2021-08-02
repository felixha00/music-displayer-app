import React, { useEffect, useState, useMemo } from 'react';
import { readLibrary, rescanLibrary } from '../../utils/file';
import { VStack } from '@chakra-ui/react';
import SongRow from './SongRow';
import SongTable from './SongTable';
import { ISong } from '../../utils/types';
import { infoToast } from '../Toasts/generateToasts';
interface Props {}

const SongLibrary = (props: Props) => {
  const [songs, setSongs] = useState<Array<ISong>>([]);

  useEffect(() => {
    readLibrary((data) => setSongs(data));
  }, []);

  const handleRescanLib = () => {
    rescanLibrary('D:/Songs', (n, d) => {
      infoToast(`Found ${n} | Deleted ${d} songs`);
      readLibrary((data) => setSongs(data));
    });
  };
  const menuItems = useMemo(
    () => [
      { text: 'Play Library', onClick: handleRescanLib },
      { div: true },
      { text: 'Rescan Folder', onClick: handleRescanLib },
      { text: 'Rescan Entire Library', onClick: handleRescanLib },
    ],
    []
  );

  return (
    <SongTable menuItems={menuItems} songData={songs} songTableType="library" />
  );
};

export default SongLibrary;
