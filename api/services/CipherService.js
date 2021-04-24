/**
 * Created by eliaslawrence on 05/12/18.
 */

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

function _log(method, message = null) {
  LogService.log('CipherService', method, message);
}

module.exports = {
  secret: sails.config.jwtSettings.secret,
  issuer: sails.config.jwtSettings.issuer,
  audience: sails.config.jwtSettings.audience,

  /**
   * Hash the password field of the passed user.
   */
  hashPassword: function (user) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }
  },

  /**
   * Hash only the password.
   */
  hashPasswordOnly: function (password) {
    return new Promise((resolve,reject) => {
      if (password) {      
        bcrypt.genSalt(10, function(err, salt){
          if (err) {
            reject(err);            
          }
          bcrypt.hash(password, salt, null, function(err, hash){                         
            if (err) {
              reject(err);            
            }      
            password = hash;                            
          });
        });      
      }  
      
      resolve(password);
    }); 
  },

  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */
  comparePassword: function(password, user){
    _log('comparePassword', password);
    _log('comparePassword', user);
    return bcrypt.compareSync(password, user.password);
  },  

  /**
   * Create a token based on the passed user
   * @param user
   */
  createToken: function(user)
  {
    _log('createToken', user);

    return jwt.sign(
      {
        user: user.toJSON()
      },
      sails.config.jwtSettings.secret
      // ,
      // {
      //   algorithm: sails.config.jwtSettings.algorithm,
      //   expiresIn: sails.config.jwtSettings.expiresInMinutes,
      //   issuer: sails.config.jwtSettings.issuer,
      //   audience: sails.config.jwtSettings.audience
      // }
    );
  },

  /**
   * Create a token based on the passed user
   * @param user
   */
   createEmailToken: function(user)
   {
     _log('createToken', user);
 
     return jwt.sign(
       {
         user: user.toJSON()
       },
       sails.config.jwtEmailSettings.secret
       ,
       {
       //   algorithm: sails.config.jwtSettings.algorithm,
        expiresIn: sails.config.jwtEmailSettings.expiresIn,
       //   issuer: sails.config.jwtSettings.issuer,
       //   audience: sails.config.jwtSettings.audience
       }
     );

    //  jwt.sign(
    //   {
    //     user: user.toJSON(),
    //   },
    //   EMAIL_SECRET,
    //   {
    //     expiresIn: '1d',
    //   },
    //   (err, emailToken) => {
    //     const url = `http://localhost:3000/confirmation/${emailToken}`;

    //     transporter.sendMail({
    //       to: args.email,
    //       subject: 'Confirm Email',
    //       html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    //     });
    //   },
    // );
   }
};
