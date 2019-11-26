var express = require('express');
var router = express.Router();
const _ = require('lodash');
const API = require('../routes/API_omdb');

let films =[];
let newAPI = new API();

/* GET tout les films */
router.get('/', function(req, res) {
    res.status(200).json({ films: films });
});


/* GET movie by ID */
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    const filmselected = _.find(films, ["id", id]);

    if(!filmSelected){
        res.status(200).json({
            message: 'Film introuvable'});
    }
    else {
        res.status(200).json({
            films: [
                {
                    message: 'Film trouvé',
                    id: id,
                    film: filmSelected.film,
                    yearOfRelease: filmSelected.yearOfRelease,
                    duration: filmSelected.duration,
                    actors: filmSelected.actors,
                    poster: filmSelected.poster,
                    boxOffice: filmSelected.boxOffice,
                    rottenTomatoesScore: filmSelected.rottenTomatoesScore
                }]
        });
    }
});

/* PUT movie */
router.put('/', (req, res) => {
    const title = req.body.title;

    if (!title) {
        res.status(200).json({
            message: 'Film introuvable'
        });
    }

    else{
        const filmSelected = _.find(films, ["film", title]);

        if (!filmSelected) {
            const add = newAPI
                .fetchFilmTitle(title)
                .then(function (response) {

                    // Récupère la donnée d'une API
                    const data = response.data;

                    // On récupère les informations demandé
                    const id = data.imdbID;
                    const film = data.Title;
                    const yearOfRelease = parseInt(data.Year);
                    const duration = parseInt(data.Runtime);
                    const actors = data.Actors.split(", ");
                    const poster = data.Poster;
                    const boxOffice = data.BoxOffice;
                    const rottenTomatoesScore = parseInt(data.Ratings[1].Value);

                    films.push({
                        id: id,
                        film: film,
                        yearOfRelease: yearOfRelease,
                        duration: duration,
                        actors: actors,
                        poster: poster,
                        boxOffice: boxOffice,
                        rottenTomatoesScore: rottenTomatoesScore
                    });

                    res.status(200).json({
                        films: [
                            {
                                message: `${filmd} a été ajouté`,
                                id: id,
                                yearOfRelease: yearOfRelease,
                                duration: duration,
                                actors: actors,
                                poster: poster,
                                boxOffice: boxOffice,
                                rottenTomatoesScore: rottenTomatoesScore
                            }]
                    })
                })

                .catch(function(error) {
                    // Affiche une erreur
                    console.error(error);
                });
        }
    }
});


/* POST movie */
router.post('/:id', (req, res) => {
    const id = req.params.id;
    const modifiedMovieYear = req.body.movieYear;

    const filmSelected = _.find(films, ["id", id]);

    filmSelected.yearOfRelease = parseInt(modifiedMovieYear);

    res.status(200).json({
        message: `L'année du film ${filmSelected.film} a été modifié`
    })
});


/* DELETE movie */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const filmSelected = _.find(films, ["id", id]);

    _.remove(films, ["id", id]);

    res.status(200).json({
        message: `Le film ${filmSelected.film} a été supprimé`
    })
});

module.exports = router;