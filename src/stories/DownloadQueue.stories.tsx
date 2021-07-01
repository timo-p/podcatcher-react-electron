/* eslint-disable react/jsx-props-no-spreading */
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import DownloadQueue, {
  DownloadsProps,
} from '../components/DownloadQueue/DownloadQueue';
import { DownloadQueueItem } from '../reducers/types';

export default {
  title: 'Podcatcher/DownloadQueue',
  component: DownloadQueue,
  decorators: [
    (DownloadQueueStory) => (
      <div style={{ width: '200px' }}>
        <DownloadQueueStory />
      </div>
    ),
  ],
  argTypes: {
    progress: {
      defaultValue: 10,
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    speed: {
      defaultValue: 10,
      control: {
        type: 'range',
        min: 0,
        max: 10000,
        step: 1,
      },
    },
  },
} as Meta;

const downloadItem: DownloadQueueItem = {
  feedId: '8244b1b1e127ccaa9c1e9253f9e8a046411934652f83ca9e9d92abdb182bb428',
  filenameOnDisk: 'AMT395 Bobble Hats, the Hollywood Sign and the Macarena.mp3',
  postId: '4b8f7dfd1653396bd2ee46651b643bc297c0ef3f50a4b01fd049df4061fe4b77',
  progress: 0,
  size: 51317568,
  speed: 0,
  status: 'queued',
  title: 'AMT395: Bobble Hats, the Hollywood Sign and the Macarena',
  url:
    'https://podtrac.com/pts/redirect.mp3/traffic.libsyn.com/clean/secure/answermethis/Answer_Me_This_episode_395.mp3?dest-id=13097',
};

type StoryProps = DownloadsProps & { progress: number; speed: number };

const Template: Story<StoryProps> = ({
  progress,
  speed,
  downloads,
  ...rest
}: StoryProps) => {
  const downloadsProps = [
    { ...downloads[0], progress, speed },
    ...downloads.slice(1),
  ];
  return <DownloadQueue downloads={downloadsProps} {...rest} />;
};

export const Primary = Template.bind({});
Primary.args = {
  downloads: [
    {
      ...downloadItem,
      postId: '1',
      status: 'finished',
      speed: 0,
      progress: 100,
    },
    {
      ...downloadItem,
      postId: '2',
      status: 'downloading',
    },
    {
      ...downloadItem,
      postId: '3',
      status: 'queued',
    },
    {
      ...downloadItem,
      postId: '4',
      status: 'canceled',
    },
  ],
};
