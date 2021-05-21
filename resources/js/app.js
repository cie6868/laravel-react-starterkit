import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import LoadingIndicator from './components/LoadingIndicator';
import store from './store';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/App');

if (document.getElementById('react-root')) {
  const persistor = persistStore(store);
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<LoadingIndicator/>} persistor={persistor}>
        <App env={process.env}/>
      </PersistGate>
    </Provider>,
    document.getElementById('react-root'),
  );
}
