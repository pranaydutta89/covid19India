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

export default class DistrictResourceDetails extends Component {
  constructor() {
    super();
    this.state = {
      resourceDetails: null,
    };
  }

  async componentDidMount() {
    const { districtName } = this.props;
    this.setState({
      resourceDetails: await covidDataService.getDistrictResources(
        districtName
      ),
    });
  }

  render() {
    const { resourceDetails } = this.state;
    return (
      <>
        {!resourceDetails ? (
          <LinearProgress />
        ) : (
          <>
            {resourceDetails.map(
              ({ category, source, notes, name, number }, idx) => {
                return (
                  <Card key={idx} variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {category}
                      </Typography>
                      <Typography color="textSecondary">{name}</Typography>
                      <Typography variant="body2" component="p">
                        {notes}
                      </Typography>
                      <Typography variant="body2" component="p">
                        <a href={`tel:${number}`}>Call {number}</a>
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
