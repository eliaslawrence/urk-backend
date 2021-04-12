/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },    
    // phoneNumber: {
    //   type: 'string',
    //   required: true
    // },
    // cpf: {
    //   type: 'string',
    //   // required: true
    // },
    // birthDate: {
    //   type: 'date',
    //   required: true
    // },
    store: { 
      model: 'store',
    },
    user: {
      model: 'userEmployee'
    }
  },
};
