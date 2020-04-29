import React from 'react';
import { ExpandMore } from '@material-ui/icons';
import StatsGraph from './common/statsGraph.component';
import {
  Card,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  LinearProgress,
} from '@material-ui/core';
import covidDataService from '../services/covidData.service';
import DistrictPatientDetails from './common/districtPatientDetails.component';
import ResourceDetails from './common/resourceDetails.component';

const css = `
.card-wrapper{
    margin-bottom:10px
}
`;
export default class LocationDistrictComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      districtData: null,
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({
      districtData: await covidDataService.getCurrentLocationDistrict(),
      loading: false,
    });
  }

  render() {
    const { districtData, loading } = this.state;
    return (
      <>
        <style>{css}</style>
        {loading ? (
          <LinearProgress />
        ) : (
            <>
              {!districtData ? (
                <></>
              ) : (
                  <>
                    <Card className="card-wrapper">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Location{' '}
                          <strong>{districtData.district}</strong>
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Total Cases - <strong>{districtData.confirmed}</strong>
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
