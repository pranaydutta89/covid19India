import React, { PureComponent } from 'react';
import { Typography, LinearProgress } from '@material-ui/core'

export default class StatsGraph extends PureComponent {


    render() {
        const { active, confirmed, deceased, recovered } = this.props;
        return (<>
            <Typography color="textSecondary" gutterBottom>
                <strong>Active ({active})</strong>
                <LinearProgress variant="determinate" value={(active / confirmed) * 100} />
            </Typography>

            <Typography color="textSecondary" gutterBottom>
                <strong>Deceased ({deceased})</strong>
                <LinearProgress color="secondary" variant="determinate" value={(deceased / confirmed) * 100} />
            </Typography>

            <Typography color="textSecondary" gutterBottom>
                <strong>Recovered ({recovered})</strong>
                <LinearProgress color="secondary" variant="determinate" value={(recovered / confirmed) * 100} />
            </Typography>
        </>
        );
    }
}