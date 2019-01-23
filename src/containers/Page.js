import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

import MoviesList from "../components/MoviesList";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import debounce from "lodash.debounce";
import Pagination from "../components/Pagination";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Page extends Component {

    state = {
        searchPhrase: ""
    }

    onSearchDebounced = debounce(() => {
        if (this.state.searchPhrase.length > 2) {
            this.props.performSearch(this.state.searchPhrase);
        }
        else if (this.state.searchPhrase === '') {
            this.props.clearSearch();
        }
    }, 300);

    handleSearchChange = (event) => {
        this.setState({
            searchPhrase: event.target.value
        })
        this.onSearchDebounced();
    }
    componentDidMount() {
        this.setState({
            searchPhrase: 'developement'
        })
        this.onSearchDebounced();
    }

    changePage = (page) => {
        this.props.changePage(this.state.searchPhrase, page);
    }


    render() {
        const containerStyles = {
            width: 1000,
            margin: "50px auto"
        }
        const { classes } = this.props;
        const messsage = this.props.searchPhrase ? <Typography className={classes.root} variant="h5" component="h3">{`No results found for "${this.props.searchPhrase}".`}</Typography> : null;
        const searchStyles = {
            width: "100%"
        }
        return (
            <div style={containerStyles}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography className={classes.root} variant="h3" component="h3" align="center">
                            Movie search
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <InputBase
                                placeholder="Type something to find movies"
                                style={searchStyles}
                                value={this.state.searchPhrase}
                                onChange={this.handleSearchChange}
                                classes={{
                                    // root: classes.inputRoot,
                                    // input: classes.inputInput,
                                }}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={8}>

                    </Grid>
                    <Grid item xs={4} align="right">
                        {
                            this.props.totalResults > 0 ?
                                <Pagination totalResults={this.props.totalResults} page={this.props.currentPage} changePage={this.changePage} /> : null
                        }

                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            {
                                this.props.totalResults > 0 ?
                                    <MoviesList items={this.props.visibleMovies} /> : messsage
                            }
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        visibleMovies: state.visibleMovies,
        totalResults: state.totalResults,
        currentPage: state.currentPage,
        searchPhrase: state.searchPhrase,
        isLoading: state.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        performSearch: phrase => dispatch(actions.performSearch(phrase)),
        clearSearch: () => dispatch(actions.clearSearch()),
        changePage: (phrase, page) => dispatch(actions.performSearch(phrase, page))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page));