import { ipcRenderer } from 'electron';
import { Action } from '../../../utils/types';
import ActionTypes from '../actionTypes';

export type SettingsState = {
  config: SettingsConfig;
};

export type SettingsConfig = {
  musicDir: string;
  enableControls: boolean;
  enableSpectrum: boolean;
  enableInfo: true;
  enableParticles: boolean;
  enableGIFExtra: boolean;
  enableShowNext: boolean;
  enableBassGradient: boolean;
  enableReactiveTitle: boolean;
  enableReactiveBgScale: boolean;
};

const initialState: SettingsState = {
  config: {
    musicDir: 'D:\\Songs\\かめりあ(Camellia) - U.U.F.O (mp3)',
    enableControls: true,
    enableSpectrum: true,
    enableInfo: true,
    enableParticles: true,
    enableGIFExtra: true,
    enableBassGradient: true,
    enableShowNext: true,
    enableReactiveTitle: true,
    enableReactiveBgScale: true,
  },
};

export default (state = initialState, action: Action): SettingsState => {
  switch (action.type) {
    case ActionTypes.SETTINGS_SET: {
      const newState = {
        ...state,
        config: { ...state.config, ...action.payload },
      };
      // eStore.set('settings', newState);
      // console.log(eStore.get('settings'));
      return newState;
    }
    case ActionTypes.SETTINGS_TOGGLE_CONTROLS: {
      const newState = {
        ...state,
        config: {
          ...state.config,
          [action.payload]: !state.config[action.payload],
        },
      };
      // eStore.set('settings', newState);
      // console.log(eStore.get('settings'));
      return newState;
    }
    default: {
      return state;
    }
  }
};
