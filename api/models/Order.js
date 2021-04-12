/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    code: {
      type: 'string',
      required: true
    }, 
    client: {
      type: 'string',//model: 'client',
      required: true
    }, 
    deliveryOption: {
      type: 'string',//model: 'deliveryOption',
    }, 
    paymentOption: {
      type: 'string',//model: 'paymentOption',
    },
    productOrder: {
      collection: 'productOrder',
      via: 'order'
    },       
  },
};
