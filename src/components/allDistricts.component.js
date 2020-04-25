import React, { Component } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import StatsGraph from './common/statsGraph.component';
import covidDataService from '../services/covidData.service';
import LocationDistrict from './locationDistrict.component';
import SearchComponent from './common/search.component';

const css = `
           .card-wrap{
               margin-bottom:10px;
           }
        `;

export default class AllDistrictsComponent extends Component {
  constructor() {
    super();
    this.state = {
      filteredDistrictData: null,
    };
  }
  async changeWatchFlag(name, flag) {
    await covidDataService.setPinDistrict(name, flag);
    this.districtData = await covidDataService.getDistricts();
    this.filterData(this.currentFilter || '');
  }
  async componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
    this.districtData = await covidDataService.getDistricts();
    this.setState({ filteredDistrictData: this.districtData });
    toggleLoader(false);
  }

  filterData(val) {
    this.currentFilter = val;
    const filteredDistrictData = this.districtData.filter(
      (r) => r.district.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
    this.setState({ filteredDistrictData });
  }

  render() {
    const { filteredDistrictData } = this.state;

    return (
      <>
        {!filteredDistrictData ? (
          <></>
        ) : (
            <>
              <style>{css}</style>
              <LocationDistrict />
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>All Districts</Typography>
                </ExpansionPanelSummary>
                <SearchComponent
                  label="Search District"
                  onChange={(val) => this.filterData(val)}
                />

                {filteredDistrictData.map((r, idx) => {
                  return (
                    <Card key={r.id} className="card-wrap">
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
                          {!r.watch ? (
                            <Button
                              variant="contained"
                              onClick={() =>
                                this.changeWatchFlag(r.district, true)
                              }
                              size="small"
                            >
                              Watch
                            </Button>
                          ) : (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  this.changeWatchFlag(r.district, false)
                                }
                                size="small"
                              >
                                Remove Watch
                              </Button>
                            )}
                        </CardActions>
                      </CardContent>
                    </Card>
                  );
                })}
              </ExpansionPanel>
            </>
          )
        }
      </>
    );
  }
}
