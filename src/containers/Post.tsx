import fs from 'fs';
import path from 'path';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  addToDownloadQueue,
  processDownloadQueue,
  setPostIsRead,
} from '../actions';
import Post, { PostProps } from '../components/Post/Post';
import { PodcatcherStateType, Settings } from '../reducers/types';

type StateProps = Pick<Settings, 'downloadDir'>;

type DispatchProps = Pick<
  PostProps,
  'setPostIsRead' | 'addToDownloadQueue' | 'processDownloadQueue'
>;

type OwnProps = Pick<PostProps, 'post' | 'feed'>;

function mapStateToProps(state: PodcatcherStateType) {
  return {
    downloadDir: state.settings.downloadDir,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setPostIsRead,
      addToDownloadQueue,
      processDownloadQueue,
    },
    dispatch
  );
}

function mergeProps(
  { downloadDir, ...restStateProps }: StateProps,
  dispatchProps: DispatchProps,
  { post, feed, ...restOwnProps }: OwnProps
): PostProps {
  const fileOnDisk = path.join(downloadDir, feed.title, post.filenameOnDisk);
  const fileExistsOnDisk = fs.existsSync(fileOnDisk);

  return {
    ...restStateProps,
    ...dispatchProps,
    post,
    feed,
    ...restOwnProps,
    fileExistsOnDisk,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Post);
