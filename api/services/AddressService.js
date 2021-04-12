/**
 * AddressService
 *
 * @description :: Server-side logic for managing addresses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

function _log(method, message = null) {
  LogService.log('AddressService', method, message);
}

module.exports = {  

  // UPDATE
  async updateAttribute(id, attributeJSON) { 
    _log('updateAttribute');

    try {
      var resp = await Address.updateOne({ id: id }).set(attributeJSON);

      if(!resp){
        const err = new Error('Address not found');
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
      let address = await Address.create(newObject).fetch();
      await StoreService.updateAttribute(storeId, {address: address.id});
    } catch (err) {
      _log('create', err);
      throw err;
    }

    _log('create');

    return;
  },

};
