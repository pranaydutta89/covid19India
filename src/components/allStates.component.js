import React, { Component } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import StatsGraph from './common/statsGraph.component';
import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';
import SearchComponent from './common/search.component';
import LocationState from './locationState.component';

const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `;
export default class AllStatesComponent extends Component {
  constructor() {
    super();
    this.state = {
      filteredStateData: null,
      pinnedStates: covidDataService.getPinState(),
    };
  }

  changeWatchFlag(name, flag) {
    const pinnedStates = covidDataService.setPinState(name, flag);
    this.setState({ pinnedStates });
    this.filterData(this.currentFilter || '');
  }
  filterData(val) {
    this.currentFilter = val;
    const filteredStateData = this.stateData.filter(
      (r) => r.state.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
    this.setState({ filteredStateData });
  }
  async componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
    this.stateData = await covidDataService.getStates();
    this.setState({ filteredStateData: this.stateData });
    toggleLoader(false);
  }

  render() {
    const { filteredStateData, pinnedStates } = this.state;
    return (
      <>
        {!filteredStateData ? (
          <></>
        ) : (
            <>
              <style>{css}</style>
              <LocationState />
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>All States</Typography>
                </ExpansionPanelSummary>
                <SearchComponent
                  label="Search State"
                  onChange={(val) => this.filterData(val)}
                />

                {filteredStateData.map((r, idx) => {
                  return (
                    <Card key={idx} className="card-wrap">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          {r.state}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Total Cases - {r.confirmed}
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
