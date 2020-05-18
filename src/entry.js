import utilityService from './services/utils.service';
if (utilityService.IsWebView) {
  try {
    window.open("googlechrome://navigate?url=" + location.href, "_system");
  } catch (e) {
    console.warn(e)
  }
}

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
if (path) {
  history.replace(path);
}

import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.component';
import serviceWorkerService from './services/serviceWorker.service';

serviceWorkerService.register();

ReactDom.render(<App />, document.getElementById('app'));
