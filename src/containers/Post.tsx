import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Post from '../components/Post/Post';
import {
  setPostIsRead,
  addToDownloadQueue,
  processDownloadQueue,
} from '../actions';

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

export default connect(undefined, mapDispatchToProps)(Post);
