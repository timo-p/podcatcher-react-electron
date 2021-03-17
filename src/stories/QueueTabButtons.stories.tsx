/* eslint-disable react/jsx-props-no-spreading */
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import { repeat } from 'ramda';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import QueueTabButtons, {
  QueueTabButtonsProps,
} from '../components/QueueTabButtons/QueueTabButtons';
import { DownloadQueueItem, RefreshQueueItem } from '../reducers/types';

const initialState = {
  download: {
    queue: [],
  },
  refresh: {
    queue: [],
  },
};
const store = createStore((state = initialState) => state);
export default {
  title: 'Podcatcher/QueueTabButtons',
  component: QueueTabButtons,
  decorators: [
    (QueueTabButtonsStory) => (
      <Provider store={store}>
        <div style={{ width: '200px' }}>
          <QueueTabButtonsStory />
        </div>
      </Provider>
    ),
  ],
  argTypes: {
    downloads: {
      defaultValue: 0,
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    refreshes: {
      defaultValue: 0,
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} as Meta;

const downloadQueueItem: DownloadQueueItem = {
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

const refreshQueueItem: RefreshQueueItem = {
  status: 'queued',
  title: "Dan Carlin's Hardcore History",
  url: 'http://feeds.feedburner.com/dancarlin/history?format=xml',
};

type StoryProps = QueueTabButtonsProps & {
  downloads: number;
  refreshes: number;
};

const Template: Story<StoryProps> = ({
  downloads,
  refreshes,
  downloadQueue,
  refreshQueue,
  ...args
}: StoryProps) => {
  return (
    <QueueTabButtons
      downloadQueue={repeat(downloadQueueItem, downloads)}
      refreshQueue={repeat(refreshQueueItem, refreshes)}
      {...args}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  refreshQueue: [],
  downloadQueue: [],
  downloads: 0,
  refreshes: 0,
};
