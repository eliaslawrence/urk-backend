/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  '*': [ 'isAuthenticated' ],

  AuthController: {
    '*': true
  },

  TestController: {
    '*': true
  },

  ImageController: {
    findById: true
  //   '*': true
  },

  ProductController: {
    search: true,
    findById: true,
    findByStore: true
  },

  StoreController: {
    search: true,
    findById: true
  }

};
