import React, { PureComponent, Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import StatsGraph from './common/statsGraph.component';
import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';
import SearchComponent from './common/search.component';

const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `
export default class AllStatesComponent extends Component {

    constructor() {
        super();
        this.state = {
            filteredStateData: null
        }
    }

    filterData(val) {
        const filteredStateData = this.stateData.filter(r => r.state.toLowerCase().indexOf(val.toLowerCase()) !== -1);
        this.setState({ filteredStateData })
    }
    async componentDidMount() {
        const { toggleLoader } = this.props;
        toggleLoader(true);
        this.stateData = await covidDataService.getStates();
        this.setState({ filteredStateData: this.stateData })
        toggleLoader(false);
    }

    render() {

        const { filteredStateData } = this.state;
        return (
            <>
                {!filteredStateData ? <></> :
                    <>
                        <style>{css}</style>
                        <SearchComponent label='Search State'
                            onChange={(val) => this.filterData(val)} />

                        {filteredStateData.map((r, idx) => {
                            return (<Card key={r.id} className='card-wrap'>
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