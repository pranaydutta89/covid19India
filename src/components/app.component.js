import React, { PureComponent } from 'react';
import HomeComponent from './home.component';
import { BrowserRouter } from 'react-router-dom';
import pushNotificationService from '../services/pushNotification.service';

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      showPermissionsPage: null,
      showAboutPage: false,
    };
  }

  componentDidMount() {
    //ask for push notificaiton permission after some time
    setTimeout(() => {
      pushNotificationService.Permissions();
    }, 7000);
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
