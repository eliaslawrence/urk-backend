/**
 * TelephoneService
 *
 * @description :: Server-side logic for managing telephones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

function _log(method, message = null) {
  LogService.log('TelephoneService', method, message);
}

module.exports = {  

  // UPDATE
  async updateAttribute(id, attributeJSON) { 
    _log('updateAttribute');

    try {
      var resp = await Telephone.updateOne({ id: id }).set(attributeJSON);

      if(!resp){
        const err = new Error('Telephone not found');
        err.status = 400;
        throw err;
      }
    } catch (err) {
      _log('updateAttribute', err);
      throw err;
    }

    _log('updateAttribute', resp);

    return resp;
  },

  // CREATE

  async create(storeId, newObject) {
    _log('create', storeId);   
    _log('create', newObject);  

    try {
      newObject['store'] = storeId;
      var resp = await Telephone.create(newObject).fetch();
    } catch (err) {
      _log('create', err);
      throw err;
    }

    _log('create');

    return resp;
  },

  // DELETE
  async delete(id) {
    _log('delete');

    try {
      await Telephone.destroy({ id: id });
    } catch (err) {
      _log('delete', err);
      throw err;
    }

    _log('delete');

    return;
  },

};
