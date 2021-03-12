import { connect } from 'react-redux';
import QueueTabButtons from '../components/QueueTabButtons/QueueTabButtons';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    refreshQueue: state.refresh.queue,
    downloadQueue: state.download.queue,
  };
}

export default connect(mapStateToProps)(QueueTabButtons);
