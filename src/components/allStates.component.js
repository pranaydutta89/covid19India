import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class AllStatesComponent extends React.Component {


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
                            <Typography color="textSecondary" gutterBottom>
                                <strong>Active relative to total ({r.active})</strong>
                                <LinearProgress variant="determinate" value={(r.active / r.confirmed) * 100} />
                            </Typography>

                            <Typography color="textSecondary" gutterBottom>
                                <strong>Deceased relative to total ({r.deceased})</strong>
                                <LinearProgress color="secondary" variant="determinate" value={(r.deceased / r.confirmed) * 100} />
                            </Typography>

                            <Typography color="textSecondary" gutterBottom>
                                <strong>Recovered relative to total ({r.recovered})</strong>
                                <LinearProgress color="secondary" variant="determinate" value={(r.recovered / r.confirmed) * 100} />
                            </Typography>
                            <CardActions>
                                <Button variant="contained" size="small">Watch</Button>
                            </CardActions>
                        </CardContent>
                    </Card>)
                })
                }
            </>
        )
    }
}