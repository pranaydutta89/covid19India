import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.component';
let prom;
if (process.env.NODE_ENV !== 'production') {
  prom = import('./env/development');
} else {
  prom = import('./env/production');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

prom.then(() => {
  ReactDom.render(<App />, document.getElementById('app'));
});
