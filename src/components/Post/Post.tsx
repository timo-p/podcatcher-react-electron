import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from '@material-ui/core';
import CheckBoxOutlineBlankOutlined from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import { Post as PostType } from '../../types/types';
import styles from './Post.css';

type Props = {
  post: PostType;
  setPostIsRead: (postId: PostType['id'], isRead: boolean) => void;
};

export default function Post(props: Props) {
  const { post, setPostIsRead } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader
        title={post.title}
        onClick={() => setIsExpanded(!isExpanded)}
        subheader={`${formatDistanceToNow(new Date(post.pubDate))} ago`}
        classes={{ title: styles.title }}
      />
      <CardActions>
        <IconButton onClick={() => setPostIsRead(post.id, !post.isRead)}>
          {post.isRead ? (
            <CheckBoxOutlined />
          ) : (
            <CheckBoxOutlineBlankOutlined />
          )}
        </IconButton>
        <IconButton
          className={classNames(styles.expand, {
            [styles.expanded]: isExpanded,
          })}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={isExpanded}>
        <CardContent>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
