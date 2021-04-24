/**
 * Created by eliaslawrence on 05/12/18.
 */

/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var EXPIRES_IN_MINUTES ;
var EXPIRES_IN_1_DAY = "1d" ;
var SECRET = process.env.tokenSecret || "7PmpTVZZgJ5zY7zzpVyUrIxCFJbs7F23rnFpKZHvxJHWUwUoTNpaWrm9K7rTa799";
var EMAIL_SECRET = process.env.emailSecret || "tciePgbrmGLobm9U6YwPiDnDxcf02a25aOdhVKeICOXUPPnFlcEoPih13UNOksid" 
var ALGORITHM = "HS256";
var ISSUER = "urk.com.br";
var AUDIENCE = "urk.com.br";

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  // passReqToCallback: true
  passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: SECRET,
  // issuer : ISSUER,
  // audience: AUDIENCE,
  passReqToCallback: false,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()//ExtractJwt.fromAuthHeaderAsBearerToken()//ExtractJwt.fromAuthHeader()
};

function _log(method, message = null) {
  LogService.log('Passport', method, message);
}

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
  _log('_onLocalStrategyAuth', email);
  _log('_onLocalStrategyAuth', password);

  UserEmployee.findOne({email: email})
    .exec(function (error, user) {
      _log('_onLocalStrategyAuth', user);
      
      if (error){
        return next(error, false, {});
      }

      if (!user || user.deleted){
        return next(null, false, {
          code: 'E_USER_NOT_FOUND',
          message: "Usuário ou senha incorretos."
        });
      } 

      if (!user.confirmed){
        return next(null, false, {
          code: 'E_EMAIL_NOT_CONFIRMED',
          message: 'Email não confirmado.'
        });
      } 
      // TODO: replace with new cipher service type
      if (!CipherService.comparePassword(password, user)){
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Usuário ou senha incorretos.'
        });
      }

      return next(null, user, { message: 'Login Succesful'});
    });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) { 
  var user = payload.user;
  return next(null, user, {});
}

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));

passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

passport.serializeUser(function(user, done) {
  // console.log('SERIALIZE: \n' + user);
  done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    // console.log('DESERIALIZE: \n' + user);
    done(err, user);
  });
});

module.exports.jwtSettings = {
  expiresInMinutes: EXPIRES_IN_MINUTES,
  secret: SECRET,
  algorithm : ALGORITHM,
  issuer : ISSUER,
  audience : AUDIENCE
};

module.exports.jwtEmailSettings = {
  expiresIn: EXPIRES_IN_1_DAY,
  secret: EMAIL_SECRET,
  algorithm : ALGORITHM,
  issuer : ISSUER,
  audience : AUDIENCE
};
