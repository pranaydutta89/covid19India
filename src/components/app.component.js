import React from 'react';
import HomeComponent from './home.component';
import PermissionsComponent from './permissions.components';
import storageService from '../services/storage.service';
import AboutComponent from './about.component';
import { Fab } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

const css = `
         .fab-btn{
              bottom:10px;
              right:10px;
              position:fixed
            }
    `;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPermissionsPage: null,
      showAboutPage: false,
    };
  }

  toggleAboutPage(flag) {
    this.setState({ showAboutPage: flag });
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
    const { showPermissionsPage, showAboutPage } = this.state;
    if (showPermissionsPage !== null) {
      return (
        <>
          <style>{css}</style>
          {showPermissionsPage ? (
            <PermissionsComponent done={() => this.closePermissionPage()} />
          ) : (
            <>
              {showAboutPage ? (
                <AboutComponent
                  close={() => {
                    this.toggleAboutPage(false);
                  }}
                />
              ) : (
                <HomeComponent />
              )}
              <div
                onClick={() => {
                  this.toggleAboutPage(!showAboutPage);
                }}
                className="fab-btn"
              >
                <Fab size="small" color="primary" aria-label="add">
                  <InfoOutlined />
                </Fab>
              </div>
            </>
          )}
        </>
      );
    }
    return <></>;
  }
}
