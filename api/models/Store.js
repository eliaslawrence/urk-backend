/**
 * Store.js
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
    accountName: {
      type: 'string',
      required: true,
      unique: true
    },  
    // phoneNumber: {
    //   type: 'string',
    //   required: true
    // },
    products: {
      collection: 'product',
      via: 'store'
    },
    telephones: {
      collection: 'telephone',
      via: 'store'
    },
    coverImage: {
      model: 'image',
    },
    address: {
      model: 'address'
    },    

    //Sunday 
    sundayWork: {
      type: 'boolean',
      defaultsTo: true,
    },
    sundayOpeningHour: {
      type: 'string',
      defaultsTo: '10:00',
    },
    sundayClosingHour: {
      type: 'string',
      defaultsTo: '18:00',
    },

    //Monday
    mondayWork: {
      type: 'boolean',
      defaultsTo: true,
    },
    mondayOpeningHour: {
      type: 'string',
      defaultsTo: '10:00',
    },
    mondayClosingHour: {
      type: 'string',
      defaultsTo: '18:00',
    },

    //Tuesday
    tuesdayWork: {
      type: 'boolean',
      defaultsTo: true,
    },
    tuesdayOpeningHour: {
      type: 'string',
      defaultsTo: '10:00',
    },
    tuesdayClosingHour: {
      type: 'string',
      defaultsTo: '18:00',
    },

    //Wednesday
    wednesdayWork: {
      type: 'boolean',
      defaultsTo: true,
    },
    wednesdayOpeningHour: {
      type: 'string',
      defaultsTo: '10:00',
    },
    wednesdayClosingHour: {
      type: 'string',
      defaultsTo: '18:00',
    },

    //Thursday
    thursdayWork: {
      type: 'boolean',
      defaultsTo: true,
    },
    thursdayOpeningHour: {
      type: 'string',
      defaultsTo: '10:00',
    },
    thursdayClosingHour: {
      type: 'string',
      defaultsTo: '18:00',
    },

    //Friday
    fridayWork: {
      type: 'boolean',
      defaultsTo: true,
    },
    fridayOpeningHour: {
      type: 'string',
      defaultsTo: '10:00',
    },
    fridayClosingHour: {
      type: 'string',
      defaultsTo: '18:00',
    },

    //Saturday
    saturdayWork: {
      type: 'boolean',
      defaultsTo: true,
    },
    saturdayOpeningHour: {
      type: 'string',
      defaultsTo: '10:00',
    },
    saturdayClosingHour: {
      type: 'string',
      defaultsTo: '18:00',
    },
  },
};
