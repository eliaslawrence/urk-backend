/**
 * ProductImageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {    

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Remove product image
     */
    async remove (req, res) {
        let productImage = req.body.productImage;

        LogService.controllerLog(req, productImage);

        try {
            await ProductImageService.remove(productImage);            
        } catch (err) {
            LogService.controllerLog(req, err);
            throw(err);
        }

        LogService.controllerLog(req);

        return res.ok();
    },

};

