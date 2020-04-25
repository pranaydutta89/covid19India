import React from 'react';
import { ExpandMore } from '@material-ui/icons';
import StatsGraph from './common/statsGraph.component';
import {
    Card,
    CardContent,
    Typography,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from '@material-ui/core';
import covidDataService from '../services/covidData.service';
import DistrictPatientDetails from './common/districtPatientDetails.component';
import DistrictResourceDetails from './common/districtResourceDetails.component';

const css = `
.card-wrapper{
    margin-bottom:10px
}
`;
export default class LocationStateComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            stateData: null,
        };
    }

    async componentDidMount() {

        try {
            this.setState({
                stateData: await covidDataService.getCurrentLocationState(),
            });
        } catch (e) {
        }
    }

    render() {
        const { stateData } = this.state;
        return (
            <>
                <style>{css}</style>
                {!stateData ? (
                    <Card className="card-wrap">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Enable Location Access
              </Typography>
                        </CardContent>
                    </Card>
                ) : (
                        <>
                            <Card className="card-wrapper">
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Estimated Location <strong>{stateData.state}</strong>
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Cases - {stateData.confirmed}
                                    </Typography>
                                    <hr />
                                    <StatsGraph {...stateData} />
                                </CardContent>
                            </Card>
                        </>
                    )}
            </>
        );
    }
}
