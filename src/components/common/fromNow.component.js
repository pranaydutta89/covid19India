import React, { PureComponent } from 'react';
import moment from 'moment';
export default class FromNow extends PureComponent {
  getFromNow() {
    const { timestamp } = this.props;
    const splitTimeStamp = timestamp.split(' ');
    if (splitTimeStamp.length === 2) {
      return moment(timestamp, 'DD/MM/YYYY hh:mm:ss').fromNow();
    } else if (splitTimeStamp.length === 1) {
      return moment(timestamp, 'DD/MM/YYYY').fromNow();
    }
  }
  render() {
    const fromNow = this.getFromNow();
    return <strong>{fromNow}</strong>;
  }
}
