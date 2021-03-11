import { Button, Menu as MuiMenu, MenuItem } from '@material-ui/core';
import { range } from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';
import { ParsedFeed, Post } from '../../types/types';
import generateFeed from '../../utils/generateFeed';
import generatePost from '../../utils/generatePost';

type MenuProps = {
  addFeed: (feed: ParsedFeed) => void;
  addPosts: (posts: Post[]) => void;
};

export default function Menu({ addFeed, addPosts }: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>(
    undefined
  );
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        Menu
      </Button>
      <MuiMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClick={() => setAnchorEl(undefined)}
      >
        <MenuItem>
          <Link to="/add-feed">Add feed</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/add-feed-batch">Add a batch of feeds</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/">Unread</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/settings">Settings</Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            const feedWithoutPosts = generateFeed();
            const posts = range(0, 10).map(() =>
              generatePost(feedWithoutPosts.id)
            );
            const feed = { ...feedWithoutPosts, posts: posts.map((p) => p.id) };
            addFeed(feed);
            addPosts(posts);
          }}
        >
          Generate feed
        </MenuItem>
      </MuiMenu>
    </div>
  );
}
