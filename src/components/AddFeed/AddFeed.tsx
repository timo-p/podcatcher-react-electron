import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { RefreshQueueItem } from '../../reducers/types';
import Section from '../Section/Section';

type AddFeedProps = {
  queueUrls: string[];
  addToRefreshQueue: (items: RefreshQueueItem[]) => void;
  processRefreshQueue: () => void;
};

export default function AddFeed({
  queueUrls,
  addToRefreshQueue,
  processRefreshQueue,
}: AddFeedProps) {
  const [url, setUrl] = React.useState('');
  const add = () => {
    addToRefreshQueue([
      {
        url,
        status: 'queued',
      },
    ]);
    processRefreshQueue();
  };
  const disabled = !!url && queueUrls.includes(url);
  return (
    <>
      <Typography variant="h4">Add Feed</Typography>
      <TextField
        variant="outlined"
        fullWidth
        disabled={disabled}
        onChange={(event) => setUrl(event.target.value)}
      />
      <Section>
        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={() => url && add()}
        >
          Add
        </Button>
      </Section>
    </>
  );
}
