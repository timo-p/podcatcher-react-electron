import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import CheckBoxOutlineBlankOutlined from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import path from 'path';
import React, { useState } from 'react';
import sanitize from 'sanitize-filename';
import { DownloadQueueItem } from '../../reducers/types';
import { Post as PostType } from '../../types/types';
import styles from './Post.css';

export type PostProps = {
  post: PostType;
  setPostIsRead: (postId: PostType['id'], isRead: boolean) => void;
  addToDownloadQueue: (items: DownloadQueueItem[]) => void;
  processDownloadQueue: () => void;
};

export default function Post(props: PostProps) {
  const {
    post,
    setPostIsRead,
    addToDownloadQueue,
    processDownloadQueue,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const download = () => {
    const title = sanitize(post.title);
    const file = title
      ? `${title}${path.extname(post.filename) || '.mp3'}`
      : post.filename;
    addToDownloadQueue([
      {
        postId: post.id,
        feedId: post.feedId,
        url: post.url,
        title: post.title,
        file,
        size: post.size,
        status: 'queued',
        progress: 0,
        speed: 0,
      },
    ]);
    processDownloadQueue();
  };

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
        <IconButton onClick={download}>
          <CloudDownload />
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
