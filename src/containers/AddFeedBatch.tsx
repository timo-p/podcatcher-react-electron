import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addToRefreshQueue, processRefreshQueue } from '../actions';
import AddFeedBatch from '../components/AddFeedBatch/AddFeedBatch';

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addToRefreshQueue,
      processRefreshQueue,
    },
    dispatch
  );
}
export default connect(undefined, mapDispatchToProps)(AddFeedBatch);
