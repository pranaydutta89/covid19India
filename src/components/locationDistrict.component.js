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
import DistrictPatientDetails from './common/districtPatientDetails.component';
import ResourceDetails from './common/resourceDetails.component';

export default class LocationDistrictComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      districtData: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const districtData = await covidDataService.getCurrentLocationDistrict();
    this.setState({
      districtData,
      loading: false,
    });

    if (!districtData) {
      const { notfound } = this.props;
      notfound();
    }
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
    const { districtData, loading } = this.state;
    return (
      <>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            {!districtData ? (
              <></>
            ) : (
              <>
                <Card
                  classes={{ root: `zone-${districtData.zone}` }}
                  className="card-wrapper"
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Your Location <strong>{districtData.district}</strong>
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Total Cases -{' '}
                      <strong>
                        {districtData.confirmed}
                        {this.renderDeltaConfirmed(districtData.delta)}
                      </strong>
                    </Typography>
                    <hr />
                    <StatsGraph {...districtData} />
                  </CardContent>
                </Card>
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>Patients</Typography>
                  </ExpansionPanelSummary>
                  <DistrictPatientDetails
                    districtName={districtData.district}
                  />
                </ExpansionPanel>
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>Essentials / Helplines</Typography>
                  </ExpansionPanelSummary>
                  <ResourceDetails
                    type="district"
                    name={districtData.district}
                  />
                </ExpansionPanel>
              </>
            )}
          </>
        )}
      </>
    );
  }
}
