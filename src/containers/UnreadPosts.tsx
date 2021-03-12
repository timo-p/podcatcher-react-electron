import { push } from 'connected-react-router';
import { sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { removeFeed } from '../actions';
import Posts from '../components/Posts/Posts';
import { PodcatcherStateType } from '../reducers/types';
import filterUnreadPosts from '../utils/filterUnreadPosts';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    posts: sortBy(
      (post) => new Date(post.pubDate),
      filterUnreadPosts(values(state.posts))
    ).reverse(),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      removeFeed,
      push,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
