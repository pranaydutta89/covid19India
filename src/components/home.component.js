import React, { Component } from "react";
import { Paper, Container, AppBar, Toolbar, Typography, BottomNavigation, BottomNavigationAction } from '@material-ui/core'

import { PublicOutlined, LocationCityOutlined, AllOutOutlined, LocationOnOutlined } from '@material-ui/icons';
import AllStatesComponent from "./allStates.component";
import WatchedDistrictsComponent from "./watchedDistricts.component";
import AllDistrictsComponent from "./allDistricts.component";
import LocationStatsComponent from "./locationStats.component";
import constantsService from "../services/constants.service";
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
    `
export default class HomeComponent extends Component {

    constructor() {
        super();
        this.state = {
            currentTab: constantsService.pages.pinned_district
        }
    }

    renderCurrentTab() {
        const { currentTab } = this.state;
        switch (currentTab) {
            case constantsService.pages.pinned_district:
                return <WatchedDistrictsComponent />
            case constantsService.pages.all_district:
                return <AllDistrictsComponent />
            case constantsService.pages.all_states:
                return <AllStatesComponent />
            case constantsService.pages.location:
                return <LocationStatsComponent />

        }
    }

    tabChange(currentTab) {
        this.setState({ currentTab })
    }


    render() {
        const { currentTab } = this.state;
        return (
            <>
                <style>{css}</style>
                <Container maxWidth='sm'>
                    <AppBar position="sticky">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit">
                                {currentTab}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className='home-wrapper'>
                        <Paper elevation={3} >
                            {this.renderCurrentTab()}
                        </Paper>
                    </div>
                    <div className='bottom-nav'>
                        <BottomNavigation value={currentTab} onChange={(evt, newVal) => this.tabChange(newVal)}>
                            <BottomNavigationAction
                                value={constantsService.pages.pinned_district} icon={<LocationCityOutlined />} />
                            <BottomNavigationAction
                                value={constantsService.pages.location} icon={<LocationOnOutlined />} />
                            <BottomNavigationAction
                                value={constantsService.pages.all_district} icon={<PublicOutlined />} />
                            <BottomNavigationAction
                                value={constantsService.pages.all_states} icon={<AllOutOutlined />} />
                        </BottomNavigation>
                    </div>
                </Container>
            </>
        )
    }
}