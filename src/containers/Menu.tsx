import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addFeed, addPosts } from '../actions/podcatcher';
import Menu from '../components/Menu/Menu';

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addFeed,
      addPosts,
    },
    dispatch
  );
}

export default connect(undefined, mapDispatchToProps)(Menu);
