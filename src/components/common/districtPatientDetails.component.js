import React, { Component } from 'react';
import FromNow from './fromNow.component';
import covidDataService from '../../services/covidData.service';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
  LinearProgress,
} from '@material-ui/core';

export default class DistrictPatientDetails extends Component {
  constructor() {
    super();
    this.state = {
      patientDetails: null,
    };
  }

  async componentDidMount() {
    const { districtName } = this.props;
    this.setState({
      patientDetails: await covidDataService.getDistrictPatients(districtName),
    });
  }

  render() {
    const { patientDetails } = this.state;
    return (
      <>
        {!patientDetails ? (
          <LinearProgress />
        ) : (
          <>
            {patientDetails.map(
              ({
                id,
                patientnumber,
                dateannounced: timestamp,
                currentstatus,
                notes,
                source,
              }) => {
                return (
                  <Card key={id} variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Reported <FromNow {...{ timestamp }} />
                      </Typography>
                      <Typography variant="h5" component="h2">
                        Patient Number {patientnumber}
                      </Typography>
                      <Typography color="textSecondary">
                        Status {currentstatus}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {notes}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link href={source} target="_blank">
                        Source
                      </Link>
                    </CardActions>
                  </Card>
                );
              }
            )}
          </>
        )}
      </>
    );
  }
}
