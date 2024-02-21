// src/store/index.js veya src/store/store.js dosyanızı güncelleyin

import { applyMiddleware, legacy_createStore as createStore, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { globalReducer } from "./reducers/globalReducer";

const rootReducer = combineReducers({
  global: globalReducer, // global anahtarını kullanarak globalReducer'ı ekleyin
  // Gelecekte buraya daha fazla reducer ekleyebilirsiniz
});

export const store = createStore(
  rootReducer, // rootReducer'ı kullanarak store'u oluşturun
  applyMiddleware(thunk, logger)
);
