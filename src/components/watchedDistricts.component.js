import React, { PureComponent, Component } from 'react';
import { Card, CardContent, Typography, TextField } from '@material-ui/core'
import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';
import StatsGraph from './common/statsGraph.component';
import SearchComponent from './common/search.component';
export default class WatchedDistrictsComponent extends Component {

    constructor() {
        super();
        this.state = {
            filteredDistrictData: null,
        }
    }

    filterData(filteredText) {
        const filterData = this.districtData.
            filter(r => r.district.toLowerCase().indexOf(filteredText.toLowerCase()) !== -1);
        this.setState({ filteredDistrictData: filterData })
    }
    async componentDidMount() {
        this.districtData = await covidDataService.getWatchedDistricts()
        this.setState({ filteredDistrictData: this.districtData });
    }
    render() {
        const { filteredDistrictData } = this.state;
        return (<>
            {!filteredDistrictData ? <LoaderComponent /> :
                <>
                    <SearchComponent label='Search District'
                        onChange={(val) => this.filterData(val)} />

                    {filteredDistrictData.length === 0 ?
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    No District in Watch list
                                  </Typography>
                            </CardContent>
                        </Card> :
                        <>
                            {filteredDistrictData.map((r, idx) => {
                                return (
                                    <>
                                        <Card key={r.id}>
                                            <CardContent>
                                                <Typography color="textSecondary" gutterBottom>
                                                    {r.district}
                                                </Typography>
                                                <StatsGraph {...r} />
                                            </CardContent>
                                        </Card>
                                    </>)
                            })}
                        </>
                    }
                </>
            }
        </>)
    }
}