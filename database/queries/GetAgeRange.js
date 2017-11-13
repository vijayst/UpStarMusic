const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
    return Promise.all([
        Artist.find({})
        .sort({ age: 1 })
        .limit(1),
        Artist.find({})
        .sort({ age: -1 })
        .limit(1)
    ]).then(([minArtists, maxArtists]) => {
        return {
            min: minArtists[0].age,
            max: maxArtists[0].age
        };
    });
};
