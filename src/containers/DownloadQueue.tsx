import { connect } from 'react-redux';
import DownloadQueue from '../components/DownloadQueue/DownloadQueue';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    downloads: state.download.queue,
  };
}

export default connect(mapStateToProps)(DownloadQueue);
