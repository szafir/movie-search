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
        const page = payload.page || 1;
        dispatch(searchStart());
        const params = {
            apikey: "35ffa7b",
            s: searchPhrase,
            page: page
        }
        if (releaseYear) {
            params['y'] = releaseYear;
        }

        // new Promise((resolve, rejected) => {
        // setTimeout(() => {
        //         axios.get("/mocks/rambo_p1.json")
        //             .then(resp => {
        //                     resp.data.Search = resp.data.Search || [];
        //                     resp.data.totalResults = resp.data.totalResults || 0;
        //                     resolve(resp.data);
        //                 })
        //         }, 20)
        //     })
        //     .then((resp) => {
        //         dispatch(searchSuccess({ moviesResponse: resp, searchPhrase, releaseYear, currentPage: page }));
        //     })

        axios.get("http://www.omdbapi.com/", { params })
            .then(resp => {
                resp.data.Search = resp.data.Search || [];
                resp.data.totalResults = resp.data.totalResults || 0;
                return resp.data;
            })
            .then((resp) => {
                dispatch(searchSuccess({ moviesResponse: resp, searchPhrase, releaseYear, currentPage: page }));
            })
            .catch((error) => {
                dispatch(searchFail(error));
            });
    };
};