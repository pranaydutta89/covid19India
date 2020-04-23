import React from 'react';
import locationService from '../services/location.service';
import LoaderComponent from './common/loader.component';
import StatsGraph from './common/statsGraph.component';
import { Card, CardContent, Typography } from '@material-ui/core';
import covidDataService from '../services/covidData.service';
import DistrictPatientDetails from './common/districtPatientDetails.component';

const css = `
.card-wrapper{
    margin-bottom:10px
}
`
export default class LocationStatsComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            districtData: null
        }
    }

    async componentDidMount() {
        const { toggleLoader } = this.props;
        toggleLoader(true);
        try {
            this.setState({ districtData: await covidDataService.getCurrentLocationDistrict() });
        } catch (e) {

        } finally {
            toggleLoader(false);
        }
    }

    render() {
        const { districtData } = this.state;
        return (
            <>
                <style>{css}</style>
                {
                    !districtData ? <Card className='card-wrap'>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Enable Location Access
                            </Typography>
                        </CardContent>
                    </Card> :
                        <>
                            <Card className='card-wrapper'>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        {districtData.district}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Cases - {districtData.confirmed}
                                    </Typography>
                                    <hr />
                                    <StatsGraph {...districtData} />
                                </CardContent>
                            </Card>
                            <DistrictPatientDetails districtName={districtData.district} />
                        </>

                }
            </>
        )
    }
}