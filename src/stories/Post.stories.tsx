/* eslint-disable react/jsx-props-no-spreading */
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import Post, { PostProps } from '../components/Post/Post';

export default {
  title: 'Podcatcher/Post',
  component: Post,
} as Meta;

const Template: Story<PostProps> = (args) => <Post {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  setPostIsRead: () => {},
  addToDownloadQueue: () => {},
  processDownloadQueue: () => {},
  showFeedTitle: false,
  post: {
    description:
      'Jeff and Christian welcome Daanish Syed from Someone Should Make This back to the show this week to discuss bringing defunct theme park rides to VR, Microsoft trying to buy Nintendo, a first person mod for Mortal Kombat, and more!The Playlist: Immortals: Fenix Rising, Super Meat Boy Forever, Oceanhorn: Chronos Dungeon There Is No Game Wrong Dimension, Wilmot’s WarehouseVR Talk: Supernatural, Pistol Whip 2089, Microsoft Flight Simulator, Tetris EffectParting Gifts!',
    feedId: '2107b547002c1d33f2366b44ea7503639bb55d36cc133987a810e6fc2d17d82f',
    filename: 'dlc-373.mp3',
    filenameOnDisk: 'dlc-373.mp3',
    id: '0ac769ae2edfaf5ae9c034ad0f337d06d3036e47346bceac60bdfaed3943a098',
    isRead: false,
    pubDate: 'Mon, 11 Jan 2021 06:00:00 GMT',
    size: 60756737,
    title:
      '373: Daanish Syed - Microsoft tried to buy Nintendo? Immortals Fenix Rising, Super Meat Boy Forever, There Is No Game Wrong Dimension, Wilmot’s Warehouse',
    url:
      'https://pdst.fm/e/director.5by5.tv/d/dlc/5by5.cachefly.net/audio/broadcasts/dlc/2021/dlc-373.mp3',
  },
  feed: {
    description:
      "Helen Zaltzman and Olly Mann host the award-winning podcast that has been answering the world's questions since 2007. Visit the official website at answermethispodcast.com. Buy classic episodes, albums and apps at answermethisstore.com.",
    id: '8244b1b1e127ccaa9c1e9253f9e8a046411934652f83ca9e9d92abdb182bb428',
    lastChanged:
      'Sun Mar 14 2021 09:58:35 GMT+0200 (Eastern European Standard Time)',
    link: 'https://answermethis.libsyn.com/rss',
    posts: ['0ac769ae2edfaf5ae9c034ad0f337d06d3036e47346bceac60bdfaed3943a098'],
    title: 'Answer Me This!',
    url: 'http://answermethis.libsyn.com/rss',
  },
  fileExistsOnDisk: true,
};
