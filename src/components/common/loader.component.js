import React, { PureComponent } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

export default class LoaderComponent extends PureComponent {
  render() {
    return (
      <Backdrop className="backdrop" open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
}
