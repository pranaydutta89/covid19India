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
      showPermissionsPage: null,
    };
  }

  async componentDidMount() {
    this.setState({
      showPermissionsPage: !(await storageService.localStorageGetItem(
        'permissionsEntertained'
      )),
    });
  }

  async closePermissionPage() {
    this.setState({ showPermissionsPage: false });
  }

  render() {
    const { showPermissionsPage } = this.state;
    if (showPermissionsPage !== null) {
      return (
        <>
          {showPermissionsPage ? (
            <PermissionsComponent done={() => this.closePermissionPage()} />
          ) : (
            <HomeComponent />
          )}
        </>
      );
    }
    return <></>;
  }
}
