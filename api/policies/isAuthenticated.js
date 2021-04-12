/**
 * Created by elias on 20/12/18.
 */

/**
 * isAuthenticated
 * @description :: Policy to inject user in req via JSON Web Token
 */
var passport = require('passport');

module.exports = function (req, res, next) {
  console.log('Authenticated');
  passport.authenticate('jwt', function (error, user, info) {
    /*//todo remover trigger login
    user = null;
    info = {
      code: 'UNAUTHORIZED'
    };*/
    
    if (error) {
      return res.serverError(error);
    }
    if (!user) {
      res.unauthorized(
        {
          info: info && info.code,
          message: info && info.message
        }
      );
      return;
    }    
    req.user = user;    
    next();
  })(req, res);
};
