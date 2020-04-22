import React, { PureComponent } from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import StatsGraph from './common/statsGraph.component';

const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `

export default class AllDistrictsComponent extends PureComponent {


    render() {

        const { stateData } = this.props;
        const districtsMap = stateData.map(r => r.districtData);
        const districts = [];
        districtsMap.forEach(r => districts.push.apply(districts, r))
        return (<>
            <style>{css}</style>
            {districts.map((r, idx) => {
                return (<Card key={idx} className='card-wrap'>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {r.district}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Total Cases - {r.confirmed}
                        </Typography>
                        <hr />
                        <StatsGraph {...r} />
                        <CardActions>
                            <Button variant="contained" size="small">Watch</Button>
                        </CardActions>
                    </CardContent>
                </Card>)
            })}
        </>)
    }
}