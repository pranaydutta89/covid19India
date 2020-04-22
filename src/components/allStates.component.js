import React, { PureComponent, Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import StatsGraph from './common/statsGraph.component';
import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';

const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `
export default class AllStatesComponent extends Component {

    constructor() {
        super();
        this.state = {
            stateData: null
        }
    }

    async componentDidMount() {
        this.setState({ stateData: await covidDataService.getStates() })
    }

    render() {

        const { stateData } = this.state;
        return (
            <>
                {!stateData ? <LoaderComponent /> :
                    <>
                        <style>{css}</style>
                        {stateData.map((r, idx) => {
                            return (<Card key={idx} className='card-wrap'>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        {r.state}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Cases - {r.confirmed}
                                    </Typography>
                                    <hr />
                                    <StatsGraph {...r} />
                                </CardContent>
                            </Card>)
                        })
                        }
                    </>
                }
            </>
        )
    }
}