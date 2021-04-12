/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {  
    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Return logged user
     */
     async getLogged (req, res) {
      let user = req.user;
      LogService.controllerLog(req, user);

      return res.ok({user:user});
    },
};

