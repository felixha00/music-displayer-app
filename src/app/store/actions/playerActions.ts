import os from 'os';
import electron from 'electron';
import { getMetadata } from '../../../utils/file';
import store from '../store';
import ActionTypes from '../actionTypes';
import { PaletteColors, usePalette } from 'react-palette';
import { ISong } from '../../../utils/types';

const { ipcRenderer } = electron;

export const setSong = async (songPath: string) => {
  const metadata: ISong = await getMetadata(
    songPath
    // '高音質Ringed Genesis - EdelritterArcaea.mp3'
  );
  store.dispatch({ type: ActionTypes.PLAYER_SET_SONG, payload: metadata });
};

export const setPalette = (palette: PaletteColors) => {
  store.dispatch({
    type: ActionTypes.PLAYER_SET_COLOR_PALETTE,
    payload: palette,
  });
};

export default {};
