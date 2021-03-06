import React from 'react';
import { ExpandMore } from '@material-ui/icons';
import StatsGraph from './common/statsGraph.component';
import {
  Card,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  LinearProgress,
} from '@material-ui/core';
import covidDataService from '../services/covidData.service';
import ResourceDetails from './common/resourceDetails.component';
import FromNow from './common/fromNow.component';

export default class LocationStateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      stateData: null,
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({
      stateData: await covidDataService.getCurrentLocationState(),
      loading: false,
    });
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
    const { stateData, loading } = this.state;
    return (
      <>
        {loading ? (
          <LinearProgress />
        ) : (
            <>
              {!stateData ? (
                <></>
              ) : (
                  <>
                    <Card className="card-wrapper">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Your Location <strong>{stateData.state}</strong>
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Total Cases - <strong>{stateData.confirmed}{this.renderDeltaConfirmed(stateData.delta)}</strong>
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Updated <FromNow timestamp={stateData.lastUpdatedTime} />
                        </Typography>
                        <hr />
                        <StatsGraph {...stateData} />
                      </CardContent>
                    </Card>
                    <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography>Essentials / Helplines</Typography>
                      </ExpansionPanelSummary>
                      <ResourceDetails type="state" name={stateData.state} />
                    </ExpansionPanel>
                  </>
                )}
            </>
          )}
      </>
    );
  }
}
