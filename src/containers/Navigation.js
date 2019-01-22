import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";


import { connect } from "react-redux";
import * as actions from "../store/actions";

import debounce from "lodash.debounce";

const styles = theme => ({
    root: {
      width: "100%",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3,
        width: "auto",
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  });

class Navigation extends Component {

    state = {
        searchPhrase: ""
    }

    onSearchDebounced = debounce(() => {
        if(this.state.searchPhrase.length > 2) {
            this.props.performSearch(this.state.searchPhrase);
        } 
        else if(this.state.searchPhrase === '') {
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
    render() {
        const { classes } = this.props;
        const searchStyle = {
            height: 25,
            width: 25
        }
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Movie search</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            {this.props.isLoading ? <CircularProgress style={searchStyle}/> : <SearchIcon /> }
                        </div>
                        <InputBase
                            placeholder="Find movies"
                            value={this.state.searchPhrase}
                            onChange={this.handleSearchChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    
                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        performSearch: phrase => dispatch(actions.performSearch(phrase)),
        clearSearch: () => dispatch(actions.clearSearch()) 
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navigation));