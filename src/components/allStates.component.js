import React, { PureComponent } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import StatsGraph from './common/statsGraph.component';


export default class AllStatesComponent extends PureComponent {


    render() {

        const { stateData } = this.props;
        const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `
        return (
            <>
                <style>{css}</style>
                {stateData.map((r, idx) => {
                    return (<Card key={idx} className='card-wrap'>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {r.state}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Total Cases - {r.confirmed}
                            </Typography>
                            <hr />
                            <StatsGraph {...r} />
                        </CardContent>
                    </Card>)
                })
                }
            </>
        )
    }
}