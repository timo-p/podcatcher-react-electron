import { push } from 'connected-react-router';
import { sortBy } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  markPostsRead,
  removeFeed,
  removePosts,
  addToRefreshQueue,
  processRefreshQueue,
} from '../actions';
import FeedPosts from '../components/FeedPosts/FeedPosts';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(
  state: PodcatcherStateType,
  ownProps: { match: { params: { feedId: string } } }
) {
  const {
    match: {
      params: { feedId },
    },
  } = ownProps;

  const feed = state.feeds[feedId];

  return {
    feed,
    posts: feed
      ? sortBy(
          (post) => new Date(post.pubDate),
          feed.posts.map((postId) => state.posts[postId])
        ).reverse()
      : [],
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      removeFeed,
      removePosts,
      markPostsRead,
      push,
      addToRefreshQueue,
      processRefreshQueue,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPosts);
