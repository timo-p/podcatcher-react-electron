import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import { CloudDownload, CloudDone } from '@material-ui/icons';
import CheckBoxOutlineBlankOutlined from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import { DownloadQueueItem } from '../../reducers/types';
import { Feed, Post as PostType } from '../../types/types';
import styles from './Post.module.css';

export type PostProps = {
  post: PostType;
  feed: Feed;
  showFeedTitle: boolean;
  fileExistsOnDisk: boolean;
  setPostIsRead: (postId: PostType['id'], isRead: boolean) => void;
  addToDownloadQueue: (items: DownloadQueueItem[]) => void;
  processDownloadQueue: () => void;
};

export default function Post(props: PostProps) {
  const {
    post,
    feed,
    showFeedTitle,
    fileExistsOnDisk,
    setPostIsRead,
    addToDownloadQueue,
    processDownloadQueue,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const download = () => {
    addToDownloadQueue([
      {
        postId: post.id,
        feedId: post.feedId,
        url: post.url,
        title: post.title,
        filenameOnDisk: post.filenameOnDisk,
        size: post.size,
        status: 'queued',
        progress: 0,
        speed: 0,
      },
    ]);
    processDownloadQueue();
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        title={
          <div>
            {showFeedTitle && (
              <Typography variant="caption">{feed.title}</Typography>
            )}
            <Typography>{post.title}</Typography>
          </div>
        }
        onClick={() => setIsExpanded(!isExpanded)}
        subheader={`${formatDistanceToNow(new Date(post.pubDate))} ago`}
        classes={{ title: styles.title }}
      />
      <CardActions disableSpacing>
        <IconButton onClick={() => setPostIsRead(post.id, !post.isRead)}>
          {post.isRead ? (
            <CheckBoxOutlined />
          ) : (
            <CheckBoxOutlineBlankOutlined />
          )}
        </IconButton>
        <IconButton onClick={download}>
          <CloudDownload />
        </IconButton>
        {fileExistsOnDisk && <CloudDone color="primary" />}
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
