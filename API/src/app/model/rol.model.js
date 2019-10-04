var database = require('../../config/dbConnection');
var ROL = {};

ROL.getAll = function(callback) {
    if (database) {
        var query = 'SELECT * FROM ROL';
        database.query(query, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado);
            }
        })
    }
}


module.exports = ROL;