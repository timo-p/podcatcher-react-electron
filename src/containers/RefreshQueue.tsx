import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeFromRefreshQueue } from '../actions';
import RefreshQueue from '../components/RefreshQueue/RefreshQueue';
import { Dispatch, PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    feeds: state.refresh.queue,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      removeFromRefreshQueue,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RefreshQueue);
