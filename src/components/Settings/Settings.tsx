import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import {
  IgnoreOlderThanUnit,
  Settings as SettingsType,
} from '../../reducers/types';
import styles from './Settings.css';

const { ipcRenderer } = require('electron');

type SettinsProps = {
  settings: SettingsType;
  saveSettings: (settings: SettingsType) => void;
  removeAllFeeds: () => void;
  removeAllPosts: () => void;
};

export default function Settings({
  settings,
  saveSettings,
  removeAllFeeds,
  removeAllPosts,
}: SettinsProps) {
  const {
    downloadDir: oldDownloadDir,
    ignoreOlderThan: oldIgnoreOlderThan,
    ignoreOlderThanUnit: oldIgnoreOlderThanUnit,
  } = settings;

  const [downloadDir, setDownloadDir] = React.useState(oldDownloadDir);

  const [ignoreOlderThan, setIgnoreOlderThan] = React.useState(
    oldIgnoreOlderThan
  );

  const [ignoreOlderThanUnit, setIgnoreOlderThanUnit] = React.useState(
    oldIgnoreOlderThanUnit
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ipcRenderer.on('open-dialog-paths-selected', (_event: any, arg: string[]) => {
    if (arg.length > 0) setDownloadDir(arg[0]);
  });

  const save = () =>
    saveSettings({
      downloadDir,
      ignoreOlderThan,
      ignoreOlderThanUnit,
    });

  const resetFeeds = () => {
    removeAllFeeds();
    removeAllPosts();
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4">Settings</Typography>
      </Box>
      <Box className={styles.marginTop}>
        <Typography>Download directory</Typography>
        <TextField
          className={styles.downloadDir}
          disabled
          value={downloadDir}
        />
        <Button
          variant="contained"
          onClick={() => {
            ipcRenderer.sendSync('show-open-dialog', downloadDir);
          }}
        >
          Select download directory
        </Button>
      </Box>
      <Box className={styles.marginTop}>
        <Typography>Ignore posts older than</Typography>
        <TextField
          type="number"
          value={ignoreOlderThan}
          required
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!Number.isNaN(value)) setIgnoreOlderThan(value);
          }}
        />
        <Select
          value={ignoreOlderThanUnit}
          onChange={(
            e: React.ChangeEvent<{
              name?: string;
              value: IgnoreOlderThanUnit | unknown;
            }>
          ) => {
            setIgnoreOlderThanUnit(e.target.value as IgnoreOlderThanUnit);
          }}
        >
          <MenuItem value="years">Years</MenuItem>
          <MenuItem value="months">Months</MenuItem>
          <MenuItem value="weeks">Weeks</MenuItem>
          <MenuItem value="days">Days</MenuItem>
        </Select>
      </Box>
      <Box className={styles.marginTop}>
        <Button variant="contained" color="primary" onClick={save}>
          Save
        </Button>
      </Box>
      <Box className={styles.marginTop}>
        <Button variant="contained" color="secondary" onClick={resetFeeds}>
          Reset feeds
        </Button>
      </Box>
    </Container>
  );
}
