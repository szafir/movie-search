import * as actionTypes from "../store/actionTypes";

const INITIAL_STATE = {
    searchPhrase: '',
    releaseYear: '',
    visibleMovies: [],
    totalResults: 0,
    currentPage: 1,
    isLoading: false
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.SEARCH_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.SEARCH_CLEAR:
            const releaseYear = state.releaseYear;
            return {
                ...INITIAL_STATE,
                releaseYear
            }
        case actionTypes.SEARCH_SUCCESS:
            const visibleMovies = [...action.moviesResponse.Search];
            return {
                ...state,
                searchPhrase: action.searchPhrase,
                totalResults: action.moviesResponse.totalResults,
                currentPage: action.currentPage,
                releaseYear: action.releaseYear,
                visibleMovies,
                isLoading: false
            }
        default:
            return state;
    }
};

export default reducer;