/**
 * UserEmployee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {  
  attributes: {    
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    confirmed: {
      type: 'boolean',
      defaultsTo: false
    }
    // store: { 
    //   model: 'store',
    // },

    // name: {
    //   type: 'string',
    //   required: true
    // },  
    // phoneNumber: {
    //   type: 'string',
    //   required: true
    // },
    // cpf: {
    //   type: 'string',
    //   required: true
    // },
    // birthDate: {
    //   type: 'date',
    //   required: true
    // },
    // toJSON: function () {
    //   var obj = this.toObject();
    //   delete obj.password;
    //   return obj;
    // }
  },

  customToJSON: function () {
    return _.omit(this, ['password']);
  },

  beforeCreate: function (user, next) {    
    CipherService.hashPassword(user);
    next();       
  },
};
