import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.component';
let prom;
if (process.env.NODE_ENV !== 'production') {
  prom = import('./env/development');
} else {
  prom = import('./env/production');
}



prom.then(() => {
  ReactDom.render(<App />, document.getElementById('app'));
});
