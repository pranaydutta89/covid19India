import React, { PureComponent, Component } from 'react';
import { Card, CardContent, Typography, TextField } from '@material-ui/core'
import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';
import StatsGraph from './common/statsGraph.component';
import SearchComponent from './common/search.component';

const css = `
.card-wrapper{
    margin-bottom:10px;
}
`
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
        const { toggleLoader } = this.props;
        toggleLoader(true);
        this.districtData = await covidDataService.getWatchedDistricts()
        this.setState({ filteredDistrictData: this.districtData });
        toggleLoader(false);
    }
    render() {
        const { filteredDistrictData } = this.state;
        return (<>
            <style>{css}</style>
            {!filteredDistrictData ? <></> :
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
                                        <Card className='card-wrapper' key={r.id}>
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