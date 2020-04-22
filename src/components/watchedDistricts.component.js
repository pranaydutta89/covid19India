import React, { PureComponent, Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';
import StatsGraph from './common/statsGraph.component';
export default class WatchedDistrictsComponent extends Component {

    constructor() {
        super();
        this.state = {
            districtData: null
        }
    }

    async componentDidMount() {
        this.setState({ districtData: await covidDataService.getWatchedDistricts() });
    }
    render() {
        const { districtData } = this.state;
        return (<>
            {!districtData ? <LoaderComponent /> :
                <>
                    {districtData.length === 0 ?
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    No District in Watch list
                                  </Typography>
                            </CardContent>
                        </Card> :
                        <>
                            {districtData.map(r => {
                                return (<Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            {r.district}
                                        </Typography>
                                        <StatsGraph {...r} />
                                    </CardContent>
                                </Card>)
                            })}
                        </>
                    }
                </>
            }
        </>)
    }
}