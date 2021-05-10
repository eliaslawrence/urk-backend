/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  // ADDRESS

  // 'PUT /address/update': {
  //   controller: 'AddressController',
  //   action: 'update'
  // },

  //

  // AUTH

  'POST /auth/login': {
    controller: 'AuthController',
    action: 'login'
  },

  'POST /auth/signup': {
    controller: 'AuthController',
    action: 'signup'
  }, 

  'GET /auth/confirmEmail/*': {
    controller: 'AuthController',
    action: 'confirmEmail'
  },

  //

  // USER

  'GET /user/getLogged': {
    controller: 'UserController',
    action: 'getLogged'
  },  

  // EMPLOYEE
  
  // 'PUT /employee/update': {
  //   controller: 'EmployeeController',
  //   action: 'update'
  // },

  // 'GET /employee/findByUser/:userId?': {
  //   controller: 'EmployeeController',
  //   action: 'findByUser'
  // },

  //

  // PRODUCT

  'GET /product/findById/:productId?': {
    controller: 'ProductController',
    action: 'findById',
  },

  'GET /product/findByUser/:limit/:skip/:text?': {
    controller: 'ProductController',
    action: 'findByUser',
  },

  'GET /product/findByStore/:storeId/:limit/:skip/:text?': {
    controller: 'ProductController',
    action: 'findByStore',
  },

  'GET /product/search/:limit/:skip/:text?': {
    controller: 'ProductController',
    action: 'search',
  },

  'PUT /product/updateAttribute/:productId?': {
    controller: 'ProductController',
    action: 'updateAttribute',
  },

  'POST /product/createEmpty/:userId?': {
    controller: 'ProductController',
    action: 'createEmpty',
  }, 
  
  'POST /product/delete/:productId?': {
    controller: 'ProductController',
    action: 'delete',
  },

  'POST /product/addImage/:productId?': {
    controller: 'ProductController',
    action: 'addImage'
  },

  'POST /productImage/remove': {
    controller: 'ProductImageController',
    action: 'remove'
  },

  'POST /product/updateCoverImage/:productId': {
    controller: 'ProductController',
    action: 'updateCoverImage'
  },

  // STORE

  // 'PUT /store/update': {
  //   controller: 'StoreController',
  //   action: 'update'
  // },
  'GET /store/search/:limit/:skip/:text?': {
    controller: 'StoreController',
    action: 'search',
  },

  'GET /store/findById/:storeId?': {
    controller: 'StoreController',
    action: 'findById',
  },

  'GET /store/findByUser': {
    controller: 'StoreController',
    action: 'findByUser'
  },

  'PUT /store/updateAttribute/:storeId?': {
    controller: 'StoreController',
    action: 'updateAttribute',
  },

  'POST /store/updateImage': {
    controller: 'StoreController',
    action: 'updateImage'
  },

  // TELEPHONE
  'PUT /telephone/updateAttribute/:telephoneId?': {
    controller: 'TelephoneController',
    action: 'updateAttribute',
  },

  'POST /telephone/create/:storeId?': {
    controller: 'TelephoneController',
    action: 'create',
  },

  'POST /telephone/delete/:telephoneId?': {
    controller: 'TelephoneController',
    action: 'delete',
  },

  // ADDRESS
  'PUT /address/updateAttribute/:addressId?': {
    controller: 'AddressController',
    action: 'updateAttribute',
  },

  'POST /address/create/:storeId?': {
    controller: 'AddressController',
    action: 'create',
  },

  'POST /address/delete/:addressId?': {
    controller: 'AddressController',
    action: 'delete',
  },

  // IMAGE

  'GET /image/findById/:imageId': {
    controller: 'ImageController',
    action: 'findById'
  },

  'POST /image/delete/:imageId': {
    controller: 'ImageController',
    action: 'delete'
  },

  'POST /image/upload': {
    controller: 'ImageController',
    action: 'upload'
  },

  //

  // USEREMPLOYEE
  
  // 'PUT /userEmployee/update': {
  //   controller: 'UserEmployeeController',
  //   action: 'update'
  // },

  // 'PUT /userEmployee/changePassword': {
  //   controller: 'UserEmployeeController',
  //   action: 'changePassword'
  // },

  // 'GET /userEmployee/findById/:id': {
  //   controller: 'UserEmployeeController',
  //   action: 'findById'
  // },

  // 'GET /userEmployee/logout': {
  //   controller: 'UserEmployeeController',
  //   action: 'logout'
  // },
  

  // TEST
  'POST /test/upload': {
    controller: 'TestController',
    action: 'upload'
  },

  'GET /test/image/:imageId': {
    controller: 'TestController',
    action: 'image'
  },

  // >> Product
  // 'GET /test/findStoreFromProduct/:productId': {
  //   controller: 'TestController',
  //   action: 'findStoreFromProduct'
  // },

  // 'GET /test/findProduct/:productId': {
  //   controller: 'TestController',
  //   action: 'findProduct'
  // },

  // >> Store
  // 'POST /test/createStoreMock': {
  //   controller: 'TestController',
  //   action: 'createStoreMock'
  // },

  // 'GET /test/findStoreMock': {
  //   controller: 'TestController',
  //   action: 'findStoreMock'
  // },

  // 'GET /test/findAllStore': {
  //   controller: 'TestController',
  //   action: 'findAllStore'
  // },

  // 'POST /test/deleteAllStore': {
  //   controller: 'TestController',
  //   action: 'deleteAllStore'
  // },  

  // >> Employee
  // 'GET /test/findAllEmployee': {
  //   controller: 'TestController',
  //   action: 'findAllEmployee'
  // },

  // 'POST /test/deleteAllEmployee': {
  //   controller: 'TestController',
  //   action: 'deleteAllEmployee'
  // },
  // 

  // >> UserEmployee
  // 'GET /test/findAllUserEmployee': {
  //   controller: 'TestController',
  //   action: 'findAllUserEmployee'
  // },

  // 'POST /test/deleteAllUserEmployee': {
  //   controller: 'TestController',
  //   action: 'deleteAllUserEmployee'
  // },
  //  

  // >> Category
  // 'POST /test/createCategoriesMock': {
  //   controller: 'TestController',
  //   action: 'createCategoriesMock'
  // },

  // 'POST /test/createCategory': {
  //   controller: 'TestController',
  //   action: 'createCategory'
  // },

  // 'GET /test/findCategoryById/:id': {
  //   controller: 'TestController',
  //   action: 'findCategoryById'
  // },

  // 'GET /test/findAllCategories': {
  //   controller: 'TestController',
  //   action: 'findAllCategories'
  // },

  // 'POST /test/deleteAlCategories': {
  //   controller: 'TestController',
  //   action: 'deleteAllCategories'
  // },
  // 

  // >> DeliveryOption
  // 'POST /test/createDeliveryOption': {
  //   controller: 'TestController',
  //   action: 'createDeliveryOption'
  // },

  // 'GET /test/findDeliveryOptionById/:id': {
  //   controller: 'TestController',
  //   action: 'findDeliveryOptionById'
  // },

  // 'GET /test/findAllDeliveryOptions': {
  //   controller: 'TestController',
  //   action: 'findAllDeliveryOptions'
  // },

  // 'POST /test/deleteAllDeliveryOptions': {
  //   controller: 'TestController',
  //   action: 'deleteAllDeliveryOptions'
  // },
  // 

  // >> PaymentOption
  // 'POST /test/createPaymentOption': {
  //   controller: 'TestController',
  //   action: 'createPaymentOption'
  // },

  // 'GET /test/findPaymentOptionById/:id': {
  //   controller: 'TestController',
  //   action: 'findPaymentOptionById'
  // },

  // 'GET /test/findAllPaymentOptions': {
  //   controller: 'TestController',
  //   action: 'findAllPaymentOptions'
  // },

  // 'POST /test/deleteAllPaymentOptions': {
  //   controller: 'TestController',
  //   action: 'deleteAllPaymentOptions'
  // },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
