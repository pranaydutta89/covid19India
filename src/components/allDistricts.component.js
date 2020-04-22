import React, { PureComponent, Component } from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import StatsGraph from './common/statsGraph.component';
import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';
import SearchComponent from './common/search.component';

const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `

export default class AllDistrictsComponent extends Component {

    constructor() {
        super();
        this.state = {
            filteredDistrictData: null
        }
    }
    async  changeWatchFlag(name, flag) {
        await covidDataService.setPinDistrict(name, flag);
        this.setState({ districtData: await covidDataService.getDistricts() });
    }
    async componentDidMount() {
        this.districtData = await covidDataService.getDistricts()
        this.setState({ filteredDistrictData: this.districtData });
    }

    filterData(val) {
        const filteredDistrictData = this.districtData.filter(r => r.district.toLowerCase().indexOf(val.toLowerCase()) !== -1);
        this.setState({ filteredDistrictData })
    }

    render() {

        const { filteredDistrictData } = this.state;

        return (<>
            {!filteredDistrictData ? <LoaderComponent /> :
                <>
                    <style>{css}</style>
                    <SearchComponent label='Search District'
                        onChange={(val) => this.filterData(val)} />

                    {filteredDistrictData.map((r, idx) => {
                        return (<Card key={r.id} className='card-wrap'>
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
                                    {!r.watch ? <Button variant="contained" onClick={() => this.changeWatchFlag(r.district, true)} size="small">Pin</Button> :
                                        <Button variant="contained" onClick={() => this.changeWatchFlag(r.district, false)} size="small">Remove Pin</Button>}

                                </CardActions>
                            </CardContent>
                        </Card>)
                    })}
                </>
            }
        </>)
    }
}