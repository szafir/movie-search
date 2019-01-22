import React from "react";
import Movie from "./Movie";
import List from "@material-ui/core/List";

const MoviesList = (props) => {
    return (
        <List>
            {props.items.map((item, ind) => {
                console.log(ind+1 === props.items.length)
                return (
                <>
                    <Movie item={item} key={item.imdbID}/>
                    {ind+1 !== props.items.length? <hr /> : null} 
                </>
                );
            })}
        </List>

    );
}

export default MoviesList;