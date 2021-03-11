import { List } from '@material-ui/core';
import React from 'react';
import Post from '../../containers/Post';
import { Post as PostType } from '../../types/types';

type PostsProps = {
  posts: PostType[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <List>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </List>
    </>
  );
}
