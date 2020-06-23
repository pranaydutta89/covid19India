import React, { Component } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  Grid,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import StatsGraph from './common/statsGraph.component';
import covidDataService from '../services/covidData.service';
import SearchComponent from './common/search.component';
import LocationState from './locationState.component';
import FromNow from './common/fromNow.component';
import SortComponent from './common/sort.component';
import { orderBy } from 'lodash-es';

export default class AllStatesComponent extends Component {
  constructor() {
    super();
    this.state = {
      filteredStateData: null,
      pinnedStates: [],
    };
    this.currentSort = 'active_desc';
  }

  async changeWatchFlag(name, flag) {
    const pinnedStates = await covidDataService.setPinState(name, flag);
    this.setState({ pinnedStates });
    this.filterData(this.currentFilter || '');
  }
  filterData(val) {
    this.currentFilter = val;
    const filteredStateData = this.stateData.filter(
      (r) => r.state.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
    this.sortCaseData(filteredStateData);
  }

  sortCaseData(stateData) {
    const [prop, type] = this.currentSort.split('_');
    const sortedData = orderBy(stateData, prop, type);
    this.setState({
      filteredStateData: sortedData,
    });
  }

  async componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
    this.stateData = await covidDataService.getStates();
    this.setState({
      pinnedStates: await covidDataService.getPinState(),
    });
    this.sortCaseData(this.stateData);
    toggleLoader(false);
  }

  handleSort(val) {
    this.currentSort = val;
    this.sortCaseData(this.state.filteredStateData);
  }
  renderDeltaConfirmed(delta) {
    if (delta?.confirmed && delta.confirmed) {
      return (
        <>
          {delta.confirmed > 0
            ? `(+${delta.confirmed})`
            : `(${delta.confirmed})`}
        </>
      );
    }
  }
  render() {
    const { filteredStateData, pinnedStates } = this.state;
    return (
      <>
        {!filteredStateData ? (
          <></>
        ) : (
            <>
              <LocationState />
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography component="h1">All States in India</Typography>
                </ExpansionPanelSummary>

                <Card className="card-wrapper">
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <SearchComponent
                          label="Search State"
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
                {filteredStateData.map((r, idx) => {
                  return (
                    <Card key={idx} className="card-wrap">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          {r.state}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Total Cases - <strong>{r.confirmed}{this.renderDeltaConfirmed(r.delta)}</strong>
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Updated <FromNow timestamp={r.lastUpdatedTime} />
                        </Typography>
                        <hr />
                        <StatsGraph {...r} />
                        <CardActions>
                          {!pinnedStates.some((j) => j === r.state) ? (
                            <Button
                              variant="contained"
                              onClick={() => this.changeWatchFlag(r.state, true)}
                              size="small"
                            >
                              Watch
                            </Button>
                          ) : (
                              <Button
                                variant="contained"
                                onClick={() => this.changeWatchFlag(r.state, false)}
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
              </ExpansionPanel>
            </>
          )}
      </>
    );
  }
}
