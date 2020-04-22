import React, { Component } from 'react';
import { Card, CardContent, TextField } from '@material-ui/core';

export default class SearchComponent extends Component {

    constructor() {
        super();
        this.state = {
            filterText: ''
        }
    }

    filterData(filterText) {
        const { onChange } = this.props;
        onChange(filterText);
        this.setState({ filterText })
    }

    render() {
        const { filterText } = this.state;
        const { label } = this.props;
        return (
            <Card>
                <CardContent>
                    <TextField
                        {...{ label }}
                        id="margin-normal"
                        fullWidth
                        value={filterText}
                        onChange={(evt) => this.filterData(evt.target.value)}
                    />
                </CardContent>
            </Card>
        )
    }
}