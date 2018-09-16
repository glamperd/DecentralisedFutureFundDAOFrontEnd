import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import providerReducer from './reducers/providers';
import accountsIndexReducer from './reducers/accountsindex';
import menuReducer from './reducers/menu';

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({ 
	provider: providerReducer, 
	accounts: accountsIndexReducer,
	menu: menuReducer });

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
  let persistor = persistStore(store);
  return { store, persistor };
}