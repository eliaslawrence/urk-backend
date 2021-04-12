/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {    
    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Login
     */
    login: function(req, res) { 
      LogService.controllerLog(req);
      AuthService.login(req, res);  
    },       

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Signup
     */
    async signup (req, res) {
      let user = req.body.user;
      LogService.controllerLog(req, user);

      let employee = req.body.employee;
      LogService.controllerLog(req, employee);

      try {
        var result = await AuthService.signup(user, employee);
      } catch (err) {
        LogService.controllerLog(req, err);
        throw(err);
      }

      LogService.controllerLog(req, result);

      return res.ok(result);
    },
};

