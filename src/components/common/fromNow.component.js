import React, { PureComponent } from "react";
import moment from 'moment';
import { Chip } from '@material-ui/core'
export default class FromNow extends PureComponent {

    render() {
        const { timestamp } = this.props;
        const fromNow = moment(timestamp, 'DD/MM/YYYY').fromNow();
        return (
            <Chip label={fromNow} variant="outlined" />
        )
    }
}