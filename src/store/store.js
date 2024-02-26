// src/store/index.js veya src/store/store.js dosyanızı güncelleyin

import { applyMiddleware, legacy_createStore as createStore, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { globalReducer } from "./reducers/globalReducer";
import { userReducer } from "./reducers/userReducer";
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  // Gelecek
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);
