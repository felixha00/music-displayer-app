import { Action } from '../../../utils/types';
import ActionTypes from '../actionTypes';

export type SettingsState = {
  musicDir: string;
  config: SettingsConfig;
};

export type SettingsConfig = {
  musicDir: string;
  enableControls: boolean;
};

const initialState: SettingsState = {
  musicDir: '',
  config: {
    musicDir: '',
    enableControls: true,
  },
};

export default (state = initialState, action: Action): SettingsState => {
  switch (action.type) {
    case ActionTypes.SETTINGS_SET: {
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
};
