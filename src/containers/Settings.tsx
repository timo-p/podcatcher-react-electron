import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  saveSettings,
  removeAllFeeds,
  removeAllPosts,
  removeAllDownloadQueueItems,
  removeAllRefreshQueueItems,
} from '../actions';
import Settings from '../components/Settings/Settings';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      saveSettings,
      removeAllFeeds,
      removeAllPosts,
      removeAllDownloadQueueItems,
      removeAllRefreshQueueItems,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
