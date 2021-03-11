import { routerMiddleware } from 'connected-react-router';
import Store from 'electron-store';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers';
import mySaga from './sagas';

export const history = createBrowserHistory();

const electronStore = new Store();
const persistConfig = {
  key: 'root',
  storage: createElectronStorage({ electronStore }),
  blacklist: ['router'],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer<any, any>(
  persistConfig,
  createRootReducer(history)
);

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(logger, routerMiddleware(history), sagaMiddleware)
);

const store = createStore(persistedReducer, undefined, enhancer);
export const persistor = persistStore(store);
sagaMiddleware.run(mySaga);

export default store;

type StoreType = typeof store;
export type { StoreType };
