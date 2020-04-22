import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import memoize from 'memoize-one'
export default class WatchedDistrictsComponent extends PureComponent {


    filterWatchedDistricts = memoize((stateData) => {
        const districtWatchedStates = stateData.filter(r => {
            return r.districtData.some(j => j.watched)
        });

        if (districtWatchedStates && districtWatchedStates.length > 0) {
            districtWatchedStates.map(r => {
                r.districtData = r.districtData.find(j => j.watched);
            })
            return districtWatchedStates;
        }

        return [];
    })
    render() {
        const { stateData } = this.props;
        const filteredStates = this.filterWatchedDistricts(stateData);
        return (<>
            {filteredStates.length === 0 ?
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            No District in Watch list
        </Typography>
                    </CardContent>
                </Card> :
                <>
                    {filteredStates.map(r => {
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {r.state}
                                </Typography>
                                <StatsGraph {...r} />
                            </CardContent>
                        </Card>
                    })}
                </>
            }
        </>)
    }
}