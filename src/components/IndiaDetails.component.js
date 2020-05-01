import React, { Component } from 'react';
import covidDataService from '../services/covidData.service';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
} from '@material-ui/core';
import StatsGraph from './common/statsGraph.component';
import FromNow from './common/fromNow.component';

const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `;
export default class IndiaDetailComponent extends Component {
  constructor() {
    super();
    this.state = {
      indiaBrief: null,
    };
  }

  async componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
    const indiaBrief = await covidDataService.getIndiaBrief();
    this.setState({ indiaBrief });
    toggleLoader(false);
  }

  render() {
    const { indiaBrief } = this.state;
    if (indiaBrief) {
      const {
        cases: { total, yesterday },
        tested,
      } = indiaBrief;
      return (
        <>
          <style>{css}</style>

          <Card className="card-wrap">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total cases updated{' '}
                <FromNow timestamp={total.lastUpdatedTime} />
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Confirmed - <strong>{total.confirmed}</strong>
              </Typography>
              <hr />
              <StatsGraph
                confirmed={total.confirmed}
                active={total.active}
                deceased={total.deaths}
                recovered={total.recovered}
              />
            </CardContent>
          </Card>

          <Card className="card-wrap">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Daily Details as on <strong>Yesterday</strong>
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Confirmed - <strong>{yesterday.confirmed}</strong>
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Deaths - <strong>{yesterday.deceased}</strong>
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Recovered - <strong>{yesterday.recovered}</strong>
              </Typography>
            </CardContent>
          </Card>

          <Card className="card-wrap">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Tested samples updated{' '}
                <FromNow timestamp={tested.updateTimestamp} />
              </Typography>
              <Typography variant="h5" component="h2">
                <strong>{tested.totalSamplesTested}</strong>
              </Typography>
              <CardActions>
                <Link href={tested.source} target="_blank">
                  Source
                </Link>
              </CardActions>
            </CardContent>
          </Card>
        </>
      );
    } else {
      return <></>;
    }
  }
}
