/**
 * TelephoneController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    
    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Update any attribute
     */
    async updateAttribute (req, res) {
        let telephoneId = req.params.telephoneId;
        LogService.controllerLog(req, telephoneId);
        LogService.controllerLog(req, req.body);

        try {
            var resp = await TelephoneService.updateAttribute(telephoneId, req.body);
        } catch (err) {
            LogService.controllerLog(req, err);
            throw(err);
        }

        LogService.controllerLog(req, resp);

        return res.ok(resp);
    },

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description CREATE
     */
    async create (req, res) {
        let storeId      = req.params.storeId;
        let newTelephone = req.body.newTelephone;

        LogService.controllerLog(req, storeId);
        LogService.controllerLog(req, newTelephone);

        try {
            var resp = await TelephoneService.create(storeId, newTelephone);
        } catch (err) {
            LogService.controllerLog(req, err);
            throw(err);
        }

        LogService.controllerLog(req, resp);

        return res.ok(resp);
    },

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description DELETE
     */
    async delete (req, res) {
        let telephoneId = req.params.telephoneId;

        LogService.controllerLog(req, telephoneId);

        try {
            await TelephoneService.delete(telephoneId);            
        } catch (err) {
            LogService.controllerLog(req, err);
            throw(err);
        }

        LogService.controllerLog(req);

        return res.ok();
    },

};

