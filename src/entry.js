import utilityService from './services/utils.service';
if (utilityService.IsWebView) {
  window.open(location.href, '_system');
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
