/**
 * AuthService
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

const passport = require('passport');
const request = require('request');
const objectid = require('mongodb').ObjectID
var jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: sails.config.GMAIL_USER,
    pass: sails.config.GMAIL_PASS,
  },
});

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
        accountName: 'loja' + storeCount,
        searchField: 'loja ' + 'loja' + storeCount
      });
      employee['store'] = storeSaved.id; 

      let employeeSaved = await EmployeeService.createEmployee(employee);

      let token = CipherService.createEmailToken(userSaved);

      AuthService.sendEmail(employee.name, user.email, token);

      var resp = {
        user: userSaved,
        employee: employeeSaved,
        store: storeSaved,
        // token: CipherService.createToken(userSaved) 
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

  confirmEmail: (token, res) => {
    _log('confirmEmail', token);
        
    
    jwt.verify(token, sails.config.jwtEmailSettings.secret, function(error, decoded){
        if (error) return res.serverError(error);

        _log('confirmEmail', decoded);

        let user = decoded.user;

        UserEmployeeService.updateAttribute(user.id, {confirmed: true}).then((user) => {
          return res.view('pages/confirmation');
        }).catch((error) => {
          return res.serverError(error);
        });  
    });
  },

  sendEmail (name, email, emailToken) {
    _log('sendEmail', name);
    _log('sendEmail', email);
    _log('sendEmail', emailToken);

    const url = sails.config.APP_URL + `/auth/confirmEmail/${emailToken}`;

    return transporter.sendMail({
      to: email,
      subject: '[URK] Confirme seu email',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <!-- saved from url=(0101)file:///E:/Elias/Documents/Desenvolvimento/PontoEVirgula/Urk/Documentos/Divulgacao/email/confirm.html -->
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
      
      <meta content="width=device-width" name="viewport">
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible">
      <!--<![endif]-->
      <title></title>
      <!--[if !mso]><!-->
      <link href="./confirm_files/css" rel="stylesheet" type="text/css">
      <!--<![endif]-->
      <style type="text/css">
          body {
            margin: 0;
            padding: 0;
          }
      
          table,
          td,
          tr {
            vertical-align: top;
            border-collapse: collapse;
          }
      
          * {
            line-height: inherit;
          }
      
          a[x-apple-data-detectors=true] {
            color: inherit !important;
            text-decoration: none !important;
          }
        </style>
      <style id="media-query" type="text/css">
          @media (max-width: 720px) {
      
            .block-grid,
            .col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
      
            .block-grid {
              width: 100% !important;
            }
      
            .col {
              width: 100% !important;
            }
      
            .col>div {
              margin: 0 auto;
            }
      
            img.fullwidth,
            img.fullwidthOnMobile {
              max-width: 100% !important;
            }
      
            .no-stack .col {
              min-width: 0 !important;
              display: table-cell !important;
            }
      
            .no-stack.two-up .col {
              width: 50% !important;
            }
      
            .no-stack .col.num4 {
              width: 33% !important;
            }
      
            .no-stack .col.num8 {
              width: 66% !important;
            }
      
            .no-stack .col.num4 {
              width: 33% !important;
            }
      
            .no-stack .col.num3 {
              width: 25% !important;
            }
      
            .no-stack .col.num6 {
              width: 50% !important;
            }
      
            .no-stack .col.num9 {
              width: 75% !important;
            }
      
            .video-block {
              max-width: none !important;
            }
      
            .mobile_hide {
              min-height: 0px;
              max-height: 0px;
              max-width: 0px;
              display: none;
              overflow: hidden;
              font-size: 0px;
            }
      
            .desktop_hide {
              display: block !important;
              max-height: none !important;
            }
          }
        </style>
      <style id="__web-inspector-hide-shortcut-style__" type="text/css">
      .__web-inspector-hide-shortcut__, .__web-inspector-hide-shortcut__ *, .__web-inspector-hidebefore-shortcut__::before, .__web-inspector-hideafter-shortcut__::after
      {
          visibility: hidden !important;
      }
      </style></head>
      <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f6f6f6;">
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <table bgcolor="#f6f6f6" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
      <td style="word-break: break-word; vertical-align: top;" valign="top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f6f6f6"><![endif]-->
      <div style="background-color:#FFFFFF;">
      <div class="block-grid mixed-two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="233" style="background-color:transparent;width:233px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:25px;"><![endif]-->
      <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 232px; width: 233px;">
      <div style="width:100% !important;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:25px; padding-right: 0px; padding-left: 0px;">
      <!--<![endif]-->
      <div align="left" class="img-container left fixedwidth" style="padding-right: 0px;padding-left: 10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 10px;" align="left"><![endif]-->
      <div style="font-size:1px;line-height:10px">&nbsp;</div><img alt="Image" border="0" class="left fixedwidth" src="https://urk-storage.s3.amazonaws.com/email/logo-name.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 198px; display: block;" title="URKStore" width="198">
      <!--[if mso]></td></tr></table><![endif]-->
      </div>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td><td align="center" width="466" style="background-color:transparent;width:466px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:5px;"><![endif]-->
      <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 464px; width: 466px;">
      <div style="width:100% !important;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:20px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
      <!--<![endif]-->
      <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
      <td style="word-break: break-word; vertical-align: top; padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
      <table activate="activate" align="right" alignment="alignment" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" to="to" valign="top">
      <tbody>
      <tr align="right" style="vertical-align: top; display: inline-block; text-align: right;" valign="top">
      <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 5px;" valign="top"><a href="https://www.facebook.com/urkapp" target="_blank"><img alt="Facebook" height="32" src="https://urk-storage.s3.amazonaws.com/email/facebook-link.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"></a></td>
      <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 5px;" valign="top"><a href="https://www.instagram.com/urk.store/" target="_blank"><img alt="Instagram" height="32" src="https://urk-storage.s3.amazonaws.com/email/instagram-link.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Instagram" width="32"></a></td>
      
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      
      
      
      <div style="background-color:#FFFFFF;">
      <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#FFFFFF;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:0px;"><![endif]-->
      <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
      <div style="width:100% !important;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
      <!--<![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
      <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid transparent; height: 0px;" valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
      <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top: 5px; padding-bottom: 5px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
      
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 20px; font-family: 'Trebuchet MS', sans-serif"><![endif]--><div>
      <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:left;padding:0;width:100%;display:table">
        <tbody><tr style="padding:0;vertical-align:top;text-align:left">
          <th style="color:#0a0a0a;font-family:&#39;Cereal&#39;,Helvetica,Arial,sans-serif;font-weight:normal;padding:0;text-align:left;font-size:16px;line-height:19px;margin:0 auto;padding-bottom:16px;width:564px;padding-left:16px;padding-right:16px">
            <p style="padding:0;margin:0;font-family:&quot;Cereal&quot;,&quot;Helvetica&quot;,Helvetica,Arial,sans-serif;font-weight:300;color:#484848;font-size:18px;line-height:1.4;text-align:left;margin-bottom:0px!important">
              Olá, ${name},
            </p>
          </th>
        </tr>
      </tbody></table>
      </div>
      
      <div>
      <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:left;padding:0;width:100%;display:table">
        <tbody><tr style="padding:0;vertical-align:top;text-align:left">
          <th style="color:#0a0a0a;font-family:&#39;Cereal&#39;,Helvetica,Arial,sans-serif;font-weight:normal;padding:0;text-align:left;font-size:16px;line-height:19px;margin:0 auto;padding-bottom:16px;width:564px;padding-left:16px;padding-right:16px">
            <p style="padding:0;margin:0;font-family:&quot;Cereal&quot;,&quot;Helvetica&quot;,Helvetica,Arial,sans-serif;font-weight:300;color:#484848;font-size:18px;line-height:1.4;text-align:left;margin-bottom:0px!important">
              Bem-vindo ao URK Store! Para começar, você precisa <span class="il">confirmar</span> seu endereço de email.
            </p>
          </th>
        </tr>
      </tbody></table>
      </div><div style="padding-top:8px">
      <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:left;padding:0;width:100%;display:table">
        <tbody><tr style="padding:0;vertical-align:top;text-align:left">
          <th style="color:#0a0a0a;font-family:&#39;Cereal&#39;,Helvetica,Arial,sans-serif;font-weight:normal;padding:0;margin:0;text-align:left;font-size:16px;line-height:19px;padding-left:16px;padding-right:16px">
            <a href="${url}" style="font-family:&#39;Cereal&#39;,Helvetica,Arial,sans-serif;font-weight:normal;margin:0;text-align:left;line-height:1.3;color:#2199e8;text-decoration:none;background-color: #23ba5e;border-radius:4px;display:inline-block;padding:12px 24px 12px 24px;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.airbnb.com.br/confirm_email?code%3De6f228aa7c90020f3193bfc332308944%26euid%3D139e7bda-549c-6f89-9f30-171a51343c4c%26redirect_params%255Baction%255D%3Daccount_activation%26redirect_params%255Bcontroller%255D%3Dverification%26redirect_params%255Bskip_intro%255D%3Dtrue%26user_id%3D249245815&amp;source=gmail&amp;ust=1618767638505000&amp;usg=AFQjCNHuGi0BwB2u3cpJlQ2VLF8Pp935Iw">
              <p style="font-weight:normal;padding:0;margin:0;text-align:center;font-family:&quot;Cereal&quot;,&quot;Helvetica&quot;,Helvetica,Arial,sans-serif;color:white;font-size:18px;line-height:26px;margin-bottom:0px!important">
                <span class="il">Confirmar</span> Email
              </p>
            </a>
          </th>
        </tr>
      </tbody></table>
      </div>
      <div style="padding-top:24px">
      <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:left;padding:0;width:100%;display:table">
        <tbody><tr style="padding:0;vertical-align:top;text-align:left">
          <th style="color:#0a0a0a;font-family:&#39;Cereal&#39;,Helvetica,Arial,sans-serif;font-weight:normal;padding:0;text-align:left;font-size:16px;line-height:19px;margin:0 auto;padding-bottom:16px;width:564px;padding-left:16px;padding-right:16px">
            <p style="padding:0;margin:0;font-family:&quot;Cereal&quot;,&quot;Helvetica&quot;,Helvetica,Arial,sans-serif;font-weight:300;color:#484848;font-size:18px;line-height:1.4;text-align:left;margin-bottom:0px!important">
      Obrigado,<br>Equipe URK      </p>
          </th>
        </tr>
      </tbody></table>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      
      <div style="background-color:#FFFFFF;">
      <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
      <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
      <div style="width:100% !important;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
      <!--<![endif]-->
      <div class="mobile_hide">
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
      <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="10" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent; height: 10px;" valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
      <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      
      <div style="background-color:#FFFFFF;">
      <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
      <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
      <div style="width:100% !important;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
      <!--<![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
      <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent; height: 0px;" valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
      <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      
      <div style="background-color:#23ba5e;">
      <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#23ba5e;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:30px;"><![endif]-->
      <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
      <div style="width:100% !important;">
      <!--[if (!mso)&(!IE)]><!-->
      <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
      <!--<![endif]-->
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
      <div style="color:#FFFFFF;font-family:&#39;Lato&#39;, Tahoma, Verdana, Segoe, sans-serif;line-height:150%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
      <div style="font-family: &#39;Lato&#39;, Tahoma, Verdana, Segoe, sans-serif; font-size: 12px; line-height: 18px; color: #FFFFFF;">
      <p style="font-size: 12px; line-height: 21px; text-align: center; margin: 0;"><span style="font-size: 14px;"><span style="color: #ffffff; line-height: 21px; font-size: 14px;"><strong>URKStore</strong></span> é um produto URK</span></p>
      <p style="font-size: 12px; line-height: 18px; text-align: center; margin: 0;"><span style="font-size: 12px; line-height: 18px;">&nbsp;© 2019 URK, Inc. | Niterói, RJ | Parte do Grupo URK</span></p>
      </div>
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
      <!--[if (!mso)&(!IE)]><!-->
      </div>
      <!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
      </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <!--[if (IE)]></div><![endif]-->
      
      </body></html>`,
    });

    // jwt.sign(
    //   {
    //     user: _.pick(user, 'id'),
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
  },
};
