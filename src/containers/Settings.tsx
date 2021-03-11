import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  saveSettings,
  removeAllFeeds,
  removeAllPosts,
} from '../actions/podcatcher';
import Settings from '../components/Settings/Settings';
import { PodcatcherStateType } from '../reducers/types';

function mapStateToProps(state: PodcatcherStateType) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      saveSettings,
      removeAllFeeds,
      removeAllPosts,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
