/**
 * StoreController
 *
 * @description :: Server-side logic for managing stores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const uploadOption = {
  local: { dirname: '../../assets/uploads/' }, //sails.config.upload.transferPath },
  s3: {
    // adapter: require('skipper-s3'),
    key: 'S3 Key',
    secret: 'S3 Secret',
    bucket: 'Bucket Name'
  }
};

module.exports = {
  createMock: (req, res) => {
    console.log('createMock'); 
    return StoreService.createStoreMock(req, res);
  },
  create: (req, res) => {
    console.log('create'); 
    return StoreService.createStore(req, res);
  },
  findMock: (req, res) => {
    console.log('findMock'); 
    return StoreService.findStoreMock(req, res);
  },
  find: (req, res) => {
    console.log('find'); 
    return StoreService.findStore(req, res);
  },

  /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Find by id
     */
   async findById (req, res) {
    let storeId = req.params.storeId;
    LogService.controllerLog(req, storeId);        

    try {
        var resp = await StoreService.findById(storeId);
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
     * @description Find store by useremployee
     */
  async findByUser (req, res) {
    let userId = req.params.user;
    LogService.controllerLog(req, userId);

    if(!userId){
      userId = req.user.id;
      LogService.controllerLog(req, '!userId');
      LogService.controllerLog(req, req.user);
    }

    try {
      var result = await StoreService.findByUser(userId);
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
        var resp = await StoreService.search(text, limit, skip);
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
     * @description Update store attribute
     */
   async updateAttribute (req, res) {
    let storeId = req.params.storeId;
    LogService.controllerLog(req, storeId);
    LogService.controllerLog(req, req.body); // attribute JSON

    var result;

    try {
      var result = await StoreService.updateAttribute(storeId, req.body);
    } catch (err) {
      LogService.controllerLog(req, err);
      ResponseService.sendError(res, err);
    }

    LogService.controllerLog(req, result);

    return res.ok(result);
  },

  async updateImage (req, res) { 
    let file = req.body.file;
    LogService.controllerLog(req, file);

    try{
      let imageCreated = await ImageService.create(file);
      LogService.controllerLog(req, imageCreated);

      var resp = await StoreService.updateImage(req.user.id, imageCreated);
    } catch(error){
      LogService.controllerLog(req, error);
      throw error;
    }

    return res.ok(resp);
  },
};
