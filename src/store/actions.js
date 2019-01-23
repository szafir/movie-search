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

export const searchSuccess = (moviesResponse, searchPhrase, releaseYear, currentPage) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        moviesResponse,
        searchPhrase,
        releaseYear,
        currentPage
    };
};

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error
    };
};

export const performSearch = (searchPhrase, releaseYear, page) => {
    return dispatch => {
        page = page || 1;
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
                dispatch(searchSuccess(resp, searchPhrase, releaseYear, page));
            })
            .catch((error) => {
                dispatch(searchFail(error));
            })
    };
};