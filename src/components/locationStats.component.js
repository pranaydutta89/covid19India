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
} from '@material-ui/core';
import covidDataService from '../services/covidData.service';
import DistrictPatientDetails from './common/districtPatientDetails.component';
import DistrictResourceDetails from './common/districtResourceDetails.component';

const css = `
.card-wrapper{
    margin-bottom:10px
}
`;
export default class LocationStatsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      districtData: null,
    };
  }

  async componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
    try {
      this.setState({
        districtData: await covidDataService.getCurrentLocationDistrict(),
      });
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  }

  render() {
    const { districtData } = this.state;
    return (
      <>
        <style>{css}</style>
        {!districtData ? (
          <Card className="card-wrap">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Enable Location Access
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="card-wrapper">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {districtData.district}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Total Cases - {districtData.confirmed}
                </Typography>
                <hr />
                <StatsGraph {...districtData} />
              </CardContent>
            </Card>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>Patients Details</Typography>
              </ExpansionPanelSummary>
              <DistrictPatientDetails districtName={districtData.district} />
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>Resources Details</Typography>
              </ExpansionPanelSummary>
              <DistrictResourceDetails districtName={districtData.district} />
            </ExpansionPanel>
          </>
        )}
      </>
    );
  }
}
