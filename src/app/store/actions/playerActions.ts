import { ipcRenderer } from 'electron';
import {
  getMetadata,
  findAllSongPathsFromDir,
  parsePlaylist,
} from '../../../utils/file';
import store, { RootState } from '../store';
import ActionTypes from '../actionTypes';
import { PaletteColors } from 'react-palette';
import { ISong, LoadingTypes } from '../../../utils/types';
import _, { forEach } from 'lodash';
import {
  errorToast,
  infoToast,
} from '../../../components/Toasts/generateToasts';
import { getCombinedQueue } from './queueActions';

export const loadingSelector = (loadingType: LoadingTypes) => {
  const loadingArray = store.getState().player.loading;
  if (loadingArray.indexOf(loadingType) > -1) {
    return true;
  }
  return false;
};

export const loadingSetter = (loadingType: LoadingTypes, loading: boolean) => {
  if (loading) {
    store.dispatch({
      type: ActionTypes.PLAYER_SET_LOADING,
      payload: loadingType,
    });
  } else
    store.dispatch({
      type: ActionTypes.PLAYER_SET_LOADING_DONE,
      payload: loadingType,
    });
};

export const setSong = async (songPath?: string, songData?: ISong) => {
  const {
    player: { queue, priorityQueue, next },
  } = store.getState();

  if (songData) {
    store.dispatch({
      type: ActionTypes.PLAYER_SET_SONG,
      payload: songData,
    });
    return loadingSetter('song', false);
  }
  if (songPath) {
    getMetadata(songPath)
      .then((metadata) => {
        store.dispatch({
          type: ActionTypes.PLAYER_SET_SONG,
          payload: metadata,
        });
        return loadingSetter('song', false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //const songPath = _.head(priorityQueue, queue)
  // if (!next) {
  //   const songPath = queue[qIndex];

  //   getMetadata(songPath)
  //     .then((metadata) => {
  //       store.dispatch({
  //         type: ActionTypes.PLAYER_SET_SONG,
  //         payload: metadata,
  //       });
  //       return loadingSetter('song', false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // store.dispatch({
  //   type: ActionTypes.PLAYER_SET_SONG,
  //   payload: next,
  // });
  // store.dispatch({
  //   type: ActionTypes.PLAYER_SET_NEXT_SONG,
  //   payload: null,
  // });
  // return loadingSetter('song', false);
};

/**
 * Sets the next song to be played
 * @param songPath Path to the song to play
 */
export const setNextSong = async (songPath = '') => {
  const metadata: ISong = await getMetadata(songPath);

  store.dispatch({
    type: ActionTypes.PLAYER_SET_NEXT_SONG,
    payload: _.isEmpty(metadata) ? null : metadata,
  });
};
/**
 * @param palette Palette colors generated by react-palette
 */
export const setPalette = (palette: PaletteColors) => {
  store.dispatch({
    type: ActionTypes.PLAYER_SET_COLOR_PALETTE,
    payload: palette,
  });
};

export const gotoNextSong = () => {
  const { queue, priorityQueue, next, current } = store.getState().player;

  if (getCombinedQueue().length === 0) {
    return store.dispatch({ type: ActionTypes.PLAYER_SET_SONG, payload: null });
  }
  if (next) {
    store.dispatch({ type: ActionTypes.PLAYER_SET_SONG, payload: next });
    store.dispatch({ type: ActionTypes.PLAYER_SET_NEXT_SONG, payload: null });
    store.dispatch({ type: ActionTypes.PLAYER_NEXT_INDEX });
  }
};

export const gotoPrevSong = () => {
  const { songStack, current } = store.getState().player;
  let prevSongPath = songStack[songStack.length - 1];
  console.log('prevSongPath', prevSongPath);
  store.dispatch({ type: ActionTypes.PLAYER_SET_NEXT_SONG, payload: current });
  setSong(prevSongPath);
  store.dispatch({ type: ActionTypes.PLAYER_PREV_INDEX });
};

export const playAllFromDir = () => {};

//* * QUEUE ACTIONS */

/**
 * Inserts songPath into the next spot in the queue
 * @param songPath Absolute path to the song
 */
// export const insertIntoFrontOfQueue = (songPath: string, priority = false) => {
//   const { current } = store.getState().player;
//   const payload = {
//     priority,
//     path: songPath,
//   };
//   // if (current === null) {
//   //   return setSong(songPath);
//   // }
//   store.dispatch({
//     type: ActionTypes.PLAYER_APPEND_TO_QUEUE,
//     payload,
//   });
//   infoToast(`Added to queue`);
// };

export const insertIntoFrontOfQueue = (
  songPaths: Array<string>,
  priority = false
) => {
  const { current } = store.getState().player;
  const payload = {
    priority,
    paths: songPaths,
  };

  if (current === null) {
    const songPath = payload.paths.shift();
    setSong(songPath);
  }
  store.dispatch({
    type: ActionTypes.PLAYER_UPDATE_QUEUE,
    payload,
  });
  infoToast(`Added to queue`);
};
export const setQueue = (musicPaths: Array<string>, sample?: number) => {
  const cur = musicPaths.shift();
  setSong(cur);
  store.dispatch({
    type: ActionTypes.PLAYER_SET_QUEUE,
    payload: musicPaths,
  });

  // loadingSetter('app', true);
  // if (musicDir === '') {
  //   errorToast(`Music Directory is blank`);
  //   return store.dispatch({
  //     type: ActionTypes.PLAYER_SET_QUEUE,
  //     payload: [],
  //   });
  // }
  // infoToast(`Sampling ${sample} from '${musicDir}'`);
  // // GOOD CODE!!!
  // // parsePlaylist()
  // //   .then((q) => {
  // //     store.dispatch({
  // //       type: ActionTypes.PLAYER_SET_QUEUE,
  // //       payload: q,
  // //     });
  // //     return loadingSetter('app', false);
  // //   })
  // //   .catch((err) => {
  // //     return store.dispatch({
  // //       type: ActionTypes.PLAYER_SET_QUEUE,
  // //       payload: [],
  // //     });
  // //   });
  // return findAllSongPathsFromDir(musicDir, sample)
  //   .then((q) => {
  //     store.dispatch({
  //       type: ActionTypes.PLAYER_SET_QUEUE,
  //       payload: q,
  //     });
  //     return loadingSetter('app', false);
  //   })
  //   .catch((err) => {
  //     errorToast(err);
  //   });
};

export const shuffleQueue = () => {
  const { player } = store.getState();
  infoToast('Shuffling...');
  return store.dispatch({
    type: ActionTypes.PLAYER_SET_QUEUE,
    payload: _.shuffle(player.queue),
  });
};

export const removeFromQueue = (qIndex: number) => {
  return store.dispatch({
    type: ActionTypes.PLAYER_REMOVE_FROM_QUEUE,
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

export const moveQueueIndex = (i: number) => {
  // return store.dispatch({
  //   type: ActionTypes.PLAYER_SET_INDEX,
  //   payload: i,
  // });
};

export const updateCurrentTime = (t?: number) => {
  const { player } = store.getState();
  if (t) {
    return store.dispatch({
      type: ActionTypes.PLAYER_SET_TIME,
      payload: t,
    });
  }
  return store.dispatch({
    type: ActionTypes.PLAYER_SET_TIME,
    payload: player.currentTime + 1,
  });
};

export const setVol = (n: number) => {
  return store.dispatch({
    type: ActionTypes.PLAYER_SET_VOLUME,
    payload: n,
  });
};

ipcRenderer.on('onPickSongFromDevice', (e, args: Array<string>) => {
  const {
    player: { current },
  }: RootState = store.getState();
  // args.forEach((songPath: string) => {
  //   insertIntoFrontOfQueue(songPath);
  // });
  if (args.length) {
    if (current || getCombinedQueue().length > 0) {
      return insertIntoFrontOfQueue(args);
    }
    return setQueue(args);
  }
});
export default {};
