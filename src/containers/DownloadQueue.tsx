import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addToDownloadRemoveQueue } from '../actions';
import DownloadQueue from '../components/DownloadQueue/DownloadQueue';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    downloads: state.download.queue,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addToDownloadRemoveQueue,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadQueue);
