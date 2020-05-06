import React from 'react';
import HomeComponent from './home.component';
import PermissionsComponent from './permissions.components';
import storageService from '../services/storage.service';
import AboutComponent from './about.component';
import { Fab } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import pushNotificationService from '../services/pushNotification.service';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPermissionsPage: null,
      showAboutPage: false,
    };
  }


  componentWillMount() {
    //ask for push notificaiton permission after some time
    setTimeout(() => {
      pushNotificationService.Permissions();
    }, 5000)
  }
  render() {

    return (
      <>
        <BrowserRouter>
          <HomeComponent />
        </BrowserRouter>
      </>
    );

  }
}

export default App;