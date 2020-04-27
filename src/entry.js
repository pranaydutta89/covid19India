import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.component';
let prom;
if (process.env.NODE_ENV !== 'production') {
  prom = import('./env/development');
} else {
  prom = import('./env/production');
}

import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
prom.then(() => {
  ReactDom.render(<App />, document.getElementById('app'));
});
