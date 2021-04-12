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

  /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Update store image
     */
  //  updateImage: (req, res) => { 
  //   LogService.controllerLog(req);

  //   req.file('image').upload({
  //     dirname: sails.config.upload.transferPath,
  //   }, function(err, uploadedFiles) {      
  //     if (err) return res.serverError(err);
      
  //     if(uploadedFiles && uploadedFiles[0]){
  //       let file = uploadedFiles[0];
              
  //       LogService.controllerLog(req, file);
  //       let image = {};
  //       image.fileName = file.fd.substr(file.fd.lastIndexOf('/') + 1);
  //       image.fileName = image.fileName.substr(0, image.fileName.lastIndexOf('.'));
  //       image.originalName = file.filename.substr(0, file.filename.lastIndexOf('.'));;
  //       image.extension = file.filename.substr(file.filename.lastIndexOf('.') + 1);
  //       image.url = sails.config.appURL + '/uploads/' + image.fileName + '.' + image.extension;
  //       image.size = file.size;
  //       LogService.controllerLog(req, image);

  //       return StoreService.updateImage(req.user.id, image).then(()=>{
  //           return res.ok();                              
  //       }).catch((err) => {              
  //         LogService.controllerLog(req, err);
  //         throw err;
  //       })
  //     }

  //     return res.ok();
  //   });
  // },
  // updateImage: (req, res) => { 
  //   LogService.controllerLog(req);

  //   req.file('image').upload(uploadOption[sails.config.UPLOAD_TYPE], function(err, uploadedFiles) {   
  //     LogService.controllerLog(req, uploadedFiles);

  //     if (err) return res.serverError(err);
      
  //     if(uploadedFiles && uploadedFiles[0]){
  //       let file = uploadedFiles[0];
  //       return res.ok(file);
  //     }

  //     return res.ok();
  //   });
  // },

  async updateImage (req, res) { 
    let file = req.body.file;
    LogService.controllerLog(req, file);

    try{
      let imageCreated = await ImageService.createFromFile(file);
      LogService.controllerLog(req, imageCreated);

      var resp = await StoreService.updateImage(req.user.id, imageCreated);
    } catch(error){
      LogService.controllerLog(req, error);
      throw error;
    }

    return res.ok(resp);
  },
};
