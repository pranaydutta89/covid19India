import React from 'react';
import HomeComponent from './home.component';
import LoaderComponent from './common/loader.component';
import covidDataService from '../services/covidData.service';
import PermissionsComponent from './permissions.components';
import storageService from '../services/storage.service';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      showPermissionsPage: !storageService.localStorageGetItem('permissionsEntertained')
    };
  }


  async closePermissionPage() {
    this.setState({ showPermissionsPage: false });
    await covidDataService.getStates();
    this.setState({ loading: false });
  }

  render() {
    const { loading, showPermissionsPage } = this.state;
    return (<>
      {
        showPermissionsPage ? <PermissionsComponent done={() => this.closePermissionPage()} /> :
          <>
            {
              loading ? <LoaderComponent /> : <HomeComponent />
            }
          </>
      }
    </>);
  }
}
