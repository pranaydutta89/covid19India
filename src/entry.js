import HomeComponent from './components/allStates.component';
import React from 'react';
import ReactDom from 'react-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import dataService from './services/data.service';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import AllOutOutlinedIcon from '@material-ui/icons/AllOutOutlined';






class App extends React.Component {

    constructor() {
        super();
        this.state = {
            stateData: null,
            currentTab: 'watchedDistrict'
        }
    }


    async componentDidMount() {
        const stateData = await dataService.stateWiseData();
        this.setState({ stateData });
    }

    renderCurrentTab() {
        switch (this.state.currentTab) {
            
        }
    }

    render() {
        const { stateData, currentTab } = this.state;
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
        return (
            <>
                {!stateData ?
                    <Container maxWidth='sm'>
                        <Backdrop className='backdrop' open={true} >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Container>
                    :
                    <>
                        <style>{css}</style>
                        <Container maxWidth='sm'>
                            <AppBar position="fixed">
                                <Toolbar variant="dense">
                                    <Typography variant="h6" color="inherit">
                                        Covid 19 INDIA
               </Typography>
                                </Toolbar>
                            </AppBar>
                            <div className='home-wrapper'>
                                <Paper elevation={3} >
                                    <HomeComponent stateData={stateData} />
                                </Paper>
                            </div>
                            <div className='bottom-nav'>
                                <BottomNavigation value={currentTab}>
                                    <BottomNavigationAction label="Watched District" value="watchedDistrict" icon={<LocationCityOutlinedIcon />} />
                                    <BottomNavigationAction label="Watched State" value="watchedState" icon={<PublicOutlinedIcon />} />
                                    <BottomNavigationAction label="All States" value="states" icon={<AllOutOutlinedIcon />} />
                                </BottomNavigation>
                            </div>
                        </Container>
                    </>
                }
            </>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))

