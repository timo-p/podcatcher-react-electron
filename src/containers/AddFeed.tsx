import { map, prop } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addToRefreshQueue, processRefreshQueue } from '../actions';
import AddFeed from '../components/AddFeed/AddFeed';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    queueUrls: map(prop('url'), state.refresh.queue),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addToRefreshQueue,
      processRefreshQueue,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFeed);
