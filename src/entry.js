import React from 'react';
import ReactDom from 'react-dom';
import dataService from './services/data.service';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomeComponent from './components/home.component';
import LoaderComponent from './components/common/loader.component';





class App extends React.Component {

    constructor() {
        super();
        this.state = {
            stateData: null
        }
    }


    async componentDidMount() {
        const stateData = await dataService.stateWiseData();
        this.setState({ stateData });
    }


    render() {
        const { stateData } = this.state;
        return (
            <>
                {!stateData ?
                    <LoaderComponent /> :
                    <HomeComponent {...{ stateData }} />
                }
            </>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))

