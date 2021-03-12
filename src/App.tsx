import { Grid } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import 'fontsource-roboto';
import { BrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Persistor } from 'redux-persist/es/types';
import { PersistGate } from 'redux-persist/integration/react';
import './App.global.css';
import AddFeed from './containers/AddFeed';
import AddFeedBatch from './containers/AddFeedBatch';
import FeedPosts from './containers/FeedPosts';
import Feeds from './containers/Feeds';
import Menu from './containers/Menu';
import QueueTabButtons from './containers/QueueTabButtons';
import RefreshQueue from './containers/RefreshQueue';
import Settings from './containers/Settings';
import UnreadPosts from './containers/UnreadPosts';
import { StoreType } from './process.store';
import styles from './App.module.css';

type AppProps = {
  store: StoreType;
  persistor: Persistor;
  history: BrowserHistory;
};

export default function App({ store, persistor, history }: AppProps) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <Grid container>
            <Grid item xs={2}>
              <div className={styles.sticky}>
                <Menu />
                <Feeds />
              </div>
            </Grid>
            <Grid item xs={8}>
              <Switch>
                <Route path="/settings" component={Settings} />
                <Route path="/add-feed" component={AddFeed} />
                <Route path="/add-feed-batch" component={AddFeedBatch} />
                <Route path="/feeds/:feedId/posts" component={FeedPosts} />
                <Route path="/" exact component={UnreadPosts} />
              </Switch>
            </Grid>
            <Grid item xs={2}>
              <div className={styles.sticky}>
                <QueueTabButtons />
              </div>
            </Grid>
          </Grid>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  );
}
