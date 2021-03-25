import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import log from 'electron-log';
import fs from 'fs';
import React from 'react';
import {
  IgnoreOlderThanUnit,
  PodcatcherStateType,
  Settings as SettingsType,
} from '../../reducers/types';
import Section from '../Section/Section';

const { ipcRenderer } = require('electron');

type SettingsProps = {
  state: PodcatcherStateType;
  saveSettings: (settings: SettingsType) => void;
  removeAllFeeds: () => void;
  removeAllPosts: () => void;
  removeAllDownloadQueueItems: () => void;
  removeAllRefreshQueueItems: () => void;
  removeAllDownloadRemoveQueueItems: () => void;
};

const getLogtail = (logFile: string, length: number): Promise<string> => {
  if (fs.existsSync(logFile)) {
    const tailLength = -1 * length;
    return new Promise((resolve, reject) => {
      let content = '';
      const stream = fs.createReadStream(logFile, { encoding: 'utf8' });
      stream.on('data', (chunk) => {
        content = (content + chunk).slice(tailLength);
      });
      stream.on('end', () => {
        resolve(content);
      });
      stream.on('error', (e) => {
        reject(e);
      });
    });
  }
  return Promise.resolve('');
};

export default function Settings({
  state,
  saveSettings,
  removeAllFeeds,
  removeAllPosts,
  removeAllDownloadQueueItems,
  removeAllRefreshQueueItems,
  removeAllDownloadRemoveQueueItems,
}: SettingsProps) {
  const {
    downloadDir: oldDownloadDir,
    ignoreOlderThan: oldIgnoreOlderThan,
    ignoreOlderThanUnit: oldIgnoreOlderThanUnit,
  } = state.settings;

  const [downloadDir, setDownloadDir] = React.useState(oldDownloadDir);

  const [ignoreOlderThan, setIgnoreOlderThan] = React.useState(
    oldIgnoreOlderThan
  );

  const [ignoreOlderThanUnit, setIgnoreOlderThanUnit] = React.useState(
    oldIgnoreOlderThanUnit
  );

  const selectDownloadDir = () => {
    ipcRenderer
      .invoke('show-open-dialog', downloadDir)
      .then((result: string[] | undefined) => {
        if (result && result.length > 0) setDownloadDir(result[0]);
        return result;
      })
      .catch((e: unknown) => {
        log.error(`Failed to invoke event: ${e}`);
      });
  };

  const save = () =>
    saveSettings({
      downloadDir,
      ignoreOlderThan,
      ignoreOlderThanUnit,
    });

  const [debugToolsOpen, setDebugToolsOpen] = React.useState(false);

  const dumpState = () => log.info(JSON.stringify(state));

  const logFile = log.transports.file.getFile().path;

  const [logTail, setLogTail] = React.useState('');
  const reloadLogFile = () =>
    getLogtail(logFile, 10000)
      .then(setLogTail)
      .catch((e) => {
        log.error(`Failed to read log file. Error: ${e}`);
      });

  React.useEffect(() => {
    reloadLogFile();
  }, []);

  return (
    <>
      <Typography variant="h4">Settings</Typography>
      <Section>
        <Typography>Download directory</Typography>
        <TextField fullWidth disabled value={downloadDir} />
        <Button variant="contained" onClick={selectDownloadDir}>
          Select download directory
        </Button>
      </Section>
      <Section>
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
      </Section>
      <Section>
        <Button variant="contained" color="primary" onClick={save}>
          Save
        </Button>
      </Section>
      <Section>
        <FormControlLabel
          control={
            <Checkbox
              checked={debugToolsOpen}
              onChange={() => setDebugToolsOpen(!debugToolsOpen)}
              name="checkedA"
            />
          }
          label="Show debug tools"
        />
      </Section>
      <Collapse in={debugToolsOpen}>
        <Section>
          <Typography>Log file</Typography>
          <TextField
            fullWidth
            disabled
            value={log.transports.file.getFile().path}
          />
        </Section>
        <TextField
          variant="outlined"
          multiline
          fullWidth
          disabled
          rows={10}
          value={logTail}
        />
        <Section>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={reloadLogFile}
                startIcon={<Replay />}
              >
                Reload log file
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={dumpState}>
                Dump state to log
              </Button>
            </Grid>
          </Grid>
        </Section>
        <Section>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={removeAllFeeds}
              >
                Reset feeds state
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={removeAllPosts}
              >
                Reset posts state
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={removeAllDownloadQueueItems}
              >
                Reset download queue state
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={removeAllDownloadRemoveQueueItems}
              >
                Reset download remove queue state
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={removeAllRefreshQueueItems}
              >
                Reset refresh queue state
              </Button>
            </Grid>
          </Grid>
        </Section>
      </Collapse>
    </>
  );
}
