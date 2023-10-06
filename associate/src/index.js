import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import { ProSidebarProvider } from 'react-pro-sidebar';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
