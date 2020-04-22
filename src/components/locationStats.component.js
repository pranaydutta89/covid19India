import React from 'react';
import locationService from '../services/location.service';
import LoaderComponent from './common/loader.component';
import StatsGraph from './common/statsGraph.component';
import { Card, CardContent, Typography } from '@material-ui/core';
import covidDataService from '../services/covidData.service';

export default class LocationStatsComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            districtData: null
        }
    }

    async componentDidMount() {
        this.setState({ districtData: await covidDataService.getCurrentLocationDistrict() });
    }

    render() {
        const { districtData } = this.state;
        return (
            <>
                {
                    !districtData ? <LoaderComponent /> :
                        <Card className='card-wrap'>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {districtData.district}
                                </Typography>
                                <hr />
                                <StatsGraph {...districtData} />
                            </CardContent>
                        </Card>

                }
            </>
        )
    }
}