import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";

import createRootReducer from "../Reducers";
import rootSaga from "../Sagas";

const initialState = {};
const enhancers = [];
const middlewares = [];

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  typeof devToolsExtension === "function" &&
    enhancers.push(devToolsExtension());

  middlewares.push(logger);
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

const store = createStore(
  createRootReducer(history),
  initialState,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export default store;
