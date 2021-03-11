import { connect } from 'react-redux';
import RefreshQueue from '../components/RefreshQueue/RefreshQueue';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    feeds: state.refresh.queue,
  };
}

export default connect(mapStateToProps)(RefreshQueue);
