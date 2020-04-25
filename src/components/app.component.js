import React from 'react';
import HomeComponent from './home.component';
import LoaderComponent from './common/loader.component';
import covidDataService from '../services/covidData.service';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    await covidDataService.getStates();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return <>{loading ? <LoaderComponent /> : <HomeComponent />}</>;
  }
}
