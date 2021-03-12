import os from 'os';
import { SAVE_SETTINGS, SettingsActions } from '../actions';
import { Settings } from './types';

export const initialState: Settings = {
  downloadDir: os.tmpdir(),
  ignoreOlderThan: 1,
  ignoreOlderThanUnit: 'years',
};

export default function settings(
  state: Settings = initialState,
  action: SettingsActions
) {
  switch (action.type) {
    case SAVE_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
