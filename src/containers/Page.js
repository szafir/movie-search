import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import MoviesList from "../components/MoviesList";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import debounce from "lodash.debounce";
import Pagination from "../components/Pagination";
import YearInput from "../components/YearInput";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        display: "flex"
    },
    inputInput: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        width: "100%"
    },
    container: {
        width: 1000,
        margin: "50px auto"
    }
});

class Page extends Component {

    state = {
        searchPhrase: ""
    }

    onSearchDebounced = debounce(() => {
        if (this.state.searchPhrase.length > 2) {
            this.props.performSearch({ searchPhrase: this.state.searchPhrase, releaseYear: this.props.releaseYear, page: 1 });
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

    handleYearChange = (year) => {
        this.props.performSearch({ searchPhrase: this.state.searchPhrase, releaseYear: year, page: 1 });
    }

    changePage = (page) => {
        this.props.changePage({ searchPhrase: this.state.searchPhrase, releaseYear: this.props.releaseYear, page });
    }

    render() {
        const { classes } = this.props;
        const messsage = this.props.searchPhrase ? <Typography className={classes.root} variant="h5" component="h3">{`No results found for "${this.props.searchPhrase}".`}</Typography> : null;
        return (
            <Grid container spacing={24} className={classes.container}>
                <Grid item xs={12}>
                    <Typography variant="h3" component="h3" align="center">
                        Movie search
                        </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <SearchIcon fontSize="large" />
                        <InputBase
                            placeholder="Type something to find movies"
                            className={classes.inputInput}
                            value={this.state.searchPhrase}
                            onChange={this.handleSearchChange}
                        />
                        <YearInput yearChange={this.handleYearChange} />
                    </Paper>
                </Grid>
                <Grid item xs={12} align="right">
                    {this.props.totalResults > 0 && <Pagination totalResults={this.props.totalResults} page={this.props.currentPage} changePage={this.changePage} />}
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
        );
    }
}

const mapStateToProps = state => ({
    visibleMovies: state.visibleMovies,
    totalResults: state.totalResults,
    currentPage: state.currentPage,
    searchPhrase: state.searchPhrase,
    releaseYear: state.releaseYear,
    isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
    performSearch: (payload) => dispatch(actions.performSearch(payload)),
    clearSearch: () => dispatch(actions.clearSearch()),
    changePage: (payload) => dispatch(actions.performSearch(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page));