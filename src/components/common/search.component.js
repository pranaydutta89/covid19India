import React, { Component } from 'react';
import { Card, CardContent, TextField } from '@material-ui/core';

const css = `
.card-wrapper{
    margin-bottom:10px
}
`;
export default class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
    };
  }

  filterData(filterText) {
    const { onChange } = this.props;
    onChange(filterText);
    this.setState({ filterText });
  }

  render() {
    const { filterText } = this.state;
    const { label } = this.props;
    return (
      <>
        <style>{css}</style>
        <Card className="card-wrapper">
          <CardContent>
            <TextField
              {...{ label }}
              id="margin-normal"
              fullWidth
              autoFocus={true}
              value={filterText}
              onChange={(evt) => this.filterData(evt.target.value)}
            />
          </CardContent>
        </Card>
      </>
    );
  }
}
