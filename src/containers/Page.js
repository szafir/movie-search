import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import MoviesList from "../components/MoviesList";
import { connect } from "react-redux";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class Page extends Component {
    render() {
        const containerStyles = {
            width: 1000,
            margin: "50px auto"
        }
        const { classes } = this.props;

        const messsage = this.props.searchPhrase ? `No results found for "${this.props.searchPhrase}".` : "Enter movie you want to find.";

        console.log(this.props.totalResults)
        return (
            <div >
                <Paper elevation={1} style={containerStyles}>
                    {
                        this.props.totalResults > 0 ?
                            <MoviesList items={this.props.visibleMovies}/> :
                            <Typography className={classes.root} variant="h5" component="h3">
                                {messsage}
                            </Typography>
                    }
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        visibleMovies: state.visibleMovies,
        totalResults: state.totalResults,
        currentPage: state.currentPage,
        searchPhrase: state.searchPhrase
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page));