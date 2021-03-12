import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Post from '../components/Post/Post';
import { setPostIsRead } from '../actions';

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setPostIsRead,
    },
    dispatch
  );
}

export default connect(undefined, mapDispatchToProps)(Post);
