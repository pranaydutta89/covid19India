import React from 'react';
import ReactDom from 'react-dom';
import HomeComponent from './components/home.component';
import LoaderComponent from './components/common/loader.component';
import covidDataService from './services/covidData.service';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true
        }
    }


    async componentDidMount() {
        await covidDataService.getStates();
        this.setState({ loading: false });
    }


    render() {
        const { loading } = this.state;
        return (
            <>
                {loading ?
                    <LoaderComponent /> :
                    <HomeComponent />
                }
            </>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))

