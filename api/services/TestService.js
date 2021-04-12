/**
 * TestService
 *
 * @description :: Server-side logic for testing
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */
function _log(method, message = null) {
  LogService.log('TestService', method, message);
}

module.exports = {

};
