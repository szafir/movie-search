import React from "react";
import Movie from "./Movie";
import List from "@material-ui/core/List";

const MoviesList = (props) => {
    return (
        <List >
            {props.items.map((item, ind) => (
                <Movie item={item} key={item.imdbID} isLast={ind + 1 === props.items.length} />
            ))}
        </List>
    );
}

export default MoviesList;