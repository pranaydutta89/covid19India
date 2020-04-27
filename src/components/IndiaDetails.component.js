import React, { Component } from 'react';
import covidDataService from '../services/covidData.service';
import { Card, CardContent, Typography } from '@material-ui/core';
import StatsGraph from './common/statsGraph.component';

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
      const { cases, tested } = indiaBrief;
      return (
        <>
          <style>{css}</style>

          <Card className="card-wrap">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total cases as on <strong>{cases.date}</strong>
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Confirmed - <strong>{cases.totalconfirmed}</strong>
              </Typography>
              <hr />
              <StatsGraph
                confirmed={cases.totalconfirmed}
                active={
                  cases.totalconfirmed -
                  cases.totaldeceased -
                  cases.totalrecovered
                }
                deceased={cases.totaldeceased}
                recovered={cases.totalrecovered}
              />
            </CardContent>
          </Card>

          <Card className="card-wrap">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Daily Details as on <strong>{cases.date}</strong>
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Confirmed - <strong>{cases.dailyconfirmed}</strong>
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Deaths - <strong>{cases.dailydeceased}</strong>
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Recovered - <strong>{cases.dailyrecovered}</strong>
              </Typography>
            </CardContent>
          </Card>

          <Card className="card-wrap">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Tested samples{' '}
                <strong>{tested.totalsamplestested}</strong>
              </Typography>
            </CardContent>
          </Card>
        </>
      );
    } else {
      return <></>;
    }
  }
}
