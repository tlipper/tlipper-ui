// configureStore.js

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunkMiddleware from 'redux-thunk'

import throttle from "redux-throttle";

import twitchVodderApp from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const loggerMiddleware = createLogger()

const persistedReducer = persistReducer(persistConfig, twitchVodderApp)

const defaultWait = 300
const defaultThrottleOption = { // https://lodash.com/docs#throttle
    leading: true,
    trailing: true
}

const throttleMiddleware = throttle(defaultWait, defaultThrottleOption);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(throttleMiddleware, thunkMiddleware, loggerMiddleware))
  let persistor = persistStore(store)
  return { store, persistor }
}
