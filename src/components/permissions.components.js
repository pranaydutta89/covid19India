import React, { Component } from 'react';
import storageService from '../services/storage.service';
import locationService from '../services/location.service';
import utilsService from '../services/utils.service';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from '@material-ui/core';
import pushNotificationService from '../services/pushNotification.service';
import { withRouter } from 'react-router-dom';

const permissions = {
  locations: {
    name: 'Geolocation',
    description:
      'With this we will try to guess your current location and give details according to your location',
  },
  notification: {
    name: 'Push Notification',
    description:
      'With this we will send realtime information of your current location',
  },
};

const css = `
    .timer-spinner{
        text-align:center;
        margin-top:10px;
    }
`;

class PermissionsComponent extends Component {
  constructor() {
    super();
    this.state = {
      currentPermission: 'locations',
      timerValue: 100,
    };
  }

  async startTimer() {
    while (true) {
      await new Promise((res) => {
        const { timerValue } = this.state;
        setTimeout(async () => {
          await utilsService.stateSync(this.setState.bind(this), {
            timerValue: timerValue - 10,
          });
          res();
        }, 1000);
      });
      const { timerValue } = this.state;
      if (timerValue <= 0) {
        break;
      }
    }
  }

  async startPermissionsAsking() {
    try {
      await this.startTimer();
      await locationService.currentLocation();
    } catch (e) {
    } finally {
      await utilsService.stateSync(this.setState.bind(this), {
        timerValue: 100,
      });
    }

    if (pushNotificationService.IsNotificationAvailable) {
      try {
        await utilsService.stateSync(this.setState.bind(this), {
          currentPermission: 'notification',
        });
        await this.startTimer();
        await pushNotificationService.Permissions();
      } catch (e) {}
    }
  }

  async componentDidMount() {
    await this.startPermissionsAsking();
    await storageService.localStorageSetItem('permissionsEntertained', true);
    const { history } = this.props;
    history.push('/home/districts');
  }

  render() {
    const { currentPermission, timerValue } = this.state;
    const permission = permissions[currentPermission];
    return (
      <>
        <style>{css}</style>
        <Container disableGutters={true} maxWidth="sm">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Permission Required
              </Typography>
              <Typography color="textSecondary">
                <strong>{permission.name}</strong>
              </Typography>
              <Typography variant="body2" component="p">
                {permission.description}
              </Typography>
              <hr />
              <Typography variant="body2" component="p">
                Please click on <strong>Allow</strong>
              </Typography>
              <div className="timer-spinner">
                <CircularProgress variant="static" value={timerValue} />
              </div>
              <hr />
              <Typography variant="body2" component="p">
                This is one time activity
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </>
    );
  }
}

export default withRouter(PermissionsComponent);
