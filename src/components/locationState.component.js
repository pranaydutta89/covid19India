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
    LinearProgress,
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
            loading: true
        };
    }

    async componentDidMount() {
        try {
            this.setState({
                stateData: await covidDataService.getCurrentLocationState(),
            });
        } catch (e) { }
        finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { stateData, loading } = this.state;
        return (
            <>
                <style>{css}</style>
                {loading ? <LinearProgress /> :
                    <>
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
                }
            </>
        );
    }
}
