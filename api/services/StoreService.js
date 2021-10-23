/**
 * StoreService
 *
 * @description :: Server-side logic for managing stores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

// const deferred = require('q').defer();

function _log(method, message = null) {
  LogService.log('StoreService', method, message);
}

// function _update(store, newStore) {

//   console.log('_update'); 

//   store.name        = newStore.name        ? newStore.name        : store.name;
//   store.accountName = newStore.accountName ? newStore.accountName : store.accountName;
//   store.telephones  = newStore.telephones  ? newStore.telephones  : store.telephones;
//   store.coverImage  = newStore.coverImage  ? newStore.coverImage  : store.coverImage;
//   store.address     = newStore.address     ? newStore.address     : store.address;
  
//   //Sunday 
//   store.sundayWork        = newStore.sundayWork        ? newStore.sundayWork        : store.sundayWork;  
//   store.sundayOpeningHour = newStore.sundayOpeningHour ? newStore.sundayOpeningHour : store.sundayOpeningHour;  
//   store.sundayClosingHour = newStore.sundayClosingHour ? newStore.sundayClosingHour : store.sundayClosingHour;  

//   //Monday
//   store.mondayWork        = newStore.mondayWork        ? newStore.mondayWork        : store.mondayWork;  
//   store.mondayOpeningHour = newStore.mondayOpeningHour ? newStore.mondayOpeningHour : store.mondayOpeningHour;  
//   store.mondayClosingHour = newStore.mondayClosingHour ? newStore.mondayClosingHour : store.mondayClosingHour; 

//   //Tuesday
//   store.tuesdayWork        = newStore.tuesdayWork        ? newStore.tuesdayWork        : store.tuesdayWork;  
//   store.tuesdayOpeningHour = newStore.tuesdayOpeningHour ? newStore.tuesdayOpeningHour : store.tuesdayOpeningHour;  
//   store.tuesdayClosingHour = newStore.tuesdayClosingHour ? newStore.tuesdayClosingHour : store.tuesdayClosingHour; 

//   //Wednesday
//   store.wednesdayWork        = newStore.wednesdayWork        ? newStore.wednesdayWork        : store.wednesdayWork;  
//   store.wednesdayOpeningHour = newStore.wednesdayOpeningHour ? newStore.wednesdayOpeningHour : store.wednesdayOpeningHour;  
//   store.wednesdayClosingHour = newStore.wednesdayClosingHour ? newStore.wednesdayClosingHour : store.wednesdayClosingHour; 

//   //Thursday
//   store.thursdayWork        = newStore.thursdayWork        ? newStore.thursdayWork        : store.thursdayWork;  
//   store.thursdayOpeningHour = newStore.thursdayOpeningHour ? newStore.thursdayOpeningHour : store.thursdayOpeningHour;  
//   store.thursdayClosingHour = newStore.thursdayClosingHour ? newStore.thursdayClosingHour : store.thursdayClosingHour; 

//   //Friday
//   store.fridayWork        = newStore.fridayWork        ? newStore.fridayWork        : store.fridayWork;  
//   store.fridayOpeningHour = newStore.fridayOpeningHour ? newStore.fridayOpeningHour : store.fridayOpeningHour;  
//   store.fridayClosingHour = newStore.fridayClosingHour ? newStore.fridayClosingHour : store.fridayClosingHour; 

//   //Saturday
//   store.saturdayWork        = newStore.saturdayWork        ? newStore.saturdayWork        : store.saturdayWork;  
//   store.saturdayOpeningHour = newStore.saturdayOpeningHour ? newStore.saturdayOpeningHour : store.saturdayOpeningHour;  
//   store.saturdayClosingHour = newStore.saturdayClosingHour ? newStore.saturdayClosingHour : store.saturdayClosingHour; 
     
//   console.log(newStore);    

//   Store.update({ id: store.id }, store)
//     .then((updatedStores) => {
//       deferred.resolve(updatedStores[0]);
//     })
//     .catch((err) => {
//       console.log(err); 
//       deferred.reject(err);
//     });

//   return deferred.promise;
// }

module.exports = {
  // delete: (sessionUser) => {
  //   const deferred = require('q').defer();
  //   User
  //     .update({ id: sessionUser.id }, { deleted: true })
  //     .then((updated) => {
  //       deferred.resolve(sessionUser);
  //     })
  //     .catch((err) => {
  //       deferred.reject({
  //         type: "SERVER_ERROR",
  //         error: sails.config.errors.internal
  //       });
  //     });
  //   return deferred.promise;
  // }, 
  
  async createStore (newStore) {  
    _log('createStore', newStore);

    try {
      var resp = await Store.create(newStore).fetch();      
    } catch (error) {
      _log('createStore', error);
      throw(error);
    }
        
    _log('createStore', resp);

    return resp;
  },  

  // FIND

  // findStore: (req, res) => {
  //   console.log('findStore');
  //   let storeName = req.body.storeName;
  //   return Store.findOne({name: storeName}).then((result) => {
  //     res.ok(result);
  //   }).catch((err) => {
  //     ResponseService.sendError(res, err);
  //   });
  // },

  async find (params, limit, skip) {
    _log('find', params);

    try {
      var resp = await Store.find(params).limit(limit).skip(skip).populate('address').populate('telephones').populate('coverImage');      
    } catch (error) {
      _log('find', error);
      throw(error);
    }
        
    _log('find', resp);

    return resp;
  }, 

  async findById (id) {
    _log('findById', id);

    try {
      var resp = await Store.findOne({id: id}).populate('address').populate('telephones').populate('coverImage');      
    } catch (error) {
      _log('findById', error);
      throw(error);
    }
        
    _log('findById', resp);

    return resp;
  }, 

  async findByUser (userId) {
    _log('findByUser', userId);  

    try {

      let employee = await EmployeeService.findByUser(userId);
      var resp     = await StoreService.findById(employee.store);      

    } catch (error) {
      _log('findByUser', error);
      throw(error);
    }
        
    _log('findByUser', resp);
    
    return resp;
  },

  async search(text, limit, skip) { 
    _log('search');

    try {
      let param = {};
      if(text != undefined) {
        let  words = text.split(" ");

        let andClause = [];
        for(let i = 0; i < words.length; i++){
          andClause.push({ searchField: {"$regex": new RegExp(words[i],"i")}});
        }
        
        param = {$and: andClause};
      }
      _log('search', param);

      // Get access to the native MongoDB client via the default Sails datastore.
      var db = sails.getDatastore().manager;

      // Find all stores with the expression "text" in the searchField.
      var stores = await db.collection('store').find(param).project({ id: 1 }).toArray();
      _log('search', stores);

      var ids = [];

      for(let i = 0; i < stores.length; i++){
        ids.push(stores[i]['_id'].toString());
      }

      // _log('search', ids);
      
      // let param = text != undefined ? { searchField: {contains: text} } : {};
      // _log('search', param);
      var resp = await StoreService.find({id: ids}, limit, skip); 
    } catch (err) {
      _log('search', err);
      throw err;
    }

    _log('search', resp);

    return resp;
  },

  // UPDATE

  async updateAttribute(storeId, attributeJSON) { 
    _log('updateAttribute');

    try {
      var resp = await Store.updateOne({ id: storeId }).set(attributeJSON);      

      if(!resp){
        const err = new Error('Store not found');
        err.status = 400;
        throw err;
      }

      let name        = resp.name ? resp.name.toLowerCase() : '';
      let accountName = resp.accountName ? resp.accountName.toLowerCase() : '';
      let description = resp.description ? resp.description.toLowerCase().replace(/(\r\n|\n|\r)/gm," ") : '';

      resp = await Store.updateOne({ id: storeId }).set({searchField: name + " " + accountName + " " + description});

    } catch (error) {
      _log('updateAttribute', error);
      throw error;
    }

    _log('updateAttribute', resp);

    return resp;
  },

  async updateImage(userId, imageCreated) { 
    _log('updateImage');

    try {  
      let store = await StoreService.findByUser(userId);

      if(store.coverImage != null){
        await ImageService.remove(store.coverImage.id);
      }                    

      var resp = await StoreService.updateAttribute(store.id, {coverImage: imageCreated.id});
      resp.coverImage = imageCreated;
    } catch (error) {
      _log('updateImage', error);
      throw error;
    }

    _log('updateImage', resp);

    return resp;
  },

  // update: (sessionUser, newStore) => {
  //   const deferred = require('q').defer();

  //   console.log('update'); 
  //   console.log(newStore);
  //   StoreService.findByUser(sessionUser)
  //     .then((store) => {
  //       if (!newStore || !store) {
  //         deferred.reject({
  //           type: "BAD_REQUEST",
  //           error: "Os dados estão incorretos.",
  //         });
  //       } else {                    
  //         _update(store, newStore)
  //           .then((result) => {
  //             deferred.resolve(result);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             deferred.reject(err);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       deferred.reject(err);
  //     });

  //   return deferred.promise;
  // },

  // // Mock
  // createStoreMock : () => {  
  //   // const deferred = require('q').defer();
  //   _log('createStoreMock');

    
  //   let newStore = {name: 'Lojinha do Sr. Raimundo', accountName: 'lojinhadoraimundo', phoneNumber: '(21) 2222-2222'};       
  //   // let store;
  //   // try {
  //   //   store = await Store.create(newStore);
  //   // } catch (error) {
  //   //   _log('createStoreMock', error);
  //   //   throw error;
  //   // }

  //   // _log('createStoreMock', error);
  //   // return store;

    
  //   Store.create(newStore).then((result) => {
  //     console.log(result);       
  //     deferred.resolve(result);
  //   }).catch((err) => {
  //     console.log(err);  
  //     deferred.reject(err);
  //   });

  //   return deferred.promise;
  // },

  // findAll: () => {
  //   const deferred = require('q').defer();

  //   console.log('findAll');
  //   Store.find({}).then((result) => {
  //     console.log(result);
  //     deferred.resolve(result);
  //   }).catch(err => {
  //     console.log(err);
  //     deferred.reject(err);
  //   });

  //   return deferred.promise;
  // },

  // findStoreMock: () => {
  //   _log('findStoreMock');
    
  //   // let storeName = 'Lojinha do Sr. Raimundo';
  //   // let store;

  //   // try {
  //   //   store = await Store.findOne({name: storeName});
  //   // } catch (error) {
  //   //   throw(error);
  //   // }

  //   // _log('findStoreMock', store);

  //   // return store;


  //   const deferred = require('q').defer();

  //   console.log('findStoreMock');
  //   let storeName = 'Lojinha do Sr. Raimundo';
  //   Store.findOne({name: storeName}).then((store) => {
  //     console.log(store);
  //     // res.ok(result);
  //     deferred.resolve(store);
  //   }).catch(err => {
  //     // ResponseService.sendError(res, err);
  //     deferred.reject(err);
  //   });

  //   return deferred.promise;
  // },

  // deleteAll: () => {
  //   const deferred = require('q').defer();

  //   console.log('deleteAll');
  //   Store.destroy({}).then((result) => { 
  //     console.log(result);       
  //     deferred.resolve(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);  
  //     deferred.reject(err);
  //   });   
  //   return deferred.promise;
  // },
  //

  async countStore (params) { 
    _log('countStore', params);
   
    try {      
      var resp = await Store.count(params);
    } catch (err) {
      _log('countStore', err);
      throw err;
    }

    _log('countStore', resp);

    return resp;   

  },

};
