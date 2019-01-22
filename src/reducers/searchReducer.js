import * as actionTypes from "../store/actionTypes";

const initialState = {
    searchPhrase: '',
    visibleMovies: [],
    totalResults: 0,
    currentPage: 1,
    isLoading: false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.SEARCH_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.SEARCH_CLEAR:
            return {
                ...state,
                isLoading: false,
                totalResults: 0,
                visibleMovies: [],
                searchPhrase: ''
            }
        case actionTypes.SEARCH_SUCCESS:

            const visibleMovies = [...action.moviesResponse.Search];
            let ind = Math.floor(Math.random()* 10);
            const elem = visibleMovies.splice(ind, 1);
            visibleMovies.unshift(...elem);
            return {
                ...state,
                searchPhrase: action.searchPhrase, 
                totalResults: action.moviesResponse.totalResults,
                visibleMovies,
                isLoading: false
            }
       
        default:
            return state;
    }
};

export default reducer;