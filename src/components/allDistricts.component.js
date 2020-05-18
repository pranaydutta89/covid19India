import React, { Component } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import StatsGraph from './common/statsGraph.component';
import covidDataService from '../services/covidData.service';
import LocationDistrict from './locationDistrict.component';
import SearchComponent from './common/search.component';
import { orderBy } from 'lodash-es';
import SortComponent from './common/sort.component';
import ScrollComponent from './common/scroll.component';
const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `;

export default class AllDistrictsComponent extends Component {
  constructor() {
    super();
    this.state = {
      filteredDistrictData: null,
      pinnedDistricts: null,
      locationFound: true,
      filterArraySize: 10,
    };
    this.currentSort = 'active_desc';
  }
  async changeWatchFlag(name, flag) {
    const pinnedDistricts = await covidDataService.setPinDistrict(name, flag);
    this.setState({ pinnedDistricts });
    this.filterData(this.currentFilter || '');
  }
  async componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
    this.districtData = await covidDataService.getDistricts();
    this.setState({
      pinnedDistricts: await covidDataService.getPinDistrict(),
    });
    this.sortCaseData(this.districtData);
    toggleLoader(false);
  }

  filterData(val) {
    this.currentFilter = val;
    const filteredDistrictData = this.districtData.filter(
      (r) => r.district.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
    this.sortCaseData(filteredDistrictData);
  }

  sortCaseData(districtData) {
    const [prop, type] = this.currentSort.split('_');
    const sortedData = orderBy(districtData, prop, type);
    this.setState({
      filteredDistrictData: sortedData,
      filterArraySize: 10,
    });
  }

  handleSort(val) {
    this.currentSort = val;
    this.sortCaseData(this.state.filteredDistrictData);
  }
  render() {
    const {
      filteredDistrictData,
      pinnedDistricts,
      locationFound,
      filterArraySize,
    } = this.state;

    return (
      <>
        {!(filteredDistrictData && pinnedDistricts) ? (
          <></>
        ) : (
          <>
            <style>{css}</style>
            <LocationDistrict
              notfound={() => this.setState({ locationFound: false })}
            />
            <ExpansionPanel
              onChange={() => this.setState({ locationFound: !locationFound })}
              defaultExpanded={true}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography component="h1">All Districts in India</Typography>
              </ExpansionPanelSummary>
              <Card className="card-wrapper">
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <SearchComponent
                        label="Search District"
                        onChange={(val) => this.filterData(val)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SortComponent
                        selected="active_desc"
                        onChange={(val) => this.handleSort(val)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <ScrollComponent
                onBottom={() => {
                  this.setState({ filterArraySize: filterArraySize + 10 });
                }}
              >
                {filteredDistrictData
                  .slice(0, filterArraySize)
                  .map((r, idx) => {
                    return (
                      <Card key={idx} className="card-wrap">
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>
                            {r.district}
                          </Typography>
                          <Typography color="textSecondary" gutterBottom>
                            Total Cases - <strong>{r.confirmed}</strong>
                          </Typography>
                          <hr />
                          <StatsGraph {...r} />
                          <CardActions>
                            {!pinnedDistricts.some((j) => j === r.district) ? (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  this.changeWatchFlag(r.district, true)
                                }
                                size="small"
                              >
                                Watch
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  this.changeWatchFlag(r.district, false)
                                }
                                size="small"
                              >
                                Remove Watch
                              </Button>
                            )}
                          </CardActions>
                        </CardContent>
                      </Card>
                    );
                  })}
              </ScrollComponent>
            </ExpansionPanel>
          </>
        )}
      </>
    );
  }
}
