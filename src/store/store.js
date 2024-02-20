import { applyMiddleware,legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers'; // Varsayılan olarak dışa aktarılan rootReducer'ınızın yolu
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store; // Store'u default olarak dışa aktarır
