/* eslint-disable react/jsx-props-no-spreading */
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import RefreshQueue, {
  RefreshQueueProps,
} from '../components/RefreshQueue/RefreshQueue';
import { RefreshQueueItem } from '../reducers/types';

export default {
  title: 'Podcatcher/RefreshQueue',
  component: RefreshQueue,
  decorators: [
    (RefreshQueueStory) => (
      <div style={{ width: '200px' }}>
        <RefreshQueueStory />
      </div>
    ),
  ],
  argTypes: {
    feeds: [],
  },
} as Meta;

const Template: Story<RefreshQueueProps> = (args) => {
  return <RefreshQueue {...args} />;
};

const feeds: RefreshQueueItem[] = [
  {
    status: 'processing',
    title: 'B-Movie Cast',
    url: 'http://bmoviecast.com/feed/podcast/',
  },
  {
    status: 'queued',
    title: 'BEST MOVIES NEVER MADE',
    url: 'https://anchor.fm/s/8d4ba18/podcast/rss',
  },
  {
    status: 'queued',
    title: "Bill Corbett's Funhouse",
    url: 'https://billcorbettsfunhouse.libsyn.com/rss',
  },
];

export const Primary = Template.bind({});
Primary.args = {
  feeds,
};
