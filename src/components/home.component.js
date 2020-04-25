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
import WatchedDistrictsComponent from './watchedDistricts.component';
import AllDistrictsComponent from './allDistricts.component';
import constantsService from '../services/constants.service';
import LoaderComponent from './common/loader.component';
const css = `
        .backdrop: {
                color: '#fff',
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
          <WatchedDistrictsComponent
            toggleLoader={(val) => this.toggleLoader(val)}
          />
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

        <Container maxWidth="sm">
          <AppBar position="sticky">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                {currentTab}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="home-wrapper">
            <form autocomplete="off">
              <Paper elevation={3}>{this.renderCurrentTab()}</Paper>
            </form>
          </div>
          <div className="bottom-nav">
            <BottomNavigation
              showLabels={true}
              value={currentTab}
              onChange={(evt, newVal) => this.tabChange(newVal)}
            >
              <BottomNavigationAction
                label="Watched"
                value={constantsService.pages.pinned_district}
                icon={<VisibilityOutlined />}
              />
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
            </BottomNavigation>
          </div>
        </Container>
      </>
    );
  }
}
