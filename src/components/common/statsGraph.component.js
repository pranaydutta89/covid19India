import React, { PureComponent } from 'react';
import { Typography, LinearProgress } from '@material-ui/core';

const css = `
.recovered-progress-color-primary{
    background-color:#c5f6c5;
}
.recovered-progress-bar-color-primary{
    background-color:#06d109;
}
`;
export default class StatsGraph extends PureComponent {
  render() {
    const { active, confirmed, deceased, recovered } = this.props;
    return (
      <>
        <style>{css}</style>
        {active ?
          <Typography color="textSecondary" gutterBottom>
            <strong>Active ({active})</strong>
            <LinearProgress
              variant="determinate"
              value={(active / confirmed) * 100}
            />
          </Typography> : <></>
        }

        <Typography color="textSecondary" gutterBottom>
          <strong>Deaths ({deceased})</strong>
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={(deceased / confirmed) * 100}
          />
        </Typography>

        <Typography color="textSecondary" gutterBottom>
          <strong>Recovered ({recovered})</strong>
          <LinearProgress
            classes={{
              colorPrimary: 'recovered-progress-color-primary',
              barColorPrimary: 'recovered-progress-bar-color-primary',
            }}
            variant="determinate"
            value={(recovered / confirmed) * 100}
          />
        </Typography>
      </>
    );
  }
}
