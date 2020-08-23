import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Dashboard from './containers/Dashboard';
import { theme } from './theme';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from 'notistack';


let { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
              <Dashboard />
            </DndProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.querySelector('#root'),
);
