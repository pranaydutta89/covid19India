import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.component';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
ReactDom.render(<App />, document.getElementById('app'));