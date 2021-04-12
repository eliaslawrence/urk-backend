/**
 * SystemService
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

function _log(method, message = null) {
  LogService.log('SystemService', method, message);
}

module.exports = {
  async populate(query, associations) {
    _log('populate', associations);

    var found;  

    try {
      for (association of associations) {
        query = query.populate(association); 
      }

      found = await query;

    } catch (err) {
      _log('populate', err);
      throw err;
    }

    _log('populate', found);

    return found;
  },

  capitalize: (word) => {  
    return word.charAt(0).toUpperCase() + word.slice(1)
  },

  async populate(query, associations) {
    _log('populate', query);
    _log('populate', associations);

    var found;  

    try {
      for (association of associations) {
        query = query.populate(association); 
      }

      found = await query;
    } catch (err) {
      _log('populate', err);
      throw err;
    }

    _log('populate', found);

    return found;
  },
};
