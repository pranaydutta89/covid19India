import React from 'react';
import locationService from '../services/location.service';
import LoaderComponent from './common/loader.component';
import StatsGraph from './common/statsGraph.component';
import { Card, CardContent, Typography } from '@material-ui/core';

export default class LocationStatsComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            districtData: null
        }
    }

    async componentDidMount() {
        const location = await locationService.currentLocation();
        const { stateData } = this.props;
        const stateThatHasLocationDistrict = stateData.
            find(r => r.districtData.some(j => j.district.toLowerCase() === location.city.longName.toLowerCase()));
        const districtData = stateThatHasLocationDistrict.districtData.
            find(r => r.district.toLowerCase() === location.city.longName.toLowerCase())
        this.setState({ districtData });
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