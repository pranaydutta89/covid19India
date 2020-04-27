import React, { Component } from 'react';
import covidDataService from '../../services/covidData.service';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
  LinearProgress,
} from '@material-ui/core';

export default class ResourceDetails extends Component {
  constructor() {
    super();
    this.state = {
      resourceDetails: null,
    };
  }

  async componentDidMount() {
    const { name, type } = this.props;
    let resourceDetails;
    if (type === 'state') {
      resourceDetails = await covidDataService.getStateResources(name);
    } else {
      resourceDetails = await covidDataService.getDistrictResources(name);
    }
    this.setState({ resourceDetails });
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
              ({ category, source, notes, name, number, city }, idx) => {
                return (
                  <Card key={idx} variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {category}
                      </Typography>
                      <Typography color="textSecondary">{name}</Typography>
                      <Typography color="textSecondary">{city}</Typography>
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
