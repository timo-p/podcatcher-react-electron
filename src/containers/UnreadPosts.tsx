import { push } from 'connected-react-router';
import { values } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { removeFeed, markPostsRead } from '../actions';
import UnreadPosts from '../components/UnreadPosts/UnreadPosts';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  const { posts, feeds } = state;
  return {
    posts: values(posts),
    feeds,
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
