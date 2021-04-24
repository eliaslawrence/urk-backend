/**
 * Image.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fileName: {
      type: 'string',
      required: true
    }, 
    type: {
      type: 'string',
      required: true
    }, 
    originalName: {
      type: 'string',
      required: true
    }, 
    url: {
      type: 'string',
      required: true
    }, 
    size: {
      type: 'string',
      required: true
    },    
    storage: {
      type: 'string',
      required: true
    },    
  },
};
