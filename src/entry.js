import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.component';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
  runtime.register();

  window.onbeforeunload = () => {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  };
}
ReactDom.render(<App />, document.getElementById('app'));
