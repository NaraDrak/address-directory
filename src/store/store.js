import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import debounce from "debounce-promise";

import reducer from "./reducer";

import DataCache from "./dataCache";

const logger = store => next => action => {
 
  return next(action);
};

export const setupStore = ({ httpApi }) => {

  const middleware = [];

  middleware.push(
    reduxThunk.withExtraArgument({
      debounce,
      httpApi: httpApi,
      dataCache: new DataCache(),
    }),
  );

  if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
  }

  return createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(...middleware),
    ),
  );
};
