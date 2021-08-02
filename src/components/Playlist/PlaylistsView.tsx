import React, { useEffect, useState } from 'react';
import { Box, ButtonGroup, VStack, Grid, SimpleGrid } from '@chakra-ui/react';
import NewPlaylistModal from './NewPlaylistModal';
import { readPlaylist, readPlaylistDir } from '../../utils/playlists';
import { default as platformPath } from 'path';
import PlaylistBox from './PlaylistBox';
import {
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import SinglePlaylistView from './SinglePlaylistView';
import ConvertPlaylistModal from './ConvertPlaylistModal';
import { ipcRenderer } from 'electron';

interface Props {}

const PlaylistsView = (props: Props) => {
  const [playlists, setPlaylists] = useState<Array<string>>([]);
  const history = useHistory();
  const { path, url } = useRouteMatch();

  useEffect(() => {
    readPlaylistDir((f) => {
      ipcRenderer.send('fetchPlaylistInfo', f);
      setPlaylists(f);
    });
  }, []);

  const handlePlaylistClick = (playlistPath: string) => {
    history.push(`/playlists/${playlistPath}`);
    readPlaylist(playlistPath, (a) => console.log(a));
  };

  const handleConfirmNewPlaylist = () => {
    readPlaylistDir((f) => {
      setPlaylists(f);
    });
  };

  // ipcRenderer.on('postPlaylistInfo', (arg) => {
  //   console.log(arg);
  // });
  return (
    <Switch>
      <Route exact path={path}>
        <VStack alignItems="flex-start" spacing={4}>
          <ButtonGroup>
            <NewPlaylistModal onConfirm={handleConfirmNewPlaylist} />
            <ConvertPlaylistModal />
          </ButtonGroup>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 4, lg: 6 }}
            // templateColumns="repeat(6, 1fr)"
            w="100%"
            gap={4}
          >
            {playlists.map((playlist) => {
              return (
                <Link key={playlist} to={`${path}/${playlist}`}>
                  <PlaylistBox
                    name={platformPath.basename(playlist, undefined)}
                    path={playlist}
                  />
                </Link>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Route>
      <Route path={`${path}/:playlistPath+`}>
        <SinglePlaylistView />
      </Route>
    </Switch>
  );
};

export default PlaylistsView;
