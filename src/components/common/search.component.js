import React, { Component } from 'react';
import { TextField } from '@material-ui/core';


export default class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
    };
  }

  filterData(filterText) {
    const { onChange } = this.props;
    this.setState({ filterText });

    if (this.debouce) {
      clearTimeout(this.debouce);
      this.debouce = null;
    }

    this.debouce = setTimeout(() => {
      onChange(filterText);
    }, 200);
  }

  render() {
    const { filterText } = this.state;
    const { label } = this.props;
    return (
      <>
        <TextField
          {...{ label }}
          id="margin-normal"
          fullWidth
          value={filterText}
          onChange={(evt) => this.filterData(evt.target.value)}
        />
      </>
    );
  }
}
