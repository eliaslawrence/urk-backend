/**
 * UserEmployeeService
 *
 * @description :: Server-side logic for managing userEmployees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

function _log(method, message = null) {
  LogService.log('UserEmployeeService', method, message);
}

// function _update(userEmployee, newUserEmployee) {
//   const deferred = require('q').defer();

//   console.log('_update'); 

//   userEmployee.email    = newUserEmployee.email    ? newUserEmployee.email    : userEmployee.email;
//   userEmployee.password = newUserEmployee.password ? newUserEmployee.password : userEmployee.password;
     
//   console.log(userEmployee);    

//   UserEmployee.update({ id: userEmployee.id }, userEmployee)
//     .then((updatedUserEmployees) => {
//       deferred.resolve(updatedUserEmployees[0]);
//     })
//     .catch((err) => {
//       console.log(err); 
//       deferred.reject(err);
//     });

//   return deferred.promise;
// }

module.exports = {  
  async createUser (newUser) { 
    _log('createUser', newUser);

    try {
      var resp = await UserEmployee.create(newUser).fetch();      
    } catch (error) {
      _log('createUser', error);
      throw(error);
    }
        
    _log('createUser', resp);

    return resp;
  },

  // findById: (id) => {
  //   const deferred = require('q').defer();

  //   console.log('findById: ' + id);

  //   UserEmployee.findOne({id: id}).then((user) => {      
  //     deferred.resolve(user);
  //   }).catch((err) => {
  //     console.log(err);
  //     deferred.reject(err);
  //   });  

  //   return deferred.promise;
  // }, 

  // update: (sessionUser, newUser) => {
  //   const deferred = require('q').defer();

  //   console.log('update'); 
  //   console.log(newUser);
  //   UserEmployeeService.findById(sessionUser.id)
  //     .then((user) => {
  //       if (!newUser || !user) {
  //         deferred.reject({
  //           type: "BAD_REQUEST",
  //           error: "Os dados estão incorretos.",
  //         });
  //       } else {                    
  //         _update(user, newUser)
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

  // changePassword: (sessionUser, newUser, oldPassword) => {  
  //   const deferred = require('q').defer();

  //   UserEmployeeService.findById(sessionUser.id).then((user) => { 
  //     _log('changePassword', oldPassword);
  //     _log('changePassword', user.password);

  //     if (!CipherService.comparePassword(oldPassword, user)){
  //       deferred.reject({
  //         type: "E_WRONG_PASSWORD",
  //         error: "Os dados estão incorretos.",
  //       });
  //     } else {
  //       CipherService.hashPassword(newUser).then((userHashed) => {
  //         UserEmployeeService.update(sessionUser, userHashed.user).then((result) => {           
  //           deferred.resolve(result);
  //         }).catch((err) => {
  //           console.log(err);
  //           deferred.reject(err);
  //         });
  //       }).catch((err) => {
  //         console.log(err);
  //         deferred.reject(err);
  //       });        
  //     }

  //   }).catch((err) => {
  //     console.log(err);
  //     deferred.reject(err);
  //   });

  //   return deferred.promise;
  // }, 

  // //MOCK
  // findAll: () => {
  //   const deferred = require('q').defer(); 

  //   console.log('findAll');
  //   UserEmployee.find({}).then((result) => {
  //     console.log(result);
  //     deferred.resolve(result);
  //   }).catch(err => {
  //     console.log(err);
  //     deferred.reject(err);
  //   });

  //   return deferred.promise;
  // },

  // deleteAll: () => {
  //   const deferred = require('q').defer(); 

  //   console.log('deleteAll');  
  //   UserEmployee.destroy({}).then((result) => {            
  //     deferred.resolve(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);  
  //     deferred.reject(err);
  //   });   
  //   return deferred.promise;
  // },
  //
};
