/**
 * LogService
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

module.exports = {
  log: (file, method, message = null) => {  
    sails.log(SystemService.capitalize(file) + ': ' + method); 
    if(message !== null)
      sails.log(message);
  },

  controllerLog: (req, message = null) => {  
    LogService.log(req.options.controller, req.options.action, message);
  },

};
