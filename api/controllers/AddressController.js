/**
 * AddressController
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
        let addressId = req.params.addressId;
        LogService.controllerLog(req, addressId);
        LogService.controllerLog(req, req.body);

        try {
            var result = await AddressService.updateAttribute(addressId, req.body);
        } catch (err) {
            LogService.controllerLog(req, err);
            throw(err);
        }

        LogService.controllerLog(req, result);

        return res.ok(result);
    },

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description CREATE
     */
    async create (req, res) {
        let storeId    = req.params.storeId;
        let newAddress = req.body.newAddress;

        LogService.controllerLog(req, storeId);
        LogService.controllerLog(req, newAddress);

        try {
            await AddressService.create(storeId, newAddress);
        } catch (err) {
            LogService.controllerLog(req, err);
            throw(err);
        }

        LogService.controllerLog(req);

        return res.ok();
    },

};

