import React, { Component } from 'react';
import {
  Paper,
  Container,
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';

import {
  PublicOutlined,
  LocationCityOutlined,
  AllOutOutlined,
  VisibilityOutlined,
} from '@material-ui/icons';
import AllStatesComponent from './allStates.component';
import WatchedComponent from './watched.component';
import AllDistrictsComponent from './allDistricts.component';
import constantsService from '../services/constants.service';
import LoaderComponent from './common/loader.component';
import IndiaDetailComponent from './IndiaDetails.component';
const css = `
        .backdrop: {
                color: '#fff';
                opacity:0.4
            }
            .bottom-nav{
                position:fixed;
                bottom:0;
                width:100%;
                left:0;
            }
    .home-wrapper{
        margin-top:10px;
    }
    `;
export default class HomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: constantsService.pages.all_district,
      showLoader: false,
    };
  }

  toggleLoader(showLoader) {
    this.setState({ showLoader });
  }

  renderCurrentTab() {
    const { currentTab } = this.state;
    switch (currentTab) {
      case constantsService.pages.pinned_district:
        return (
          <WatchedComponent toggleLoader={(val) => this.toggleLoader(val)} />
        );
      case constantsService.pages.all_district:
        return (
          <AllDistrictsComponent
            toggleLoader={(val) => this.toggleLoader(val)}
          />
        );
      case constantsService.pages.all_states:
        return (
          <AllStatesComponent toggleLoader={(val) => this.toggleLoader(val)} />
        );
      case constantsService.pages.country_brief:
        return (
          <IndiaDetailComponent toggleLoader={(val) => this.toggleLoader(val)} />
        );
    }
  }

  tabChange(currentTab) {
    this.setState({ currentTab });
  }

  render() {
    const { currentTab, showLoader } = this.state;
    return (
      <>
        {showLoader ? <LoaderComponent /> : <></>}
        <style>{css}</style>

        <Container disableGutters={true} maxWidth="sm">
          <AppBar position="sticky">
            <div>
              <BottomNavigation
                showLabels={true}
                value={currentTab}
                onChange={(evt, newVal) => this.tabChange(newVal)}
              >
                <BottomNavigationAction
                  label="Districts"
                  value={constantsService.pages.all_district}
                  icon={<LocationCityOutlined />}
                />
                <BottomNavigationAction
                  label="States"
                  value={constantsService.pages.all_states}
                  icon={<AllOutOutlined />}
                />
                <BottomNavigationAction
                  label="Watched"
                  value={constantsService.pages.pinned_district}
                  icon={<VisibilityOutlined />}
                />
                <BottomNavigationAction
                  label="India"
                  value={constantsService.pages.country_brief}
                  icon={<PublicOutlined />}
                />
              </BottomNavigation>
            </div>
          </AppBar>
          <div className="home-wrapper">
            <form autoComplete="off">
              <Paper elevation={3}>{this.renderCurrentTab()}</Paper>
            </form>
          </div>
        </Container>
      </>
    );
  }
}
