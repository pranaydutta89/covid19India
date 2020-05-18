import React, { PureComponent, Component } from "react";
import { InputLabel, Select, MenuItem } from "@material-ui/core";


const css = `
   .MuiInputBase-root{
       width:100%
   }
`
export default class SortComponent extends Component {

    constructor() {
        super();
        this.state = {
            currentSelected: ''
        }
    }

    componentDidMount() {
        const { selected: currentSelected } = this.props;
        this.setState({ currentSelected });
    }

    handleChange(currentSelected) {
        const { onChange } = this.props;
        this.setState({ currentSelected })
        onChange(currentSelected);
    }

    render() {
        const { currentSelected } = this.state;
        return (
            <>
                <style>{css}</style>
                <InputLabel id="sortFilterLabel">Sort By Cases</InputLabel>
                <Select

                    autoWidth={true}
                    labelId="sortFilterLabel"
                    id="sortSelect"
                    value={currentSelected}
                    onChange={(evt) => this.handleChange(evt.target.value)}
                >
                    <MenuItem value='active_asc'>Active(Asc)</MenuItem>
                    <MenuItem value='active_desc'>Active(Desc)</MenuItem>
                    <MenuItem value='confirmed_asc'>Total(Asc)</MenuItem>
                    <MenuItem value='confirmed_desc'>Total(Desc)</MenuItem>
                    <MenuItem value='deceased_asc'>Death(Asc)</MenuItem>
                    <MenuItem value='deceased_desc'>Death(Desc)</MenuItem>
                    <MenuItem value='recovered_asc'>Recovered(Asc)</MenuItem>
                    <MenuItem value='recovered_desc'>Recovered(Desc)</MenuItem>

                </Select>
            </>
        )
    }
}