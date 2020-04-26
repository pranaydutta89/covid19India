import React, { PureComponent, Component } from 'react';
import {
  Card,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import covidDataService from '../services/covidData.service';
import LoaderComponent from './common/loader.component';
import StatsGraph from './common/statsGraph.component';
import SearchComponent from './common/search.component';

const css = `
.card-wrapper{
    margin-bottom:10px;
}
`;
export default class WatchedComponent extends Component {
  constructor() {
    super();
    this.state = {
      watchedDistricts: [],
      watchedStates: [],
      loader: true,
    };
  }

  async componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
    const watchedDistricts = await covidDataService.getWatchedDistricts();
    const watchedStates = await covidDataService.getWatchedStates();
    this.setState({ watchedDistricts, watchedStates, loader: false });
    toggleLoader(false);
  }
  render() {
    const { loader, watchedDistricts, watchedStates } = this.state;
    return (
      <>
        <style>{css}</style>
        {loader ? (
          <></>
        ) : (
          <>
            <ExpansionPanel defaultExpanded={true}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
              >
                <Typography>District</Typography>
              </ExpansionPanelSummary>
              {watchedDistricts.length === 0 ? (
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      No District in Watch list
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {watchedDistricts.map((r, idx) => {
                    return (
                      <>
                        <Card className="card-wrapper" key={idx}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              {r.district}
                            </Typography>
                            <StatsGraph {...r} />
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}
                </>
              )}
            </ExpansionPanel>

            <ExpansionPanel defaultExpanded={true}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
              >
                <Typography>State</Typography>
              </ExpansionPanelSummary>
              {watchedStates.length === 0 ? (
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      No State in Watch list
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {watchedStates.map((r, idx) => {
                    return (
                      <>
                        <Card className="card-wrapper" key={idx}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              {r.state}
                            </Typography>
                            <StatsGraph {...r} />
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}
                </>
              )}
            </ExpansionPanel>
          </>
        )}
      </>
    );
  }
}