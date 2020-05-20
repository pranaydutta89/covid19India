import React, { PureComponent } from 'react';
import HomeComponent from './home.component';
import { BrowserRouter } from 'react-router-dom';
import pushNotificationService from '../services/pushNotification.service';
import SpeedDialComponent from './common/speedDial.component';

const css = `
   .zone-green{
     background-color:#7af87a54;
   }
   .zone-red{
     background-color:#fe410e2e;
   }
   .zone-orange{
     background-color:#ffa5005c
   }
   .card-wrap{
               margin-bottom:10px;
           }
`
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
        <style>{css}</style>
        <BrowserRouter>
          <HomeComponent />
          <SpeedDialComponent />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
