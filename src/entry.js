import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.component';
import serviceWorkerService from './services/serviceWorker.service';
import userService from './services/user.service';

serviceWorkerService.register();

ReactDom.render(<App />, document.getElementById('app'));
