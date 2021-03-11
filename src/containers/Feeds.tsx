import { prop, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  markAllPostsRead,
  addToRefreshQueue,
  processRefreshQueue,
} from '../actions/podcatcher';
import Feeds from '../components/Feeds/Feeds';
import { PodcatcherStateType } from '../reducers/types';
import filterUnreadPosts from '../utils/filterUnreadPosts';

function mapStateToProps(state: PodcatcherStateType) {
  const feedsAndUnreadPosts = sortBy(prop('title'), values(state.feeds)).map(
    (feed) => ({
      feed,
      unreadPosts: filterUnreadPosts(
        feed.posts.map((postId) => state.posts[postId])
      ).length,
    })
  );
  return {
    feedsAndUnreadPosts,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      markAllPostsRead,
      addToRefreshQueue,
      processRefreshQueue,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Feeds);
