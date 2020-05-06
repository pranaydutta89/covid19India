import React, { Component } from 'react';
import {
  Paper,
  Container,
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
} from '@material-ui/core';

import {
  PublicOutlined,
  LocationCityOutlined,
  AllOutOutlined,
  VisibilityOutlined,
  InfoOutlined,
} from '@material-ui/icons';
import AllStatesComponent from './allStates.component';
import WatchedComponent from './watched.component';
import AllDistrictsComponent from './allDistricts.component';
import LoaderComponent from './common/loader.component';
import IndiaDetailComponent from './IndiaDetails.component';
import { Switch, Route, withRouter } from 'react-router-dom';
import AboutComponent from './about.component';
import MetaComponent from './meta.components';
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
            .fab-btn{
              bottom:10px;
              right:10px;
              position:fixed
            }
    .home-wrapper{
        margin-top:10px;
    }
    `;
class HomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: null,
      showLoader: false,
    };
  }

  onBackButtonClicked() {
    const {
      location: { pathname },
    } = this.props;
    this.setState({ currentTab: pathname });
  }
  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;
    this.setState({ currentTab: pathname });
    window.onpopstate = this.onBackButtonClicked.bind(this);
  }
  toggleLoader(showLoader) {
    this.setState({ showLoader });
  }

  tabChange(currentTab) {
    const { history } = this.props;
    history.push(currentTab);
    this.setState({ currentTab });
  }
  routes() {
    return (
      <Switch>
        <Route exact path="/">
          <MetaComponent route="/" />
          <AllDistrictsComponent
            toggleLoader={(val) => this.toggleLoader(val)}
          />
        </Route>
        <Route exact path="/states">
          <MetaComponent route="/states" />
          <AllStatesComponent toggleLoader={(val) => this.toggleLoader(val)} />
        </Route>
        <Route exact path="/watched">
          <MetaComponent route="/watched" />
          <WatchedComponent toggleLoader={(val) => this.toggleLoader(val)} />
        </Route>
        <Route exact path="/india">
          <MetaComponent route="/india" />
          <IndiaDetailComponent
            toggleLoader={(val) => this.toggleLoader(val)}
          />
        </Route>
        <Route exact path="/about">
          <MetaComponent route="/about" />
          <AboutComponent />
        </Route>
      </Switch>
    );
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
                  value="/"
                  icon={<LocationCityOutlined />}
                />
                <BottomNavigationAction
                  label="States"
                  value="/states"
                  icon={<AllOutOutlined />}
                />
                <BottomNavigationAction
                  label="Watched"
                  value="/watched"
                  icon={<VisibilityOutlined />}
                />
                <BottomNavigationAction
                  label="India"
                  value="/india"
                  icon={<PublicOutlined />}
                />
              </BottomNavigation>
            </div>
          </AppBar>
          <div className="home-wrapper">
            <form autoComplete="off">
              <Paper elevation={3}>{this.routes()}</Paper>
            </form>
          </div>
        </Container>
        <div
          onClick={() => {
            this.tabChange('/about');
          }}
          className="fab-btn"
        >
          <Fab size="small" color="primary" aria-label="add">
            <InfoOutlined />
          </Fab>
        </div>
      </>
    );
  }
}

export default withRouter(HomeComponent);
