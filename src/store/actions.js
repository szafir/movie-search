import * as actionTypes from "./actionTypes";
import axios from "axios";

export const searchStart = () => {
    return {
        type: actionTypes.SEARCH_START
    };
};
export const clearSearch = () => {
    return {
        type: actionTypes.SEARCH_CLEAR
    };
};

export const searchSuccess = (moviesResponse, searchPhrase) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        moviesResponse, 
        searchPhrase
    };
};

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error
    };
};

export const performSearch = (searchPhrase) => {
    return dispatch => {
        dispatch(searchStart());
        new Promise((resolve, rejected) => {
            setTimeout(() => {
                axios.get("/mocks/rambo_p1.json")
                    .then(resp => {
                        resolve(resp.data);
                    })
            }, 10)
        })
        .then((resp) => {
            dispatch(searchSuccess(resp, searchPhrase));
        })
        .catch((error) => {
            dispatch(searchFail(error));
        })
    };
};