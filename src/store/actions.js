import * as actionTypes from "./actionTypes";
import api from "../api/MovieSearch";

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

export const searchSuccess = (payload) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        payload
    };
};

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error
    };
};

export const performSearch = (payload) => {
    const { searchPhrase, releaseYear } = payload;
    return dispatch => {
        dispatch(searchStart());
        api
            .search({searchPhrase, page: payload.page, releaseYear})
            .then((resp) => {
                dispatch(searchSuccess({ moviesResponse: resp, searchPhrase, releaseYear, currentPage: payload.page }));
            })
            .catch((error) => {
                dispatch(searchFail(error));
            }); 
    };
};