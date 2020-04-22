import React, { PureComponent, Component } from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import StatsGraph from './common/statsGraph.component';
import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';

const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `

export default class AllDistrictsComponent extends Component {

    constructor() {
        super();
        this.state = {
            districtData: null
        }
    }
    async componentDidMount() {
        this.setState({ districtData: await covidDataService.getDistricts() });
    }

    render() {

        const { districtData } = this.state;

        return (<>
            {!districtData ? <LoaderComponent /> :
                <>
                    <style>{css}</style>
                    {districtData.map((r, idx) => {
                        return (<Card key={idx} className='card-wrap'>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {r.district}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Total Cases - {r.confirmed}
                                </Typography>
                                <hr />
                                <StatsGraph {...r} />
                                <CardActions>
                                    <Button variant="contained" size="small">Pin</Button>
                                </CardActions>
                            </CardContent>
                        </Card>)
                    })}
                </>
            }
        </>)
    }
}