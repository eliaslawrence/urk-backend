/**
 * ProductController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Find by id
     */
     async findById (req, res) {
        let productId = req.params.productId;
        LogService.controllerLog(req, productId);        

        try {
            var resp = await ProductService.findById(productId);
        } catch (err) {
            LogService.controllerLog(req, err);
            throw err;
        }

        LogService.controllerLog(req, resp);

        return res.ok(resp);
    },
  
	/**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Find by user
     */
     async findByUser (req, res) {
        let user  = req.user;
        let text  = req.params.text;         
        let limit = req.params.limit;         
        let skip  = req.params.skip;         

        LogService.controllerLog(req, text);
        LogService.controllerLog(req, limit);
        LogService.controllerLog(req, skip);
        LogService.controllerLog(req, user);

        try {
            var resp = await ProductService.findByUser(user.id, text, limit, skip);
        } catch (err) {
            LogService.controllerLog(req, err);
            throw err;
        }

        LogService.controllerLog(req, resp);

        return res.ok(resp);
    }, 

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Find by store
     */
     async findByStore (req, res) {
        let storeId = req.params.storeId;
        let text  = req.params.text;         
        let limit = req.params.limit;         
        let skip  = req.params.skip;         

        LogService.controllerLog(req, text);
        LogService.controllerLog(req, limit);
        LogService.controllerLog(req, skip);
        LogService.controllerLog(req, storeId);

        try {
            var resp = await ProductService.findByStore(text, limit, skip, storeId);
        } catch (err) {
            LogService.controllerLog(req, err);
            throw err;
        }

        LogService.controllerLog(req, resp);

        return res.ok(resp);
    }, 

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Find by text to feed
     */
     async search (req, res) {
        let text  = req.params.text;         
        let limit = req.params.limit;         
        let skip  = req.params.skip;         

        LogService.controllerLog(req, text);
        LogService.controllerLog(req, limit);
        LogService.controllerLog(req, skip);

        try {
            var resp = await ProductService.search(text, limit, skip, {available : true});
        } catch (err) {
            LogService.controllerLog(req, err);
            throw err;
        }

        LogService.controllerLog(req, resp);

        return res.ok(resp);
    }, 

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Update product attribute
     */
     async updateAttribute (req, res) {
        let productId = req.params.productId;
        LogService.controllerLog(req, productId);
        LogService.controllerLog(req, req.body);

        try {
            var resp = await ProductService.updateAttribute(productId, req.body);
        } catch (err) {
            LogService.controllerLog(req, err);
            throw err;
        }

        LogService.controllerLog(req, resp);

        return res.ok(resp);
    },

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Create product with no attributes
     */
     async createEmpty (req, res) {
        let userId = req.params.userId;
        LogService.controllerLog(req, userId);

        if(!userId){
            userId = req.user.id;
            LogService.controllerLog(req, '!userId');
            LogService.controllerLog(req, req.user);
        }

        try {
            var resp = await ProductService.createEmpty(userId);       
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
        let productId = req.params.productId;

        LogService.controllerLog(req, productId);

        try {
            await ProductService.remove(productId);            
        } catch (err) {
            LogService.controllerLog(req, err);
            throw(err);
        }

        LogService.controllerLog(req);

        return res.ok();
    },

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Add product image
     */
    async addImage(req, res) { 
        let file = req.body.file;
        let productId = req.params.productId;
        LogService.controllerLog(req, file);
        LogService.controllerLog(req, productId);
    
        try{       
            let imageCreated = await ImageService.create(file);
            LogService.controllerLog(req, imageCreated);

            var resp = await ProductService.addImage(productId, imageCreated.id);
        } catch(error){
            LogService.controllerLog(req, err);
            throw err;
        }

        LogService.controllerLog(req, resp);

        return res.ok(resp);
    },

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Update product cover image
     */
    async updateCoverImage (req, res) { 
        let file = req.body.file;
        let productId = req.params.productId;
        LogService.controllerLog(req, file);
        LogService.controllerLog(req, productId);
    
        try{
            let imageCreated = await ImageService.create(file);
            LogService.controllerLog(req, imageCreated);
    
            var resp = await ProductService.updateCoverImage(productId, imageCreated);
        } catch(error){
          LogService.controllerLog(req, error);
          throw error;
        }
    
        return res.ok(resp);
      },
};
