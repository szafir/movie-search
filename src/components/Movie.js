import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import BrokenImage from "@material-ui/icons/BrokenImage";
import { withStyles } from "@material-ui/core/styles";


const styles = () => ({
    avatar: {
        width: 25,
        height: 25
    }
});

const Movie = (props) => {
    const { classes } = props;
    let poster = props.item.Poster === "N/A" ? <BrokenImage /> : <Avatar className={classes.avatar} src={props.item.Poster}></Avatar>;
    const name = `${props.item.Title} (${props.item.Year})`;
    return (
        <ListItem key={props.item.imdbID} divider={!props.isLast} button>
            <ListItemAvatar>
                {poster}
            </ListItemAvatar>
            <ListItemText
                primary={name}
            />
        </ListItem>
    );
}

export default withStyles(styles)(Movie);