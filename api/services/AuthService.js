/**
 * AuthService
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

const passport = require('passport');
const request = require('request');
const objectid = require('mongodb').ObjectID

function _log(method, message = null) {
  LogService.log('AuthService', method, message);
}

module.exports = {   

  async signup (user, employee) { 
    _log('Signup', user);
    _log('Signup', employee);

    try {
      let userSaved = await UserEmployeeService.createUser(user);
      employee['user'] = userSaved.id; 

      let storeCount = await StoreService.countStore({});

      let storeSaved = await StoreService.createStore({
        name: 'Loja',   
        accountName: 'loja' + storeCount
      });
      employee['store'] = storeSaved.id; 

      let employeeSaved = await EmployeeService.createEmployee(employee);

      var resp = {
        user: userSaved,
        employee: employeeSaved,
        store: storeSaved,
        token: CipherService.createToken(userSaved) 
      };

    } catch (error) {
      _log('Signup', error);
      throw(error);
    }
        
    _log('Signup', resp);
    
    return resp;
  },

  login: (req, res) => {
    _log('Login', req.body.user);
    passport.authenticate('local', AuthService.authenticate.bind(this, req, res))(req, res);
  },    

  authenticate: (req, res, error, user, info) => {  
    _log('authenticate', user);
    if (error) {
      console.log('server error');
      return res.serverError(error);
    }
    if (!user) {
      console.log('not user');
      return res.unauthorized({
          info: info && info.code,
          message: info && info.message
      });
    }

    console.log('abc1');
    req.logIn(user, function(err) {
      console.log('abc2');  
      if(err) {
        console.log(err);
        return ResponseService.sendError(res, err);
      }
      console.log('ok');
      let token = CipherService.createToken(user);      

      return res.ok({
        message: info.message,
        user,
        token: token
      });    
    });

   //Facebook
   // let token = CipherService.createToken(user);
   // return res.ok({
   //   token: token,
   //   user: {
   //     email: user.email,
   //     name: user.profile.name,
   //     picture: user.profile.picture,
   //     googleId: user.googleId,
   //     facebookId: user.facebookId
   //   }
   // });
  },

  isAuthenticated: (req, res) => {
    console.log('passport isAuthenticated');
    passport.authenticate('jwt', function (error, user, info) {
      /*//todo remover trigger login
      user = null;
      info = {
        code: 'UNAUTHORIZED'
      };*/
      
      if (error) {
        console.log('serverError');
        return res.serverError(error);
      }
      if (!user) { 
        console.log('unauthorized');       
        return res.unauthorized(
          {
            info: info && info.code,
            message: info && info.message
          }
        );
      } 
      console.log('authorized');   
      req.user = user;

      return res.ok({        
        user
      });
    })(req, res);
  },

  // MOCK
  // createMock: (req, res) => {
  //   console.log('createMock');   
  //   req.body = {};
  //   StoreService.findStoreMock().then((store) => { 
  //   // request.post({url: 'http://test1:1337/store/findMock/', form: {}}, function (error, response, body) {
  //     // if (error) {
  //     //   console.log('error');
  //     //   return ResponseService.sendError(error, res);        
  //     // } else if (ResponseService.isError(response)){
  //     //   console.log('erro1');
  //     //   return ResponseService.sendError(res);
  //     // } else {
  //       // console.log(body);
  //       // let store = JSON.parse(body);
  //       console.log(store);
  //       user = {email: 'b@email.com', password: '123456'};
  //       req.body['user'] = user;

  //       let employee = {name: 'Joazinho das Couves', store: store};          
  //       req.body['employee'] = employee;

  //       AuthService.signup(req, res).then((result) => {
  //         if (result.error) {
  //           // ResponseService.sendError(result);
  //           deferred.reject(result.error);
  //         } else {
  //           // res.ok(result);
  //           deferred.resolve(result);
  //         }
  //       })
  //       .catch((err) => {
  //         deferred.reject(err);
  //         // ResponseService.sendError(res, err);
  //       });
  //     // }                
  //   }).catch((err) => {
  //     console.log(err);  
  //     deferred.reject(err);
  //     // ResponseService.sendError(res, err);
  //   }); 

  //   return deferred.promise;
  // },
  //
};
