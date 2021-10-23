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
    code: {
      type: 'string'
    },
    cost: {
      type: 'number',
    },
    price: {
      type: 'number'
    },
    description: {
      type: 'string'
    }, 
    store: {
      model: 'store'
    },
    coverImage: {
      model: 'image'
    },
    images: {
      collection: 'productImage',
      via: 'product'
    },
    searchField: {
      type: 'string'
    }, 
    // images: {
    //   type:'array',
    //   defaultsTo:[]
    //   // collection: 'image',
    // },   
    // categories: {
    //   type:'array',
    //   defaultsTo:[]
    //   // collection: 'category',
    // }, 
    // paymentOptions: {
    //   type:'array',
    //   defaultsTo:[]
    //   // collection: 'payment',
    // },
    // deliveryOptions: {
    //   type:'array',
    //   defaultsTo:[]
    //   // collection: 'delivery',
    // },
    // stockControl: {
    //   type: 'boolean',
    //   required: true
    // },
    // quantity: {
    //   type: 'number',
    // },
    available: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
