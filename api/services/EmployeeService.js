/**
 * EmployeeService
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

function _log(method, message = null) {
  LogService.log('EmployeeService', method, message);
}

// function _update(employee, newEmployee) {
//   const deferred = require('q').defer();

//   console.log('_update'); 

//   employee.name  = newEmployee.name  ? newEmployee.name  : employee.name;
//   employee.store = newEmployee.store ? newEmployee.store : employee.store;
//   employee.user  = newEmployee.user  ? newEmployee.user  : employee.user;
     
//   console.log(newEmployee);    

//   Employee.update({ id: employee.id }, employee)
//     .then((updatedEmployees) => {
//       deferred.resolve(updatedEmployees[0]);
//     })
//     .catch((err) => {
//       console.log(err); 
//       deferred.reject(err);
//     });

//   return deferred.promise;
// }

module.exports = { 

  async findByUser (userId) {
    _log('findByUser', userId);

    try {
      var resp = await Employee.findOne({user: userId}).populate('user');      
    } catch (error) {
      _log('findByUser', error);
      throw(error);
    }
        
    _log('findByUser', resp);

    return resp;
  }, 
  
  async createEmployee (newEmployee) { 
    _log('createEmployee', newEmployee);

    try {
      var resp = await Employee.create(newEmployee)
    } catch (error) {
      throw(error);
    }

    _log('createEmployee', resp);

    return resp;
  },
  
  // createEmployee: (newEmployee) => {
  //   const deferred = require('q').defer();

  //   console.log('createEmployee');         
  //   Employee.create(newEmployee).then((employeeSaved) => {                        
  //     // res.ok({
  //     //   user: userSaved,
  //     //   employee: employeeSaved,
  //     //   token: CipherService.createToken(userSaved) 
  //     // }); 
  //     deferred.resolve(employeeSaved);
  //   })
  //   .catch((err) => {
  //     console.log(err);  
  //     deferred.reject(err);
  //     // ResponseService.sendError(res, err);
  //   });   
  //   return deferred.promise;
    
  //   // .then(result => {
  //   //     console.log(result);
  //   //     res.created(result);
  //   //   }      
  //   // ).catch((err) => {
  //   //   console.log(err);
  //   //   res.unprocessableEntity(err);
  //   // });

  //   // let deferred = Q.defer();
  //   // verifyEmail(newUser.email)
  //   //   .then(()=>{
  //   //     User
  //   //       .create(newUser)
  //   //       .then((user) => {
  //   //         deferred.resolve(user);
  //   //       })
  //   //       .catch((err) => {
  //   //         deferred.reject(err);
  //   //       });
  //   //   }).catch((err)=>{
  //   //   deferred.reject(err);
  //   // })

  //   // return deferred.promise;
  // },   

  // update: (sessionUser, newEmployee) => {
  //   const deferred = require('q').defer();
     
  //   _log('update', newEmployee);
    
  //   EmployeeService.findByUser(sessionUser.id)
  //     .then((employee) => {
  //       if (!newEmployee || !employee) {
  //         deferred.reject({
  //           type: "BAD_REQUEST",
  //           error: "Os dados estão incorretos.",
  //         });
  //       } else {                    
  //         _update(employee, newEmployee)
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

  // //MOCK
  // findAll: () => {
  //   const deferred = require('q').defer();

  //   console.log('findAll');
  //   Employee.find({}).then((result) => {
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
  //   Employee.destroy({}).then((result) => { 
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
};
