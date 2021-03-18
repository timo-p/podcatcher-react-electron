import { push } from 'connected-react-router';
import { sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { removeFeed, markPostsRead } from '../actions';
import UnreadPosts from '../components/UnreadPosts/UnreadPosts';
import { PodcatcherStateType } from '../reducers/types';
import filterUnreadPosts from '../utils/filterUnreadPosts';

function mapStateToProps(state: PodcatcherStateType) {
  const posts = sortBy(
    (post) => new Date(post.pubDate),
    filterUnreadPosts(values(state.posts))
  ).reverse();
  return {
    posts,
    feeds: state.feeds,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      removeFeed,
      push,
      markPostsRead,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UnreadPosts);
