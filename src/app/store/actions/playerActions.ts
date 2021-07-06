import os from 'os';
import electron from 'electron';
import {
  getMetadata,
  findAllSongPathsFromDir,
  parsePlaylist,
} from '../../../utils/file';
import store from '../store';
import ActionTypes from '../actionTypes';
import { PaletteColors, usePalette } from 'react-palette';
import { ISong } from '../../../utils/types';
import _ from 'lodash';
import { createStandaloneToast } from '@chakra-ui/react';
import {
  errorToast,
  infoToast,
} from '../../../components/Toasts/generateToasts';
const { ipcRenderer } = electron;
const toast = createStandaloneToast();

export const setSong = async (songPath: string) => {
  const metadata: ISong = await getMetadata(songPath);
  store.dispatch({ type: ActionTypes.PLAYER_SET_SONG, payload: metadata });
};

export const setNextSong = async (songPath: string) => {
  const metadata: ISong = await getMetadata(songPath);

  store.dispatch({
    type: ActionTypes.PLAYER_SET_NEXT_SONG,
    payload: _.isEmpty(metadata) ? null : metadata,
  });
};

export const setPalette = (palette: PaletteColors) => {
  store.dispatch({
    type: ActionTypes.PLAYER_SET_COLOR_PALETTE,
    payload: palette,
  });
};

export const setQueue = (musicDir: string, sample?: number) => {
  if (musicDir === '') {
    errorToast(`Music Directory is blank`);
    return store.dispatch({
      type: ActionTypes.PLAYER_SET_QUEUE,
      payload: [],
    });
  }
  infoToast(`Samping ${sample} from '${musicDir}'`);
  const q = parsePlaylist();
  return store.dispatch({
    type: ActionTypes.PLAYER_SET_QUEUE,
    payload: q,
  });
  // return findAllSongPathsFromDir(musicDir, sample)
  //   .then((q) => {
  //     return store.dispatch({
  //       type: ActionTypes.PLAYER_SET_QUEUE,
  //       payload: q,
  //     });
  //   })
  //   .catch((err) => {
  //     errorToast(err);
  //   });
};

export const shuffleQueue = () => {
  const { player } = store.getState();
  return store.dispatch({
    type: ActionTypes.PLAYER_SET_QUEUE,
    payload: _.shuffle(player.queue),
  });
};

export const togglePlay = () => {
  const { player } = store.getState();
  if (player.playing === true) {
    return store.dispatch({
      type: ActionTypes.PLAYER_SET_PAUSE,
    });
  }
  return store.dispatch({
    type: ActionTypes.PLAYER_SET_PLAY,
  });
};

export const setSongIndex = (i: number) => {};

export const setCurrentTime = (t: number) => {};

export const setVol = (n: number) => {
  return store.dispatch({
    type: ActionTypes.PLAYER_SET_VOLUME,
    payload: n,
  });
};
export default {};
