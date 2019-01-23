import React, { PureComponent } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from "@material-ui/core/styles";


const styles = () => ({
    formControl: {
        marginTop: -15,
        width: 160
    }
});

class YearInput extends PureComponent {

    constructor(props) {
        super(props);
        this.yearList = this.generateYears();
    }

    state = {
        year: ''
    }

    generateYears = () => {
        const years = [<MenuItem value="" key={"y-all"}>All</MenuItem>];
        for (let i = 1920; i <= 2020; i++) {
            years.push(<MenuItem value={i} key={`y-${i}`}>{i}</MenuItem>)
        }
        return years;
    }

    yearChange = (event) => {
        this.setState({
            year: event.target.value
        })
        this.props.yearChange(event.target.value);
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="year-of-release">Year of release</InputLabel>
                    <Select
                        inputProps={{ id: "year-of-release", name: "year-of-release" }}
                        onChange={this.yearChange}
                        value={this.state.year}
                    >
                        {this.yearList}
                    </Select>
                </FormControl>
            </>
        );
    }
}

export default withStyles(styles)(YearInput);