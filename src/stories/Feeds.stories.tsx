/* eslint-disable react/jsx-props-no-spreading */
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Feeds, { FeedsProps } from '../components/Feeds/Feeds';

export default {
  title: 'Podcatcher/Feeds',
  component: Feeds,
  decorators: [
    (FeedsStory) => (
      <Router>
        <FeedsStory />
      </Router>
    ),
  ],
  argTypes: {
    markAllPostsRead: () => {},
    addToRefreshQueue: () => {},
    processRefreshQueue: () => {},
    feedsAndUnreadPosts: [],
  },
} as Meta;

const Template: Story<FeedsProps> = (args) => <Feeds {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  feedsAndUnreadPosts: [
    {
      feed: {
        title: "Dan Carlin's Hardcore History",
        description:
          'In "Hardcore History" journalist and broadcaster Dan Carlin takes his "Martian", unorthodox way of thinking and applies it to the past. Was Alexander the Great as bad a person as Adolf Hitler? What would Apaches with modern weapons be like? Will our modern civilization ever fall like civilizations from past eras? This isn\'t academic history (and Carlin isn\'t a historian) but the podcast\'s unique blend of high drama, masterful narration and Twilight Zone-style twists has entertained millions of listeners.',
        id: '63a3e136198c98139b92e39bbfd31bf62ebfb38c9384a1e3fd198d14958968f0',
        link: 'http://feeds.feedburner.com/dancarlin/history',
        url: 'http://feeds.feedburner.com/dancarlin/history?format=xml',
        lastChanged:
          'Tue Mar 16 2021 17:59:21 GMT+0200 (Eastern European Standard Time)',
        posts: [],
      },
      unreadPosts: 5,
    },
    {
      feed: {
        title: 'The Flop House',
        description: 'A Podcast About Bad Movies',
        id: '27fd61082cdb519854733b361a0d85d2ef0d7f0a354442f9a430b312618a0cc1',
        link: 'https://www.flophousepodcast.com/feed/',
        url: 'https://www.flophousepodcast.com/feed/',
        lastChanged:
          'Tue Mar 16 2021 17:59:18 GMT+0200 (Eastern European Standard Time)',
        posts: [],
      },
      unreadPosts: 0,
    },
    {
      feed: {
        title: 'The Next Picture Show',
        description:
          'A biweekly roundtable by the former editorial team of The Dissolve examining how classic films inspire and inform modern movies. Episodes take a deep dive into a classic film and its legacy in the first half, then compare and contrast that film with a modern successor in the second. Hosted and produced by Genevieve Koski, Keith Phipps, Tasha Robinson and Scott Tobias. Part of the Filmspotting family of podcasts.',
        id: '8104d763e1b2404366ac66e72eb14fd60e824420b5014b0b0718dcdf39f581bd',
        link: 'https://feeds.megaphone.fm/FLM2375047009',
        url: 'http://feeds.megaphone.fm/FLM2375047009',
        lastChanged:
          'Tue Mar 16 2021 17:59:19 GMT+0200 (Eastern European Standard Time)',
        posts: [],
      },
      unreadPosts: 151,
    },
    {
      feed: {
        title: 'This American Life',
        description:
          'This American Life is a weekly public radio show, heard by 2.2 million people on more than 500 stations. Another 2.5 million people download the weekly podcast. It is hosted by Ira Glass, produced in collaboration with Chicago Public Media, delivered to stations by PRX The Public Radio Exchange, and has won all of the major broadcasting awards.',
        id: 'fae7007abaa8bd47c5e7633d5df013c82f6dce706a6125febb945333719c96bc',
        link: 'http://feed.thisamericanlife.org/talpodcast',
        url: 'http://feed.thisamericanlife.org/talpodcast',
        lastChanged:
          'Tue Mar 16 2021 17:59:19 GMT+0200 (Eastern European Standard Time)',
        posts: [],
      },
      unreadPosts: 0,
    },
    {
      feed: {
        title: 'Trumpcast',
        description:
          "A quasi-daily podcast from Slate chronicling Donald Trump's rise to the presidency and his current administration. Journalists Virginia Heffernan and León Krauze talk to reporters, historians, psychiatrists, and other experts to help explain who this man is and why this is happening, right now, in the United States of America.",
        id: '30cc889cdf4bf4366b832e4fe5085c14a916f90f49221f2b06af266cdd4b2606',
        link: 'https://feeds.megaphone.fm/trumpcast',
        url: 'http://feeds.megaphone.fm/trumpcast',
        lastChanged:
          'Tue Mar 16 2021 17:59:21 GMT+0200 (Eastern European Standard Time)',
        posts: [],
      },
      unreadPosts: 295,
    },
  ],
};
