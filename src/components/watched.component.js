import React, { Component } from 'react';
import {
  Card,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import covidDataService from '../services/covidData.service';
import StatsGraph from './common/statsGraph.component';

export default class WatchedComponent extends Component {
  constructor() {
    super();
    this.state = {
      watchedDistricts: [],
      watchedStates: [],
      loader: true,
    };
  }

  async componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
    const watchedDistricts = await covidDataService.getWatchedDistricts();
    const watchedStates = await covidDataService.getWatchedStates();
    this.setState({ watchedDistricts, watchedStates, loader: false });
    toggleLoader(false);
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
    const { loader, watchedDistricts, watchedStates } = this.state;
    return (
      <>
        {loader ? (
          <></>
        ) : (
            <>
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                >
                  <Typography variant="h6" component="h1">
                    Watched Districts
                </Typography>
                </ExpansionPanelSummary>
                {watchedDistricts.length === 0 ? (
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        No District in Watch list
                    </Typography>
                    </CardContent>
                  </Card>
                ) : (
                    <>
                      {watchedDistricts.map((r, idx) => {
                        return (
                          <>
                            <Card
                              classes={{ root: `zone-${r.zone}` }}
                              className="card-wrapper"
                              key={idx}
                            >
                              <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                  {r.district}
                                  <br />
                              Total Cases -{' '}
                                  <strong>
                                    {r.confirmed}
                                    {this.renderDeltaConfirmed(r.delta)}
                                  </strong>
                                </Typography>
                                <StatsGraph {...r} />
                              </CardContent>
                            </Card>
                          </>
                        );
                      })}
                    </>
                  )}
              </ExpansionPanel>

              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                >
                  <Typography variant="h6" component="h1">
                    Watched States
                </Typography>
                </ExpansionPanelSummary>
                {watchedStates.length === 0 ? (
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        No State in Watch list
                    </Typography>
                    </CardContent>
                  </Card>
                ) : (
                    <>
                      {watchedStates.map((r, idx) => {
                        return (
                          <>
                            <Card className="card-wrapper" key={idx}>
                              <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                  {r.state}
                                  <br />
                    Total Cases - <strong>{r.confirmed}{this.renderDeltaConfirmed(r.delta)}</strong>
                                </Typography>
                                <StatsGraph {...r} />
                              </CardContent>
                            </Card>
                          </>
                        );
                      })}
                    </>
                  )}
              </ExpansionPanel>
            </>
          )}
      </>
    );
  }
}
