import { Settings } from '../reducers/types';

export const SAVE_SETTINGS = 'SAVE_SETTINGS';

export interface SaveSettingsAction {
  type: typeof SAVE_SETTINGS;
  payload: Settings;
}

export function saveSettings(settings: Settings): SaveSettingsAction {
  return {
    type: SAVE_SETTINGS,
    payload: settings,
  };
}

export type SettingsActions = SaveSettingsAction;
