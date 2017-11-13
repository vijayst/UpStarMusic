const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
    const query = {};

    if (criteria.name) {
        query.name = {
            $regex: criteria.name,
            $options: 'i'
        };
    }
    if (criteria.age) {
        query.age = {
            $lte: criteria.age.max,
            $gte: criteria.age.min
        };
    }
    if (criteria.yearsActive) {
        query.yearsActive = {
            $lte: criteria.yearsActive.max,
            $gte: criteria.yearsActive.min
        };
    }

    return Promise.all(
        [
            Artist.find(query)
                .sort({ [sortProperty]: 1 })
                .skip(offset)
                .limit(limit),
            Artist.find(query).count()
        ]
    ).then(([artists, count]) => {
        return {
            all: artists,
            count,
            offset,
            limit
        };
    });
};
