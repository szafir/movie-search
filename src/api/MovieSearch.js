import axios from 'axios';

const API_KEY = '35ffa7b';

const axiosInstance = axios.create({
    baseURL: 'http://www.omdbapi.com/'
});

const movieApi = {
    search({ searchPhrase, page, releaseYear }) {
        const params = {
            apikey: API_KEY,
            s: searchPhrase,
            page
        }
        if (releaseYear) {
            params['y'] = releaseYear;
        }

        return axiosInstance.get("/", {
            params
        }).then((response) => {
            const movies = { ...response.data };
            movies.Search = movies.Search ? [...movies.Search] : [];
            movies.totalResults = movies.totalResults || 0;
            return movies;
        });
    }
};

export default movieApi;