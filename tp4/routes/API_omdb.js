const axios = require('axios').default;

// Clé api
const API_KEY = "a94aa377";
// Url API
const API_URL = "http://www.omdbapi.com/";


class API_omdb{
    constructor(){
    }

    // Faire la requete à l'API omdb
    // Retourne une promise
    fetchFilmTitle(filmTitle){
        return axios
            .get(`${API_URL}?t=${filmTitle}&apikey=${API_KEY}`, {
                crossdomain: true
            })
    }
}

module.exports = API_omdb;