import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import Dashboard from './containers/Dashboard';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'


let { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.querySelector('#root'),
);
