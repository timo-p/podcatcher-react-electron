/* eslint-disable react/jsx-props-no-spreading */
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Menu from '../components/Menu/Menu';

export default {
  title: 'Podcatcher/Menu',
  component: Menu,
  decorators: [
    (MenuStory) => (
      <Router>
        <MenuStory />
      </Router>
    ),
  ],
  argTypes: {
    addFeed: () => {},
    addPosts: () => {},
  },
} as Meta;

const Template: Story = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
